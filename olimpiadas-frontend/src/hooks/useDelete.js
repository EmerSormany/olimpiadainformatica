import { supabase } from "../utils/supabase";
import { useToast } from "@chakra-ui/react";

export const useDelete = () => {

    const toast = useToast()

    const exclude = async (table, id) => {
        const {error, data} = await supabase.from(table).delete().eq('id', id).select();

        let deleted = `Inscrito ${data[0].name} excluído`
        if (table === 'schools') {
            deleted = `Escola ${data[0].name} excluída.`
        }

        if (error) {
            toast({
                title: `Erro ao Excluir`,
                description: 'Ocorreu um erro inexperado ao realizar a exclusão.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: `Sucesso!`,
                description: `${deleted}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    }
    return {exclude}
}