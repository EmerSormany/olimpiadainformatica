import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Heading, 
  Divider,
} from '@chakra-ui/react';

export default function Footer() {
  return (

    <Box bg="greenOlympics.900" color="white" mt="auto" w="100%">
      <Container as={Stack} maxW="1200px" py={10}>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>

          <Stack spacing={2}>
            <Heading as="h4" size="md" color="greenOlympics.300">
              Instituição
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Instituto Federal de Educação, Ciência e Tecnologia da Paraíba - IFPB
            </Text>
            <Text fontSize="sm" color="gray.300">
              PB-177, s/n, Picuí - PB, 58187-000
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h4" size="md" color="greenOlympics.300">
              Organização
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Alunos do 5º período do Curso Superior de Tecnologia em Sistemas para Internet do Instituto Federal da Paraíba – Campus Picuí.
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h4" size="md" color="greenOlympics.300">
              Coordenação
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Prof. Antonio Carlos Buriti da Costa Filho
            </Text>
            <Text fontSize="sm" color="gray.300">
              Curso Superior de Tecnologia em Sistemas para Internet do IFPB – Campus Picuí
            </Text>
            <Text fontSize="sm" color="greenOlympics.300" as="a" href="mailto:opi.pc@ifpb.edu.br">
              opi.pc@ifpb.edu.br
            </Text>
            <Text fontSize="sm" color="greenOlympics.300" as="a" href="https://www.instagram.com/opi.ifpb" target="_blank" rel="noopener noreferrer">
              @opi.ifpb
            </Text>
          </Stack>
        </SimpleGrid>

      </Container>
    </Box>
  );
}