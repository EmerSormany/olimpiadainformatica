import { useToast } from "@chakra-ui/react";
import { supabase } from "../utils/supabase";


export const useNewSchool = () => {
    const toast = useToast()

    const registerNewSchool = async (newSchool) => {
        
        const { error } = await supabase
        .from('schools')
        .insert([{ name: newSchool.trim() }]);

        if (error) {
            toast({
                title: 'Erro ao cadastrar',
                description: 'Verifique se o nome já existe ou tente novamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Escola cadastrada!',
                description: `A escola "${newSchool}" já está disponível para os alunos.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    }
    return {registerNewSchool}
}