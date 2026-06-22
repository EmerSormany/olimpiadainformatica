import { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, Heading, HStack, Text, Table, Thead, Tbody, Tr, Th, Td, 
  TableContainer, Spinner, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import {useNewSchool} from '../../hooks/useNewSchool';
import {useSearchSchool} from '../../hooks/useSearchSchool';
import { useDelete } from '../../hooks/useDelete';
import { TbReload } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditModal from '../modals/EditModal' 

export default function SchoolsManagement() {
  const [newSchool, setNewSchool] = useState('');
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [schoolInEdit, setSchoolInEdit] = useState(null);
  const [ editadedName, setEditadedName ] = useState('')

  const {searchSchool, schools, isLoadingTable} = useSearchSchool();
  const {registerNewSchool} = useNewSchool();
  const { exclude } = useDelete()
  
  // Busca as escolas automaticamente assim que o painel é aberto
  useEffect(() => {
    searchSchool()
  }, [searchSchool]);
  
  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir a escola?')) {
      await exclude(id) 
      await searchSchool()
    }
  }

  const modalOpen = (school) => {
    setSchoolInEdit(school);
    setEditadedName(school.name);
    onOpen();
  }

  const handleNewSchool = async (e) => {
    e.preventDefault();

    if (!newSchool.trim()) return;
    setIsLoadingForm(true);

    await registerNewSchool(newSchool)

    setNewSchool(''); // Limpa o input
    await searchSchool();   // Recarrega a tabela para mostrar a nova escola

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
                    <Th textAlign={'right'}>
                     <Button size='md' colorScheme='greenOlympics' onClick={searchSchool} title='Atualizar Escolas'><TbReload /></Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {schools.length === 0 ? (
                    <Tr>
                      <Td colSpan={2} color="gray.400" textAlign="center" py={6}>
                        Nenhuma escola cadastrada ainda.
                      </Td>
                    </Tr>
                  ) : (
                    schools.map((school) => (
                      <Tr key={school.id} _hover={{ bg: 'gray.50' }}>
                        <Td py={3} fontWeight="medium" color="gray.700">
                          {school.name} 
                        </Td>
                        <Td>
                          <HStack spacing={2} justify='flex-end'>
                            <Button size={'xs'} colorScheme='yellow' variant={'outline'} title='Editar Escola' onClick={() => modalOpen(school)}><FaRegEdit /></Button>
                            <Button size={'xs'} colorScheme='red' variant={'outline'} title='Deletar Escola' onClick={() => handleDelete(school.id)}><MdDeleteOutline /></Button>
                          </HStack>
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

      <EditModal  props={[isOpen, onClose, schoolInEdit, editadedName, setEditadedName]}/>
    </Box>
  );
}