import { useToast } from "@chakra-ui/react"
import { supabase } from "../utils/supabase"



export const usePutGrade = () => {
    const toast = useToast()
    const putGrade = async (grade, id) => {
        const { error } = await supabase.from('participants').update({grade}).eq('id', id)
        if (error) {
            toast({
                title: 'Erro ao Incluir Nota',
                description: 'Ocorreu um erro inexperado ao atribuir nota ao participante.',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Nota Incluída',
                description: 'Nota atribuída ao participante com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }
    return {putGrade}
}