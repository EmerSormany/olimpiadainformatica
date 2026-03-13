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
      py={{ base: 12, md: 10 }}
      direction={{ base: 'column', md: 'row' }} 
      align="center"
      justify="space-between"
      gap={{ base: 12, md: 20 }}
    >

      <MotionBox
        flex={1}
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
          bg="greenOlympics.100" 
          p={4} //era 8
          borderRadius="full" 
          boxShadow="xl"
          border="4px solid" 
          borderColor="greenOlympics.500"
          w={{base:'200px', md: '280px'}}//incluído
          h={{base:'200px', md: '280px'}}//incluído
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
          {/* <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V22M9 22H15M4.8 5H19.2C20.3201 5 20.8802 5 21.308 5.21799C21.6843 5.40973 21.9903 5.71569 22.182 6.09202C22.4 6.51984 22.4 7.0799 22.4 8.2V16.8C22.4 17.9201 22.4 18.4802 22.182 18.908C21.9903 19.2843 21.6843 19.5903 21.308 19.782C20.8802 20 20.3201 20 19.2 20H4.8C3.67989 20 3.11984 20 2.69202 19.782C2.31569 19.5903 2.00973 19.2843 1.81802 18.908C1.6 18.4802 1.6 17.9201 1.6 16.8V8.2C1.6 7.0799 1.6 6.51984 1.81802 6.09202C2.00973 5.71569 2.31569 5.40973 2.69202 5.21799C3.11984 5 3.67989 5 4.8 5Z" stroke="#369831" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10L10 12L8 14M13 14H16" stroke="#369831" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> */}
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
          Desafie seus limites na <Text as="span" color="greenOlympics.500">Olimpíada de Informática</Text>
        </Heading>
        
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          [ Uma competição desenvolvida para estudantes dos ensinos fundamental e médio. 
          Teste suas habilidades em lógica, programação e resolução de problemas estruturados pela nossa universidade. ]
        </Text>

        <Button 
          size="lg" 
          colorScheme="greenOlympcs" 
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