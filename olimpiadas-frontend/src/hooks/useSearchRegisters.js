import { useToast } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { supabase } from "../utils/supabase";


export const useSearchRegistereds = () => {
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [registereds, setRegistereds] = useState([]);
    const toast = useToast()

    const searchRegistereds = useCallback( async () => {
        setIsLoadingTable(true)

        const { error, data} = await supabase
            .from('registered')
            .select('*, schools(name)')
            .order('name', {ascending: true})

        if (error) {
            toast({
                title: 'Erro ao Buscar Inscritos',
                description: 'Erro ao carregar alunos inscritos na prova.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            setRegistereds(data)
        }
        setIsLoadingTable(false)
    }, [toast]);
    return {searchRegistereds, isLoadingTable, registereds}
}