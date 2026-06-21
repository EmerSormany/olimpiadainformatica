import { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, Heading, HStack, Text, Table, Thead, Tbody, Tr, Th, Td, 
  TableContainer, Spinner, Flex
} from '@chakra-ui/react';
import { supabase } from '../../utils/supabase';
import {useNewSchool} from '../../hooks/useNewSchool';

export default function SchoolsManagement() {
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState('');
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(true);

  // Busca as escolas automaticamente assim que o painel é aberto
  useEffect(() => {
    searchSchool();
  }, []);

  const searchSchool = async () => {
    setIsLoadingTable(true);
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar escolas:', error.message);
    } else if (data) {
      setSchools(data);
    }
    setIsLoadingTable(false);
  };
  
  const {registerNewSchool} = useNewSchool()

  const handleNewSchool = async (e) => {
    e.preventDefault();

    if (!newSchool.trim()) return;
    setIsLoadingForm(true);

    registerNewSchool(newSchool)

    setNewSchool(''); // Limpa o input
    searchSchool();   // Recarrega a tabela para mostrar a nova escola

    setIsLoadingForm(false);
  };

  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" w="100%">
      <VStack spacing={6} align="stretch">
        
        <Box borderBottom="1px solid" borderColor="gray.100" pb={4}>
          <Heading as="h2" size="md" color="greenOlympics.600">
            Gerenciamento de Escolas
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Cadastre as instituições de ensino que participarão da Olimpíada.
          </Text>
        </Box>

        {/* Formulário de Cadastro */}
        <form onSubmit={handleNewSchool}>
          <HStack align="flex-end" spacing={4}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="bold" color="gray.700">
                Nome da Escola
              </FormLabel>
              <Input 
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
                placeholder="Ex: IFPB Instituto Federal da Paraíba"
                focusBorderColor="greenOlympics.500"
              />
            </FormControl>
            <Button 
              type="submit" 
              colorScheme="greenOlympics" 
              isLoading={isLoadingForm}
              loadingText="Salvando"
              px={8}
            >
              Adicionar
            </Button>
          </HStack>
        </form>

        {/* Tabela de Listagem */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
          {isLoadingTable ? (
            <Flex justify="center" align="center" p={8}>
              <Spinner color="greenOlympics.500" />
            </Flex>
          ) : (
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead bg="gray.50">
                  <Tr>
                    <Th py={4}>Instituições Cadastradas ({schools.length})</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {schools.length === 0 ? (
                    <Tr>
                      <Td color="gray.400" textAlign="center" py={6}>
                        Nenhuma escola cadastrada ainda.
                      </Td>
                    </Tr>
                  ) : (
                    schools.map((school) => (
                      <Tr key={school.id} _hover={{ bg: 'gray.50' }}>
                        <Td py={3} fontWeight="medium" color="gray.700">
                          {school.name}
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>

      </VStack>
    </Box>
  );
}