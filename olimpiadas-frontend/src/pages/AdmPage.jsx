import { Box, Button, Container, Heading, Text, VStack, Avatar} from '@chakra-ui/react';
import { supabase } from '../utils/supabase';

export default function AdmPage({ session }) {

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Se não houver sessão ativa (segurança extra)
  if (!session) return null;

  const user = session.user;

  return (
    <Container maxW="container.md" py={12}>
      <Box bg="white" p={8} borderRadius="xl" boxShadow="sm" textAlign="center">
        <VStack spacing={6}>
          <Avatar size="xl" src={user.user_metadata.avatar_url} name={user.user_metadata.full_name} />
          
          <Box>
            <Heading as="h1" size="xl" color="greenOlympics.600" mb={2}>
              Bem-vindo ao Dashboard!
            </Heading>
            <Text color="gray.600">
              Autenticação realizada com sucesso para a conta administrativa.
            </Text>
          </Box>

          <Box bg="gray.50" p={4} borderRadius="md" w="100%" textAlign="left" fontSize="sm">
            <Text><strong>Nome:</strong> {user.user_metadata.full_name}</Text>
            <Text><strong>E-mail:</strong> {user.email}</Text>
            <Text><strong>ID de Sessão Supabase:</strong> {user.id}</Text>
          </Box>

          <Button colorScheme="greenOlympics" variant="outline" w="100%" onClick={handleLogout}>
            Sair
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}