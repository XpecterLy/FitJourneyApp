import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query"
import { ExerciseType } from "../../domain/entities/exercise.type";
import { useQuery } from "@tanstack/react-query";
import { msRoutineTrakingExercise } from "../../api/msRoutineTrakingExercise";
import { msExercise } from "../../api/msExercise";
import { SerieType } from "../../domain/entities/routine_traking_exercise.type";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../navigation/StackNavigation";

interface Props {
    exerciseTrakingId: string;
}

export const useExerciseTraking = ({ exerciseTrakingId }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const queryClient = useQueryClient();

    const [ serie, setSerie ] = useState<SerieType>({
        repetitions: 0,
        time: 0,
        weight: 0
    });

    const [ exerciseData, setExerciseData ] = useState<ExerciseType>( {
        id: '',
        details: '',
        imageUrl: '',
        muscleGroupId: '',
        name: '',
        trainingStyleId: ''
    } );
    
    const { isLoading, data: exerciseTrakingData } = useQuery({
        queryKey: ['exerciseTraking', exerciseTrakingId],
        queryFn: () => msRoutineTrakingExercise.getRoutineTrakingExerciseById(exerciseTrakingId),
    });

    const {data: exercisesList = [] } = useQuery({
        queryKey: ['exercises'],
        queryFn: () => msExercise.getAllExercises(),
        staleTime: 1000 * 60 * 60
    }); 
    
    useEffect( () => {
        if(exerciseTrakingData){
            const exercise = exercisesList.find( item => item.id ==  exerciseTrakingData.exerciseId);
            if(exercise) setExerciseData(exercise);
        }
    }, [exerciseTrakingData] );

    const changeRepetitions = (repVal: number) => {
        if(serie.repetitions == 0 && repVal == -1) return;
        setSerie({...serie, repetitions: serie.repetitions + repVal})
    }

    const changeWeight = (weightVal: number) => {
        if(serie.weight == 0 && weightVal == -1) return;
        setSerie({...serie,  weight: serie.weight + weightVal})
    }

    const addRoutine = async () => {
        await msRoutineTrakingExercise.addRoutineToTrakingExercise(exerciseTrakingId, serie);
        await new Promise(resolve => setTimeout(resolve, 200));
        navigation.navigate('RoutineTraking', { id: exerciseTrakingData!.routineTrakingId } );
    }

    return {
        serie,
        isLoading,
        exerciseData,
        exerciseTrakingData,
        changeRepetitions,
        changeWeight,
        addRoutine
    }
}