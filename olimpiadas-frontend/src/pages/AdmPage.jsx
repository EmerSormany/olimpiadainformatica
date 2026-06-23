import { Box, Container, HStack, VStack, useDisclosure, Flex, Tooltip, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody} from '@chakra-ui/react';
import SchoolsManagement from '../components/admin/SchoolsManagement';
import RegisteredManagement from '../components/admin/RegisteredManagement';
import { LuSchool } from "react-icons/lu";

export default function AdmPage({ session }) {
  const {isOpen, onClose, onOpen} = useDisclosure()

  if (!session) return null;

  return (
    <Container maxW="100vw" py={3} px={{base: 4, md: 6}}>
      <Flex gap={6} align={'start'} w='100%' maxW='100%'>
          <Box flex={1} minW={0} maxW='100%'>
            <RegisteredManagement />
          </Box>
          <VStack spacing={4} w={'20px'} pt={1} >
            <Tooltip label='Gerenciador de Escolas' placement='left'>
              <IconButton 
                icon={<LuSchool size={22}/>}
                colorScheme='greenOlympics'
                isRound
                boxShadow={'md'}
                onClick={onOpen}
                _hover={{ transform: 'scale(1.1)' }}
                transition={'all 0.2s'}
              />
            </Tooltip>
          </VStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={'4xl'} scrollBehavior='inside'>
        <ModalOverlay backdropFilter={'blur(3px)'}/>
        <ModalContent bg={'transparent'} boxShadow={'none'}>
          <ModalCloseButton zIndex={1} top={4} right={4}/>
          <ModalBody p={0}>
            <SchoolsManagement />
          </ModalBody>
        </ModalContent>
      </Modal>

    </Container>
  );
}