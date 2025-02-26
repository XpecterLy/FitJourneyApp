import { useQuery } from "@tanstack/react-query";
import { msRoutineTraking } from "../../api/msRoutineTraking";
import { useAuthStore } from "./useLogin";

export const useRoutineTrackings = () => {
    
        const { user} = useAuthStore();

    const { data: routineTrackings = [] } = useQuery({
        queryKey: ['routinesTraking', `${user!.id}`],
        queryFn: () => msRoutineTraking.getAllRoutinesTraking(undefined, undefined, undefined, 'active'),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    return {
        routineTrackings
    }
}