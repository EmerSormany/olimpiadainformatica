import { useToast } from '@chakra-ui/react';
import { supabase } from "../utils/supabase";



export const useUpdate = () => {
    const toast = useToast()
    

    const update = async (id, name) => {
        const {error, data} = await supabase.from('schools').update({name}).eq('id', id).select()
        if (error) {
            toast({
                title: 'Erro ao Editar Escola',
                description: 'Ocorreu um erro inexperado ao editar o nome da escola.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Escola Editada!',
                description: `Nome alterado para "${data[0].name}" já está disponível para os alunos.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return {update}
}