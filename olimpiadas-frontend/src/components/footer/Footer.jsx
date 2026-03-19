import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Heading, 
  Divider,
  Image
} from '@chakra-ui/react';
// import logo from '../../assets/logo.ifpb.png'
// import logo from '../../assets/tsi.png'

export default function Footer() {
  return (

    <Box bg="greenOlympics.900" color="white" mt="auto" w="100%">
      <Container as={Stack} maxW="1200px" py={10}>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>

          <Stack spacing={2}>
            <Heading as="h4" size="md" color="verdeOlimpiada.300">
              Instituição
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Instituto Federal de Educação, Ciência e Tecnologia da Paraíba
            </Text>
            <Text fontSize="sm" color="gray.300">
              Coodenação de Tecnologia em Sistemas para Internet
            </Text>
            <Text fontSize="sm" color="gray.300">
              PB-177, s/n, Picuí - PB, 58187-000
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h4" size="md" color="verdeOlimpiada.300">
              Organização
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Alunos do 5º período do curso Tecnologias em Sistemas para Internet do Instituto Federal da Paraíba do campi Picuí.
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h4" size="md" color="verdeOlimpiada.300">
              Professor Orientador
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Prof. Me. Antonio Carlos Buriti da Costa Filho
            </Text>
            <Text fontSize="sm" color="gray.300">
              Mestre em Engenharia Elétrica, coordenador do curso de TSI e coordenador do projeto de extensão das Olimpíadas.
            </Text>
            <Text fontSize="sm" color="verdeOlimpiada.300" as="a" href="mailto:tsi.pc@ifpb.edu.br">
              tsi.pc@ifpb.edu.br
            </Text>
            <Text>

            </Text>
          </Stack>

        </SimpleGrid>

        <Divider my={2} borderColor="verdeOlimpiada.700" />

        <Box textAlign="center">
          <Text fontSize="xs" color="gray.400">
            © {new Date().getFullYear()} Olimpíadas de Informática. Todos os direitos reservados.
          </Text>
        </Box>

      </Container>
    </Box>
  );
}