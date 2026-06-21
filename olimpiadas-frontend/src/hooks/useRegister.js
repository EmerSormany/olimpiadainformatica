import { supabase } from '../utils/supabase';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const useRegister = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const registerParticipant = async (formData, onSucess) => {
    setIsLoading(true)
    
    try {
      // Envio dos dados estruturados para a tabela 'inscritos'
      const { error } = await supabase
        .from('registered')
        .insert([
          {
            name: formData.name,
            cpf: formData.cpf,
            // escola: formData.escola,
            school_year: formData.school_year,
            phone: formData.phone,
            email: formData.email,
          }
        ]);
    
      //  Tratamento de erro retornado pelo banco (Ex: CPF duplicado)
      if (error) {
        if (error.code === '23505') { // Código do Postgres para violação de registro único
          toast({
            title: 'Erro na inscrição',
            description: 'Este CPF já está cadastrado na Olimpíada.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
        } else {
          throw error;
        }
        return;
      }
    
      //  Sucesso total
      toast({
        title: 'Inscrição realizada!',
        description: "Seus dados foram registrados com sucesso no sistema.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });

      if (onSucess) onSucess()
    
    } catch (error) {
      // Tratamento para erros inesperados (queda de conexão, etc)
      toast({
        title: 'Erro inesperado',
        description: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {registerParticipant, isLoading}
};
