import { useState } from 'react';
import {
  Box, Button, Container, FormControl, FormLabel, Input, Select,
  VStack, Heading, Text, FormErrorMessage, Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { maskCPF, maskPhone , formSchema} from '../utils/masks';
import { useRegister } from '../hooks/useRegister';

const MotionContainer = motion(Container);

export default function Form() {

  const [formData, setFormData] = useState({
    name: '', cpf: '', escola: '', school_year: '', phone: '', email: ''
  });
  const [errors, setErrors] = useState({});

  const {registerParticipant, isLoading} = useRegister();

  // Manipulador de mudanças muito mais limpo
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') formattedValue = maskCPF(value);
    if (name === 'phone') formattedValue = maskPhone(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação Zod em uma única linha
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      // O Zod devolve os erros organizados; nós apenas formatamos para o Chakra UI ler
      const fieldErrors = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    await registerParticipant(formData), () => {
      setFormData({name: '', cpf: '', school_year: '', phone: '', email: ''})
    }
  };

  return (
    <Box w="100%" py={{ base: 10, md: 16 }}>
      <MotionContainer 
        maxW="container.sm" bg="white" p={{ base: 6, md: 10 }} 
        borderRadius="xl" boxShadow="sm"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      >
        <VStack spacing={6} align="start" as="form" onSubmit={handleSubmit}>
          
          <Box textAlign="center" w="100%" mb={4}>
            <Heading as="h1" size="xl" color="greenOlympics.600" mb={2}>
              Inscrição
            </Heading>
            <Text color="gray.600">
              Preencha o formulário abaixo para garantir sua participação.
            </Text>
          </Box>

          <Divider borderColor="greenOlympics.200" />

          <FormControl  isInvalid={!!errors.name}>
            <FormLabel fontWeight="bold" color="gray.700">Nome Completo</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} focusBorderColor="greenOlympics.500" />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl  isInvalid={!!errors.cpf}>
            <FormLabel fontWeight="bold" color="gray.700">CPF</FormLabel>
            <Input name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" maxLength={14} focusBorderColor="greenOlympics.500" />
            <FormErrorMessage>{errors.cpf}</FormErrorMessage>
          </FormControl>

          <FormControl  isInvalid={!!errors.escola}>
            <FormLabel fontWeight="bold" color="gray.700">Escola em que estuda</FormLabel>
            <Input name="escola" value={formData.escola} onChange={handleChange} focusBorderColor="greenOlympics.500" />
            <FormErrorMessage>{errors.escola}</FormErrorMessage>
          </FormControl>

          <FormControl  isInvalid={!!errors.sschool_yearerie}>
            <FormLabel fontWeight="bold" color="gray.700">Série</FormLabel>
            <Select name="school_year" value={formData.school_year} onChange={handleChange} placeholder="Selecione sua série atual" focusBorderColor="greenOlympics.500">
              <option value="9_fundamental">9º ano do Ensino Fundamental</option>
              <option value="3_medio">3º ano do Ensino Médio</option>
            </Select>
            <FormErrorMessage>{errors.school_year}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel fontWeight="bold" color="gray.700">WhatsApp</FormLabel>
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="(00) 00000-0000" maxLength={15} focusBorderColor="greenOlympics.500" />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl  isInvalid={!!errors.email}>
            <FormLabel fontWeight="bold" color="gray.700">E-mail</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="seu.email@exemplo.com" focusBorderColor="greenOlympics.500" />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <Button 
            type="submit" colorScheme="greenOlympics" size="lg" w="100%" mt={4}
            isLoading={isLoading} loadingText="Enviando..." boxShadow="md"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }} transition="all 0.2s"
          >
            Confirmar Inscrição
          </Button>

        </VStack>
      </MotionContainer>
    </Box>
  );
}