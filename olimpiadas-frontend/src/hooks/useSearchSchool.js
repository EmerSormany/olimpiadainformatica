import { useState, useCallback } from "react";
import { supabase } from "../utils/supabase";

export const useSearchSchool = () => {
    const [schools, setSchools] = useState([]);
    const [isLoadingTable, setIsLoadingTable] = useState(true);
    
    const searchSchool = useCallback( async () => {
        setIsLoadingTable(true);
        const { data } = await supabase
              .from('schools')
              .select('*')
              .order('name', { ascending: true });

            if (data) {
                setSchools(data)
            }

        setIsLoadingTable(false);
    }, []);
    return {searchSchool, schools, isLoadingTable}
}

