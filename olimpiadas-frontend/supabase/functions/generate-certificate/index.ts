import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import { PDFDocument, rgb, StandardFonts } from "npm:pdf-lib"

serve(async (req) => {
  try {
    const payload = await req.json();
    const aluno = payload.record;

    if (aluno.certificate_status !== 'processando') {
      return new Response("Ignorado: Status não é 'processando'", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Baixa o template do Storage em formato PNG
    const { data: templateData, error: templateError } = await supabase.storage
      .from('template')
      .download('template-opi.png'); 
    
    if (templateError) throw new Error("Erro ao baixar template");
    const templateBytes = await templateData.arrayBuffer();

    // 2. Cria o PDF
    const pdfDoc = await PDFDocument.create();
    
    // Usa embedPng para processar a imagem do certificado corretamente
    const image = await pdfDoc.embedPng(templateBytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // --- LÓGICA DE POSICIONAMENTO ---
    const fontSize = 52; 
    
    // Calcula a largura que o nome do aluno vai ocupar na imagem
    const textWidth = font.widthOfTextAtSize(aluno.name, fontSize);
    
    // Encontra o centro exato subtraindo metade da largura do texto da metade da largura da imagem
    const xCentralizado = (image.width / 2) - (textWidth / 2);
    
    // O eixo Y no pdf-lib começa no zero na borda INFERIOR da imagem.
    const posicaoYDaLinha = image.height * 0.45; 
    
    // Posiciona exatamente 2 pixels acima da linha de referência
    const yCalculado = posicaoYDaLinha + 2;

    // Grava apenas o nome do participante, centralizado e alinhado
    page.drawText(aluno.name, { 
        x: xCentralizado, 
        y: yCalculado, 
        size: fontSize, 
        font, 
        color: rgb(0, 0, 0) 
    });

    const pdfBytes = await pdfDoc.save();

    // 3. Salva o PDF do aluno no Storage Público
    const fileName = `certificado-${aluno.id}.pdf`;
    await supabase.storage.from('certificates').upload(fileName, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true
    });

    const { data: publicUrlData } = supabase.storage.from('certificates').getPublicUrl(fileName);
    const certificateUrl = publicUrlData.publicUrl;

    // 4. Envia o e-mail via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'OPI <certificado@opi-ifpb.com.br>',
        reply_to: 'ifpbopi@gmail.com',
        to: [aluno.email],
        subject: 'Seu Certificado da OPI chegou!',
        html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #e9f5e8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #e9f5e8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                  
                  <!-- Cabeçalho -->
                  <tr>
                    <td align="center" style="background-color: #369831; padding: 40px 20px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Olimpíada Picuiense de Informática</h1>
                      <p style="margin: 10px 0 0 0; color: #c7e5c5; font-size: 16px;">O seu certificado chegou! 🏆</p>
                    </td>
                  </tr>
                  
                  <!-- Corpo -->
                  <tr>
                    <td style="padding: 40px 30px; color: #133d13; line-height: 1.6; font-size: 16px;">
                      <h2 style="margin-top: 0; color: #2a7a27; font-size: 22px;">Parabéns, ${aluno.name}!</h2>
                      <p style="margin: 0 0 20px 0;">É com grande satisfação que celebramos a sua participação na <strong>Fase Local da OPI</strong>. Seu esforço, raciocínio lógico e dedicação merecem ser reconhecidos!</p>

                      <!-- Destaque da Nota -->
                      <div style="background-color: #e9f5e8; border-left: 4px solid #369831; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                        <p style="margin: 0; color: #1f5c1d; font-size: 16px;">Sua nota final foi: <strong style="font-size: 18px; color: #081f09;">${aluno.grade}</strong></p>
                      </div>

                      <p style="margin: 0 0 30px 0;">O seu certificado oficial, conferido pelo Instituto Federal da Paraíba - Campus Picuí, já está disponível para download seguro no link abaixo:</p>

                      <!-- Botão -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <a href="${certificateUrl}" target="_blank" style="background-color: #369831; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">Baixar Meu Certificado</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Rodapé -->
                  <tr>
                    <td align="center" style="background-color: #081f09; padding: 25px 20px; color: #a3d5a0; font-size: 14px;">
                      <p style="margin: 0 0 10px 0;"><strong>IFPB - Campus Picuí</strong></p>
                      <p style="margin: 0; font-size: 12px; color: #7fc57b;">Este é um e-mail automático. Caso tenha alguma dúvida sobre o seu certificado, basta responder a esta mensagem.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `
      })
    });

    const emailData = await emailResponse.json();
    if (!emailResponse.ok) {
      throw new Error(`Erro ao enviar email: ${JSON.stringify(emailData) || 'Desconhecido'}`);
    }

    console.log('Email enviado com sucesso para:', emailData.id);

    // 5. Atualiza o status do aluno para "enviado"
    await supabase.from('participants')
      .update({ certificate_status: 'enviado', certificate_url: certificateUrl })
      .eq('id', aluno.id);

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });

  } catch (error) {
    if (req.body) {
       const payload = await req.json().catch(() => null);
       if (payload && payload.record) {
          const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
          await supabase.from('participants').update({ certificate_status: 'erro' }).eq('id', payload.record.id);
       }
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
})