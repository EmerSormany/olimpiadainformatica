import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, VStack, Heading, Flex, Spinner, HStack, Button, Tooltip, useToast, Input
, InputGroup, InputLeftElement} from "@chakra-ui/react"
import { useEffect, useState} from "react";
import {useSearchRegistereds} from '../../hooks/useSearchRegisters';
import { usePutGrade } from "../../hooks/usePutGrade";
import { TbReload, TbCertificate } from "react-icons/tb";
import { useDelete } from '../../hooks/useDelete';
import GradePopover from "../modals/GradePopover";
import { LuSearch } from "react-icons/lu";
import { supabase } from "../../utils/supabase"; // refatorar


export default function RegisteredManagement() {

    const {searchRegistereds, isLoadingTable, registereds} = useSearchRegistereds()
    const { putGrade } = usePutGrade()
    const toast = useToast()
    const {exclude} = useDelete()
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        searchRegistereds();
    }, [searchRegistereds])

    const filteredParticipants = registereds.filter((registered) => registered.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handlePutGrade = (grade, id) => {
        if (grade === '') {
            toast({
                title: 'Nota vazia',
                description: 'Preencha a nota corretamente.',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        } else {
            putGrade(grade, id)
        }
    }

    const handleDelete = async (table, id) => {
        if (window.confirm('Deseja realmente excluir o inscrito?')) {
            await exclude(table , id) 
            await searchRegistereds()
        }
    }

    const handleSendCertificates = async () => {
        // Confirmação de segurança
        if (!window.confirm("Deseja iniciar o envio dos certificados para os alunos aprovados?")) return;

        // Define qual a nota mínima de aprovação (ex: 60)
        const MINIMUM_GRADE = 0;

        toast({ 
            title: 'Iniciando envios...', 
            description: 'Os certificados estão sendo processados.', 
            status: 'info',
            duration: 4000
        });
        

        // Esse único comando atualiza milhares de linhas de uma vez, 
        // ativando a função apenas para quem tirar a nota necessária e não recebeu ainda.
        const { error } = await supabase
            .from('participants')
            .update({ certificate_status: 'processando' })
            .gte('grade', MINIMUM_GRADE) // Maior ou igual a nota de corte
            .eq('certificate_status', 'pendente'); // Apenas os que ainda não foram enviados

        if (error) {
            toast({ title: 'Erro ao iniciar envios', status: 'error' });
            console.error(error);
        } else {
            toast({ title: 'Sucesso!', description: 'Fila de certificados criada.', status: 'success' });
            // Recarrega a tabela para mostrar o status "processando" na tela
            searchRegistereds(); 
        }
    }

    return (
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" w="100%">
            <VStack spacing={6} align="stretch">
                <Flex 
                    direction={{base: 'column', md: 'row'}}
                    justify={'space-between'}
                    align={{base: 'stretch', md: 'center'}}
                    borderBottom={'1px solid'}
                    borderColor={'gray.100'}
                    pb={4}
                    gap={4}
                    justifyContent={'center'}
                >
                    <Heading as="h2" size="md" color="greenOlympics.600" textAlign={'center'} flex={1}>
                        Gerenciamento de Inscritos
                    </Heading>

                    <InputGroup maxW={{base:'100%', md: '320px'}}>
                        <InputLeftElement>
                            <LuSearch/>                  
                        </InputLeftElement>
                        <Input  
                            placeholder="Digite o nome do aluno"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            focusBorderColor="greenOlympics.500"
                            borderRadius={'full'}
                            bg={'gray.50'}
                            />
                    </InputGroup>
                </Flex>

                { isLoadingTable ? (
                    <Flex justify="center" align="center" p={8}>
                        <Spinner color="greenOlympics.500" />
                    </Flex>
                ) : (
                    <TableContainer w={'100%'} overflow={'auto'}>
                        <Table variant="simple" size="sm" layout='fixed' w={'100%'}>
                            <Thead bg="gray.50">
                                <Tr>
                                    <Th py={4} px={2} width={'17%'}>Inscritos (Total: {filteredParticipants.length})</Th>
                                    <Th py={4} px={2} width={'8%'}>CPF</Th>
                                    <Th py={4} px={2} width={'8%'}>WhatsApp</Th>
                                    <Th py={4} px={2} width={'8%'}>Série</Th>
                                    <Th py={4} px={2} width={'16%'}>E-mail</Th>
                                    <Th py={4} px={2} width={'6%'}>Nota</Th>
                                    <Th py={4} px={2} width={'15%'}>Escola</Th>
                                    <Th py={4} px={2} width={'8%'} >
                                        <HStack>
                                            <Tooltip label='Enviar Certificados'>
                                                <Button size='sm' colorScheme='greenOlympics' onClick={handleSendCertificates}><TbCertificate /></Button>
                                            </Tooltip>
                                            <Tooltip label='Recarregar Inscritos'>
                                                <Button size='sm' colorScheme='greenOlympics' onClick={searchRegistereds}><TbReload /></Button>
                                            </Tooltip>
                                        </HStack>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredParticipants.length === 0 ? (
                                <Tr>
                                    <Td colSpan={8} color="gray.400" textAlign="center" py={6}>
                                        {searchTerm ? 'Nenhum aluno encontrado com esse nome.' : 'Nenhum inscrito até o momento.'}
                                    </Td>
                                </Tr>
                                ) : (
                                    filteredParticipants.map((registered) => (
                                    <Tr key={registered.id} _hover={{ bg: 'gray.50' }}>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700" whiteSpace="normal">
                                            <HStack>
                                                <Tooltip label='Excluir Inscrito'>
                                                    <Button size={'xs'} colorScheme='red' onClick={() => handleDelete('participants', registered.id)}>Del</Button>
                                                </Tooltip>
                                                <div>
                                                    {registered.name} 
                                                </div>
                                            </HStack>
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700">
                                            {registered.cpf}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700">
                                            {registered.phone}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700">
                                            {registered.school_year}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700" isTruncated>
                                            {registered.email}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700">
                                            {registered.grade || 'Sem Nota'}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700" whiteSpace="normal">
                                            {registered.schools?.name || 'Sem escola'}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700">
                                            <HStack spacing={2} justify='center'>
                                                <GradePopover 
                                                    registered={registered} 
                                                    onSaveGrade={handlePutGrade} 
                                                    />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                ))
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </VStack>
        </Box>
    )
}