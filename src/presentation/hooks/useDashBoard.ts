import { useQuery } from "@tanstack/react-query";
import { msCategoryMuscleGroup } from "../../api/msCategoryMuscleGroup";
import { msExercise } from "../../api/msExercise";
import { msRoutineTrakingExercise } from "../../api/msRoutineTrakingExercise";
import { useAuthStore } from "./useLogin";

export const useDashBoardData = () => {
    const { user } = useAuthStore();

    const {data: exercisesTrakingList = [] } = useQuery({
        queryKey: ['routine_traking_exercise', user!.id],
        queryFn: () => msRoutineTrakingExercise.getAllRoutinesTrakingExercise(50, 1, undefined),
    }); 

    const {data: exercisesList = [] } = useQuery({
        queryKey: ['exercises'],
        queryFn: () => msExercise.getAllExercises(),
        staleTime: 1000 * 60 * 60
    }); 
    
    const {data: categoriesMuscleGroupList = [] } = useQuery({
        queryKey: ['categoriesMuscleGroupList'],
        queryFn: () => msCategoryMuscleGroup.getAllECategoryMuscleGroup(),
        staleTime: 10000 * 60 * 60
    }); 

    const dataPecho = exercisesList.filter( item => item.muscleGroupId == categoriesMuscleGroupList.find( item => item.name == 'pecho' )?.id );
    const dataBack = exercisesList.filter( item => item.muscleGroupId == categoriesMuscleGroupList.find( item => item.name == 'espalda' )?.id );
    const dataLeg = exercisesList.filter( item => item.muscleGroupId == categoriesMuscleGroupList.find( item => item.name == 'pierna' )?.id );
    const dataBiceps = exercisesList.filter( item => item.muscleGroupId == categoriesMuscleGroupList.find( item => item.name == 'biceps' )?.id );
    const dataTriceps = exercisesList.filter( item => item.muscleGroupId == categoriesMuscleGroupList.find( item => item.name == 'tríceps' )?.id );
    const dataDeltoide = exercisesList.filter( item => item.muscleGroupId == categoriesMuscleGroupList.find( item => item.name == 'deltoide' )?.id );

    const countPecho = exercisesTrakingList.filter( item => item.exerciseId == dataPecho.find( d => d.id == item.exerciseId )?.id );
    const countBack = exercisesTrakingList.filter( item => item.exerciseId == dataBack.find( d => d.id == item.exerciseId )?.id );
    const countLeg = exercisesTrakingList.filter( item => item.exerciseId == dataLeg.find( d => d.id == item.exerciseId )?.id );
    const countBiceps = exercisesTrakingList.filter( item => item.exerciseId == dataBiceps.find( d => d.id == item.exerciseId )?.id );
    const countTriceps = exercisesTrakingList.filter( item => item.exerciseId == dataTriceps.find( d => d.id == item.exerciseId )?.id );
    const countDeltoide = exercisesTrakingList.filter( item => item.exerciseId == dataDeltoide.find( d => d.id == item.exerciseId )?.id );

    return {
        countPecho,
        countBack,
        countLeg,
        countBiceps,
        countTriceps,
        countDeltoide,
    }
}