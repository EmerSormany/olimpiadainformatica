import { Box, Button, Container, Heading, Text, VStack, useToast, Icon} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '../utils/supabase';
import { useState } from 'react';

const MotionContainer = motion(Container);

export default function Login() {
  const [isConnecting, setIsConnecting] = useState(false);
  const toast = useToast();

  const handleGoogleLogin = async () => {
      setIsConnecting(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
              redirectTo: window.location.origin + '/admin',
      },
    });

    if (error) {
        toast({
            title: 'Erro na autenticação',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
        });
        setIsConnecting(false);
    }
  };

  return (
    <Box w="100%" py={{ base: 20, md: 32 }}>
      <MotionContainer
        maxW="md" bg="white" p={{ base: 8, md: 10 }}
        borderRadius="xl" boxShadow="sm" textAlign="center"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      >
        <VStack spacing={6}>
          <Box>
            <Heading as="h1" size="lg" color="greenOlympics.600" mb={2}>
              Painel do Administrador
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Área restrita para a comissão organizadora da Olimpíada.
            </Text>
          </Box>

          <Button
            w="100%" size="lg" variant="outline"
            leftIcon={<Icon as={FcGoogle} boxSize={6} />}
            onClick={handleGoogleLogin}
            isLoading={isConnecting}
            loadingText="Redirecionando..."
            borderColor="gray.300"
            _hover={{ bg: 'gray.50', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
          >
            Entrar com o Google
          </Button>
        </VStack>
      </MotionContainer>
    </Box>
  );
}