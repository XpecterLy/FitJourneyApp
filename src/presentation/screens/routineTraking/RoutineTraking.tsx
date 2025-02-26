import { MainLayout } from "../../layouts/MainLayout"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigation"
import { useQuery } from "@tanstack/react-query"
import { msRoutineTraking } from "../../../api/msRoutineTraking"
import { ScrollView } from "react-native-gesture-handler"
import { FullScreenLoader } from "../../components/UI/FullScreenLoader"
import { ListExerciseRoutineTraking } from "../../components/routineTraking/ListExerciseRoutineTraking"

interface Props extends StackScreenProps<RootStackParams, 'RoutineTraking'>{};

export const RoutineTraking = ({route}: Props) => {

    const routineTrakingId = route.params.id;

    const { isLoading, data: routineTrakingData  } = useQuery({
        queryKey: ['routineTraking', routineTrakingId],
        queryFn: () => msRoutineTraking.getRoutineTrakingById(routineTrakingId),
    });

    return (
        <MainLayout title="Rutina" subTitle="Seguimiento De Rutina">
            {
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >
                    { isLoading 
                        ? <FullScreenLoader/> 
                        : routineTrakingData && <ListExerciseRoutineTraking routineTraking={routineTrakingData}/>
                    }
                </ScrollView>
            }
        </MainLayout>
    )
}