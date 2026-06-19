import { useEffect, useState } from 'react';
import { Flex, Box, Heading, Text, Button, VStack, Image, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'

import logoOPI from '../../assets/OPI_Preto.png';
import logoIFPB from '../../assets/logo.ifpb.png';
import logoTSI from '../../assets/tsi.png';

const MotionBox = motion(Box);

export default function Hero() {
  const [positions, setPositions] = useState([0, 1, 2]);

  const images = [logoOPI, logoIFPB, logoTSI];

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) => {

        const next = [...prev];
        next.unshift(next.pop());
        return next;

      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getVariant = (positionIndex) => {
    const variants = {
      0: {
        x: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
        filter: "blur(0px)",
      },
      1: {
        x: "60%",
        scale: 0.7,
        zIndex: 5,
        opacity: 0.6,
        filter: "blur(2px)",
      },
      2: {
        x: "-60%",
        scale: 0.7,
        zIndex: 5,
        opacity: 0.6,
        filter: "blur(2px)",
      },
    };
    return variants[positionIndex];
  };

  return (
    <Box w="100%" maxW="1200px" mx="auto" px={6} py={{ base: 12, md: 12 }}>
      <Flex
        w="100%"
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        gap={{ base: 12, md: 20 }}
        mb={24}
      >

        <Box 
          flex={{ base: "none", md: "1" }} 
          position="relative" 
          h={{ base: "250px", md: "350px" }} 
          w="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          style={{ perspective: "1000px" }}
        >
          {images.map((img, index) => (
            <MotionBox
              key={index}
              initial={false}
              animate={getVariant(positions[index])}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              position="absolute"
              bg="white"
              p={5}
              borderRadius="full"
              boxShadow="2xl"
              border="4px solid"
              borderColor="greenOlympics.800"
              w={{ base: '180px', md: '280px' }}
              h={{ base: '180px', md: '280px' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              bgColor='white'
            >
              <Image 
                src={img} 
                alt={`Logo ${index}`} 
                objectFit="contain" 
                w="80%" 
                h="80%" 
              />
            </MotionBox>
          ))}
        </Box>

        <VStack
          flex={1}
          align={{ base: "center", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
          spacing={6}
        >
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} color="gray.800" lineHeight="1.2">
            Desafie seus limites na <Text as="span" color="greenOlympics.500">Olimpíada de Informática</Text>
          </Heading>

          <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" textAlign={'justify'} fontWeight={700}>
            Prepare-se para viver a emoção da primeira Olimpíada Picuiense de Informática!
            Nossas provas foram criadas estrategicamente para os
            momentos decisivos de transição acadêmica de cada aluno. É o palco perfeito para você
            testar seu raciocínio lógico, sua capacidade de resolver problemas e todo o seu talento.<br />
            Não fique de fora!
          </Text>
        </VStack>
      </Flex>

      <VStack spacing={6} textAlign={'center'} w='100%' maxW={'1200px'} mx={'auto'}>
        <Divider borderColor="greenOlympics.200" maxW={'1000px'} />
        <Heading as={'h2'} size={'xl'} color="greenOlympics.600">QUEM PODE PARTICIPAR</Heading>
        <Text fontSize={'lg'} fontWeight={500} maxW="900px">
          A competição foi concebida especificamente para estudantes do <strong>9º ano do Ensino Fundamental</strong> e do <strong>3º ano do Ensino Médio</strong>. 
          Ressaltamos que a inscrição é facultada a alunos de outras etapas de ensino, desde que estes estejam cientes de que os conteúdos e 
          critérios avaliativos são nivelados pelos anos supramencionados. É importante considerar que a disparidade de maturidade académica e 
          experiência técnica pode resultar em vantagens competitivas desproporcionais entre os participantes.
        </Text>
        <Button
          size="lg"
          colorScheme="greenOlympics"
          boxShadow="md"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
          onClick={() => navigate('/form')}
        >
          Quero me Inscrever
        </Button>
      </VStack>
    </Box>
  );
}