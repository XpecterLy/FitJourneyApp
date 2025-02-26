import { useQuery } from "@tanstack/react-query";
import { msRoutine } from "../../api/msRoutine";

export const useRoutine = () => {
    const { data: routines } = useQuery({
        queryKey: ['routines'],
        staleTime: 1000 * 60 * 60, // 1 hour
        queryFn: () => msRoutine.getAllRoutines(),
    });

    return {
        routines
    }
}