import { supabase } from "../utils/supabase";
import { useToast } from "@chakra-ui/react";

export const useDelete = () => {

    const toast = useToast()

    const exclude = async (id) => {
        const {error} = await supabase.from('schools').delete().eq('id', id).select();
        
        if (error) {
            toast({
                title: 'Erro ao Excluir Escola',
                description: 'Ocorreu um erro inexperado ao realizar a exclusão.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Escola Excluída!',
                description: `A escola foi excluída com sucesso.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    }
    return {exclude}
}