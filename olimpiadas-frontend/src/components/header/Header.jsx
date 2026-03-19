import { Flex, Button, HStack, Text, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'

// Transformando o Flex do Chakra em um componente animado pelo Framer Motion
const MotionFlex = motion(Flex);

const HamburgerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function Header() {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
        onClose()
    }


    return (
        <>
        <MotionFlex
            as="header"
            w="100%"
            p={4}
            alignItems="center"
            justifyContent="space-between"
            bg="white"
            boxShadow="sm"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                fontWeight="bold" 
                color="greenOlympics.600"
            >
                1ª Olimpíada Picuiense de Informática
            </Text>

            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Button variant="ghost" colorScheme="greenOlympics" onClick={() => navigate('/')}>
                    Início
                </Button>
                <Button variant="ghost" colorScheme="greenOlympics" onClick={() => navigate('/about')}>
                    Sobre
                </Button>
                <Button variant="ghost" colorScheme="gray" isDisabled>
                    Regulamento
                </Button>
                <Button variant="solid" colorScheme="greenOlympics">
                    Inscrever-se
                </Button>
                <Button variant="ghost" colorScheme="gray" isDisabled>
                    Resultados
                </Button>
            </HStack>

            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="ghost"
                colorScheme="greenOlympics"
                aria-label="Abrir menu"
                icon={<HamburgerIcon />}
            />

        </MotionFlex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            
            <DrawerBody display="flex" flexDirection="column" mt={12}>
                <VStack spacing={6} w="100%">
                <Button variant="ghost" colorScheme="greenOlympics" onClick={() => handleNavigation('/')} w="100%">
                    Início
                </Button>
                <Button variant="ghost" colorScheme="greenOlympics" onClick={() => handleNavigation('/about')}>
                    Sobre
                </Button>
                <Button variant="ghost" colorScheme="gray" isDisabled>
                    Regulamento
                </Button>
                <Button variant="solid" colorScheme="greenOlympics" onClick={onClose} w="100%">
                    Inscrever-se
                </Button>
                <Button variant="ghost" colorScheme="gray" isDisabled w="100%">
                    Resultados
                </Button>
                </VStack>
            </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    );
}