import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Layout } from "@ui-kitten/components"

import { RoutineTrakingType } from "../../../domain/entities/routine_traking.type";
import { msRoutineTrakingExercise } from "../../../api/msRoutineTrakingExercise";
import { msExercise } from "../../../api/msExercise";
import { ExerciseAndExerciseTrakingInteface } from "../../../infrastructure/interfaces/exercise_and_exercise_traking_interface";
import { CardExercise } from "../exercises/CardExercise";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigation";

interface Props {
    routineTraking: RoutineTrakingType;
};

export const ListExerciseRoutineTraking = ({routineTraking}: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [ 
        listExercisesAndExercisesTraking, 
        setListExercisesAndExercisesTraking 
    ] = useState<ExerciseAndExerciseTrakingInteface[]>([]);

    const {data: exercisesTrakingList = [] } = useQuery({
        queryKey: ['routine_traking_exercise', routineTraking.id],
        queryFn: () => msRoutineTrakingExercise.getAllRoutinesTrakingExercise(50, 1, routineTraking.id),
    }); 
    
    const {data: exercisesList = [] } = useQuery({
        queryKey: ['exercises'],
        queryFn: () => msExercise.getAllExercises(),
        staleTime: 1000 * 60 * 60
    }); 

    useEffect( () => {
        if(exercisesTrakingList.length > 0 && exercisesList.length > 0 ){

            const list = exercisesTrakingList.map(exercisesTrakingList => {
                const exercise = exercisesList.find(ex => ex.id === exercisesTrakingList.exerciseId);
                if (!exercise) return null; 
                return {
                    exercise,
                    exerciseTraking: exercisesTrakingList
                };
            })
            .filter((item): item is ExerciseAndExerciseTrakingInteface => item !== null);
            
            setListExercisesAndExercisesTraking(list);
        }
        
    }, [exercisesTrakingList, exercisesList]);

    return (
        <Layout style={{marginBottom: 150}}>
            {   
                listExercisesAndExercisesTraking.map( (item, i) => (
                    <CardExercise
                        onSelect={() => navigation.navigate('ExerciseTraking', { id: item.exerciseTraking.id })}
                        key={ i }
                        name={item.exercise.name || ''}
                        image={item.exercise.imageUrl || ''}
                        series={item.exerciseTraking.series.length || 0}
                    />
                ))
            }
        </Layout>
    )
}