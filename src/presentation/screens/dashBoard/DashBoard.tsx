import {
    LineChart
  } from "react-native-chart-kit";

import { useAuthStore } from "../../hooks/useLogin";
import { MainLayout } from "../../layouts/MainLayout"
import { Dimensions } from "react-native";
import { Layout, ListItem } from "@ui-kitten/components";
import { msRoutineTrakingExercise } from "../../../api/msRoutineTrakingExercise";
import { useQuery } from "@tanstack/react-query";
import { msExercise } from "../../../api/msExercise";
import { msCategoryMuscleGroup } from "../../../api/msCategoryMuscleGroup";

export const DashBoardScreen = () => {
    const { logout } = useAuthStore();
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
    
    return (
        <MainLayout title="Estadisticas" subTitle="" rightActionIcon="log-out-outline" rightAction={logout}>
            <Layout style={{ marginHorizontal: 10, marginTop: 20 }}>
                <LineChart
                    data={{
                        labels: ["Pecho", "Espalda", "Pierna", "Bicep", "Tricep", "Hombro"],
                        datasets: [
                            {
                                data: [
                                    countPecho.length,
                                    countBack.length,
                                    countLeg.length,
                                    countBiceps.length,
                                    countTriceps.length,
                                    countDeltoide.length,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-20} // from react-native
                    height={250}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#8f75bf",
                        backgroundGradientFrom: "#9884bb",
                        backgroundGradientTo: "#9f90ba",
                        decimalPlaces: 0, 
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </Layout>
        </MainLayout>
    )
}