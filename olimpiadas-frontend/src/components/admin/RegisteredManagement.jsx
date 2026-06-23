import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, VStack, Heading, Flex, Spinner, HStack, Button } from "@chakra-ui/react"
import { useEffect } from "react";
import {useSearchRegistereds} from '../../hooks/useSearchRegisters'


export default function RegisteredManagement() {

    const {searchRegistereds, isLoadingTable, registereds} = useSearchRegistereds()

    useEffect(() => {
        searchRegistereds();
    }, [searchRegistereds])


    return (
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" w="100%">
            <VStack spacing={6} align="stretch">

                <Box borderBottom="1px solid" borderColor="gray.100" pb={4} textAlign={'center'}>
                    <Heading as="h2" size="md" color="greenOlympics.600">
                        Gerenciamento de Inscritos
                    </Heading>
                </Box>

                { isLoadingTable ? (
                    <Flex justify="center" align="center" p={8}>
                        <Spinner color="greenOlympics.500" />
                    </Flex>
                ) : (
                    <TableContainer w={'100%'} overflow={'auto'}>
                        <Table variant="simple" size="sm" layout='fixed' w={'100%'}>
                            <Thead bg="gray.50">
                                <Tr>
                                    <Th py={4} px={2} width={'17%'}>Inscritos (Total: {registereds.length})</Th>
                                    <Th py={4} px={2} width={'8%'}>CPF</Th>
                                    <Th py={4} px={2} width={'8%'}>WhatsApp</Th>
                                    <Th py={4} px={2} width={'8%'}>Série</Th>
                                    <Th py={4} px={2} width={'16%'}>E-mail</Th>
                                    <Th py={4} px={2} width={'6%'}>Nota</Th>
                                    <Th py={4} px={2} width={'12.5%'}>Escola</Th>
                                    <Th py={4} px={2} width={'8%'} textAlign="center" >Ações</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {registereds.length === 0 ? (
                                <Tr>
                                    <Td colSpan={2} color="gray.400" textAlign="center" py={6}>
                                        Nenhum inscrito até o momento.
                                    </Td>
                                </Tr>
                                ) : (
                                    registereds.map((registered) => (
                                    <Tr key={registered.id} _hover={{ bg: 'gray.50' }}>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700" whiteSpace="normal">
                                            {registered.name} 
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
                                            {registered.schools.name || 'Sem escola'}
                                        </Td>
                                        <Td py={3} px={2} fontWeight="medium" color="gray.700">
                                            <HStack spacing={2} justify='center'>
                                                <Button size={'xs'} colorScheme='yellow' variant={'outline'} title='Editar Escola' onClick={() => null}>att</Button>
                                                <Button size={'xs'} colorScheme='red' variant={'outline'} title='Deletar Escola' onClick={() => null}>Del</Button> 
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