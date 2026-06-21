import { Box, Button, Container, Heading, Text, VStack, Avatar} from '@chakra-ui/react';
import SchoolsManagement from '../components/admin/SchoolsManagement';

export default function AdmPage({ session }) {

  // Se não houver sessão ativa (segurança extra)
  if (!session) return null;

  return (
    <Container maxW="container.md" py={12}>
      <Box bg="white" p={8} borderRadius="xl" boxShadow="sm" textAlign="center">
        <VStack spacing={6}>
          
          <SchoolsManagement />
        </VStack>
      </Box>
    </Container>
  );
}