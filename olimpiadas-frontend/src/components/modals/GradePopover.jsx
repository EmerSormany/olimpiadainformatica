import { useState } from "react";
import {Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, 
  PopoverArrow, PopoverCloseButton, Input, Button, HStack} from "@chakra-ui/react" 

// Sub-componente exclusivo para gerenciar o mini modal de cada linha
export default function GradePopover ({ registered, onSaveGrade }) {
  const [grade, setGrade] = useState('');

  const handleSubmit = () => {
    onSaveGrade(grade, registered.id);
    setGrade('');
  };

  return (
    // isLazy garante que o HTML oculto não pese na memória do navegador
    <Popover placement="left" isLazy>
      
      {/* O gatilho que abre o Popover (O seu botão amarelo original) */}
      <PopoverTrigger>
            <Button size={'xs'} colorScheme='orange'>Nota</Button>
      </PopoverTrigger>

      {/* O balão do Popover */}
      <PopoverContent w="220px" boxShadow="lg" _focus={{ outline: 'none' }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" fontSize="xs" color="gray.600">
          Atribuir nota para {registered.name.split(' ')[0]}
        </PopoverHeader>
        
        <PopoverBody>
          <HStack>
            <Input 
              size="sm" 
              type="number" 
              min={0} 
              max={100} 
              placeholder="0 a 100" 
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              focusBorderColor="greenOlympics.500"
            />
            <Button size="sm" colorScheme="greenOlympics" onClick={handleSubmit}>
              Salvar
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
      
    </Popover>
  );
};