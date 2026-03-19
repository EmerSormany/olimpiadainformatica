import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  UnorderedList, 
  ListItem, 
  Divider 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

export default function About() {
  return (
    <Box w="100%" py={{ base: 10, md: 16 }}>
      {/* maxW="container.md" (cerca de 768px) é o tamanho ideal para leitura de artigos */}
      <MotionContainer 
        maxW="container.md" 
        bg="white" 
        p={{ base: 6, md: 10 }} 
        borderRadius="xl" 
        boxShadow="sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8} align="start">
          
          {/* Cabeçalho da Página */}
          <Box textAlign="center" w="100%">
            <Heading as="h1" size="2xl" color="greenOlympics.600" mb={4}>
              Sobre a Olimpíada
            </Heading>
            <Text fontSize="lg" color="gray.600" fontWeight="medium">
              A Olimpíada Picuiense de Informática é mais do que uma competição; é a realização de um sonho e um marco para a educação tecnológica em nossa região.
            </Text>
          </Box>

          <Divider borderColor="greenOlympics.200" />

          {/* Seção 1 */}
          <Box>
            <Heading as="h2" size="lg" color="greenOlympics.500" mb={3}>
              O Idealizador e o Sonho
            </Heading>
            <Text color="gray.700" lineHeight="tall">
              O projeto nasce da visão e do entusiasmo do Professor Buriti, que há muito tempo acalentava o desejo de criar uma olimpíada de informática genuinamente picuiense. Para ele, a tecnologia é uma ferramenta de transformação social e intelectual, e fomentar o interesse por essa área desde a escola é o primeiro passo para formar os profissionais e pensadores do futuro.
            </Text>
          </Box>

          {/* Seção 2 */}
          <Box>
            <Heading as="h2" size="lg" color="greenOlympics.500" mb={3}>
              Organização e Colaboração
            </Heading>
            <Text color="gray.700" lineHeight="tall">
              A execução deste evento é fruto de um esforço coletivo e pedagógico. A olimpíada é organizada pela turma do 5º período do curso de Tecnologia em Sistemas para Internet (TSI), sob a orientação direta do Professor Buriti dentro da disciplina ministrada por ele. Essa parceria permite que os acadêmicos de TSI apliquem seus conhecimentos na prática, enquanto proporcionam uma experiência única para os estudantes da educação básica.
            </Text>
          </Box>

          {/* Seção 3: Listas */}
          <Box w="100%">
            <Heading as="h2" size="lg" color="greenOlympics.500" mb={3}>
              Quem Pode Participar?
            </Heading>
            <Text color="gray.700" mb={3}>
              Focada em momentos cruciais de transição acadêmica, a competição é voltada para dois grupos específicos:
            </Text>
            <UnorderedList spacing={2} pl={5} color="gray.700" fontWeight="bold">
              <ListItem>Ensino Fundamental: Alunos do 9º ano.</ListItem>
              <ListItem>Ensino Médio: Alunos do 3º ano.</ListItem>
            </UnorderedList>
            <Text color="gray.700" mt={3} lineHeight="tall">
              As provas são elaboradas para desafiar o raciocínio lógico, a capacidade de resolução de problemas e o conhecimento técnico dos participantes, respeitando o nível de ensino de cada categoria.
            </Text>
          </Box>

          {/* Seção 4: Premiação */}
          <Box w="100%">
            <Heading as="h2" size="lg" color="greenOlympics.500" mb={3}>
              Reconhecimento e Premiação
            </Heading>
            <Text color="gray.700" mb={3}>
              Valorizamos o esforço de cada estudante que aceita o desafio de testar seus conhecimentos. Por isso:
            </Text>
            <UnorderedList spacing={3} pl={5} color="gray.700">
              <ListItem>
                <strong>Todos os participantes</strong> inscritos que realizarem a prova receberão um certificado de participação, reconhecendo sua dedicação e engajamento.
              </ListItem>
              <ListItem>
                <strong>Os grandes vencedores</strong> de cada modalidade serão condecorados com o título de vencedor e um certificado especial de mérito, celebrando sua excelência e destaque na competição.
              </ListItem>
            </UnorderedList>
          </Box>

          {/* Fechamento */}
          <Box bg="greenOlympics.50" p={6} borderRadius="lg" w="100%" textAlign="center" borderLeft="4px solid" borderColor="greenOlympics.500">
            <Text fontSize="lg" color="greenOlympics.800" fontWeight="bold">
              Junte-se a nós nesta jornada de bits, lógica e muita descoberta.<br />
              A Olimpíada Picuiense de Informática espera por você!
            </Text>
          </Box>

        </VStack>
      </MotionContainer>
    </Box>
  );
}