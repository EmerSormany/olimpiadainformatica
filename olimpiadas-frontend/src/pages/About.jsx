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
          
          <Box textAlign="center" w="100%">
            <Heading as="h1" size="2xl" color="greenOlympics.700" mb={4}>
              Sobre a Olimpíada
            </Heading>
            <Text fontSize="lg" color="gray.600" fontWeight="medium">
              A Olimpíada Picuiense de Informática é mais do que uma competição; é a realização de um sonho e um marco para a educação tecnológica em nossa região.
            </Text>
          </Box>

          <Divider borderColor="greenOlympics.200" />

          <Box>
            <Heading as="h2" size="lg" color="greenOlympics.600" mb={3}>
              Organização
            </Heading>
            <Text color="gray.700" lineHeight="tall" textAlign='justify'>
              A 1ª Olimpíada Picuiense de Informática (OPI) é fruto de um esforço coletivo. A organização é responsabilidade de alunos do curso superior de Tecnologia em Sistemas para Internet (TSI) do Instituto Federal da Paraíba (IFPB/Campus Picuí), sob a orientação do Professor Antonio Carlos Buriti da Costa Filho. Essa parceria permite que acadêmicos de TSI apliquem seus conhecimentos na prática, enquanto proporcionam uma experiência única para os estudantes do Seridó e do Curimataú.            
            </Text>
          </Box>

          <Box w="100%">
            <Heading as="h2" size="lg" color="greenOlympics.600" mb={3}>
              Quem Pode Participar?
            </Heading>
            <Text color="gray.700" mb={3} textAlign='justify'>
              Focada em momentos cruciais de transição acadêmica, a competição é voltada para dois níveis:
            </Text>
            <UnorderedList spacing={2} pl={5} color="gray.700" fontWeight="normal">
              <ListItem>Ensino Fundamental: Alunos do 9º ano.</ListItem>
              <ListItem>Ensino Médio: Alunos do 3º ano.</ListItem>
            </UnorderedList>
            <Text color="gray.700" mt={3} lineHeight="tall" textAlign='justify'>
              As provas são elaboradas para desafiar o raciocínio lógico, a capacidade de resolução de problemas e o conhecimento técnico dos participantes, respeitando o nível de ensino de cada estudante.
            </Text>
          </Box>

          <Box w="100%">
            <Heading as="h2" size="lg" color="greenOlympics.600" mb={3}>
              Reconhecimento e Premiação
            </Heading>
            <Text color="gray.700" mb={3} textAlign={'justify'}>
              Valorizamos o esforço de cada estudante que aceita o desafio de testar seus conhecimentos. Por isso:
            </Text>
            <UnorderedList spacing={3} pl={5} color="gray.700" textAlign='justify'>
              <ListItem>
                Todos os participantes inscritos que realizarem a prova receberão um certificado de participação, reconhecendo sua dedicação e engajamento. Os certificados serão disponibilizados aqui mesmo no sítio oficial da OPI.
              </ListItem>
              <ListItem>
                Para cada nível de prova (Fundamental e Médio) haverá classificação em quatro categorias ordenadas por nota em ordem decrescente: ouro, prata, bronze e menção honrosa.
              </ListItem>
            </UnorderedList>
          </Box>

          <Box bg="greenOlympics.50" p={6} borderRadius="lg" w="100%" textAlign="center" borderLeft="4px solid" borderColor="greenOlympics.600">
            <Text fontSize="lg" color="greenOlympics.800" fontWeight="bold">
              Junte-se a nós nesta jornada de bits, lógica e muita descoberta.<br />
              A 1ª Olimpíada Picuiense de Informática espera por você!
            </Text>
          </Box>

        </VStack>
      </MotionContainer>
    </Box>
  );
}