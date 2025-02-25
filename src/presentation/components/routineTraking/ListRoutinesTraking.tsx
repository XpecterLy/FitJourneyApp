import { Layout } from "@ui-kitten/components"
import { useAuthStore } from "../../hooks/useLogin";
import { useQuery } from "@tanstack/react-query";
import { msRoutineTraking } from "../../../api/msRoutineTraking";
import { CardRoutineTraking } from "./CardRoutineTraking";
import { useEffect, useState } from "react";
import { routineTraking_routine_type } from "../../../infrastructure/interfaces/routineTraking_routine";
import { msRoutine } from "../../../api/msRoutine";
import { ScrollView } from "react-native-gesture-handler";

export const ListRoutinesTraking = () => {

    const { user } = useAuthStore();

    const [ 
        listRoutineAndRoutineTraking, 
        setListRoutineAndRoutineTraking 
    ] = useState<routineTraking_routine_type[]>([]);

    const {isLoading, data: routineTraking = []} = useQuery({
        queryKey: ['routine_traking', user!.id],
        queryFn: () => msRoutineTraking.getAllRoutinesTraking()
    });

    const {data: routinesList = [] } = useQuery({
        queryKey: ['exercises'],
        queryFn: () => msRoutine.getAllRoutines(),
        staleTime: 1000 * 60 * 60
    }); 

    useEffect( () => {
            if(routineTraking.length > 0 && routinesList.length > 0 ){
    
                const list = routineTraking.map(trakingList => {
                    const routine = routinesList.find(r => r.id === trakingList.routineId);
                    if (!routine) return null; 
                    return {
                        routine,
                        routines_traking: trakingList
                    };
                })
                .filter((item): item is routineTraking_routine_type => item !== null);
                
                setListRoutineAndRoutineTraking(list);
            }
            
        }, [routineTraking, routinesList]);

    return (
        <ScrollView>
            {
                listRoutineAndRoutineTraking.reverse().map( (item, i) =>  
                    <CardRoutineTraking 
                        key={i}
                        routineName={item.routine.name} 
                        routineTrakingDateCreate={item.routines_traking.dateCreate} 
                        routineTrakingId={item.routines_traking.id} 
                        routineTrakingState={item.routines_traking.state} 
                    />
                )
            }
        </ScrollView>
    )
}