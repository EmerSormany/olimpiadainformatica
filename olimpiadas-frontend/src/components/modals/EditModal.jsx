import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input
    , HStack, Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useUpdate } from '../../hooks/useUpdate';
import { useSearchSchool } from '../../hooks/useSearchSchool';

export default function EditModal ({props}) {

    const [isOpen, onClose, schoolInEdit, editadedName, setEditadedName] = props

    const [isSavingEdit, setIsSavingEdit ] = useState(false)

    const {searchSchool} = useSearchSchool();
    const { update } = useUpdate()

    const handleUpdate = async () => {
        if (!editadedName.trim() || !schoolInEdit) return;
        
        setIsSavingEdit(true)
        await update(schoolInEdit.id, editadedName);
        await searchSchool();
        setIsSavingEdit(false)
        onClose()
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                Editar Escola
                </ModalHeader>
                <ModalCloseButton />
    
                <ModalBody>
                <FormControl isRequired>
                    <FormLabel>
                    Novo nome da insituição
                    </FormLabel>
                    <Input 
                    value={editadedName} 
                    onChange={(e) => setEditadedName(e.target.value)} 
                    focusBorderColor='greenOlympics.500'
                    />
                </FormControl>  
                </ModalBody>  
    
                <ModalFooter>
                <HStack>
                    <Button colorScheme='greenOlympics' onClick={handleUpdate} isLoading={isSavingEdit} loadingText='Salvando'>
                    Salvar Alteração
                    </Button>
                    <Button colorScheme='red' mr={3} onClick={onClose} isDisabled={isSavingEdit}>
                    Cancelar
                    </Button>
                </HStack>
                </ModalFooter>
            </ ModalContent>
    
        </Modal>
    )
}