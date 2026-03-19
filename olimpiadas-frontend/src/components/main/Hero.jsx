import { Flex, Box, Heading, Text, Button, VStack , Image} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import logo from '../../assets/OPI_Preto.png'

const MotionBox = motion(Box);

export default function Hero() {
  return (
    <Flex
      as="section"
      w="100%"
      maxW="1200px"
      mx="auto"
      px={6}
      py={{ base: 12, md: 14 }}
      direction={{ base: 'column', md: 'row' }} 
      align="center"
      justify="space-between"
      gap={{ base: 12, md: 20 }}
    >

      <MotionBox
        flex={{base: 1, md: "none"}}
        display="flex"
        justifyContent="center"
        animate={{ y: [0, -20, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >

        <Box 
          // bg="greenOlympics.50" 
          p={5} //era 8
          borderRadius="full" 
          boxShadow="xl"
          border="4px solid" 
          borderColor="greenOlympics.800"
          w={{base:'200px', md: '350px'}}//incluído
          h={{base:'200px', md: '320px'}}//incluído
          display="flex" //incluído
          alignItems="center"//incluído
          justifyContent="center"//incluído
          overflow="hidden"//incluído
        >
            <Image
                src={logo}
                alt='Logotipo da olimpíada'
                objectFit="contain"
                w="100%"
                h="100%"
            />
        </Box>
      </MotionBox>

      <VStack 
        flex={1} 
        align={{ base: "center", md: "flex-start" }} 
        textAlign={{ base: "center", md: "left" }}
        spacing={6}
      >
        <Heading 
          as="h1" 
          size={{ base: "2xl", md: "3xl" }} 
          color="gray.800"
          lineHeight="1.2"
        >
          Desafie seus limites na Olimpíada de Informática
        </Heading>
        
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          [ Uma competição desenvolvida para estudantes dos ensinos fundamental e médio. 
          Teste suas habilidades em lógica, programação e resolução de problemas estruturados pela nossa universidade. ]
        </Text>

        <Button 
          size="lg" 
          colorScheme="greenOlympics" 
          boxShadow="md"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          Quero me Inscrever
        </Button>
      </VStack>
    </Flex>
  );
}