import { StackScreenProps } from "@react-navigation/stack";
import { MainLayout } from "../../layouts/MainLayout";
import { RootStackParams } from "../../navigation/StackNavigation";
import { MyCard } from "../../components/UI/MyCards";
import { Layout, Text } from "@ui-kitten/components";
import { FullScreenLoader } from "../../components/UI/FullScreenLoader";
import { HeaderExerciseProfile } from "../../components/exercises/HeaderExerciseProfile";
import { MyButton } from "../../components/UI/MyButton";
import { useExerciseTraking } from "../../hooks/useExerciseTraking";

interface Props extends StackScreenProps<RootStackParams, 'ExerciseTraking'>{}

export const ExerciseTraking = ({route}: Props) => {
    const exerciseTrakingId = route.params.id;

    const { 
        serie,
        isLoading,
        exerciseData,
        exerciseTrakingData,
        changeRepetitions,
        changeWeight,
        addRoutine
    } = useExerciseTraking({exerciseTrakingId});

    return (
        <MainLayout title="Ejercicio" subTitle="Seguimiento de ejercicio">
            {   isLoading
                ? <FullScreenLoader/> 
                : exerciseTrakingData && 
                    <Layout style={{margin: 20}}>

                        <HeaderExerciseProfile exercise={exerciseData}/>

                        <Layout style={{ height: 15 }}/>

                        <MyCard
                            isDisable
                        >
                            <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Repeticiones</Text>
                            </Layout>
                            
                            <Layout style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={{ marginHorizontal: 10, fontSize: 35, color: '#6C63FF' }} category="h1" onPress={() => changeRepetitions(-1)} >-</Text>
                                <Text style={{ marginHorizontal: 10, fontSize: 60, color: '#6C63FF' }}>{serie.repetitions}</Text>
                                <Text style={{ marginHorizontal: 10, fontSize: 35, color: '#6C63FF' }} category="h1" onPress={() => changeRepetitions(1)} >+</Text>
                            </Layout>
                        </MyCard>

                        <Layout style={{ height: 30 }}/>

                        <MyCard
                            isDisable
                        >
                            <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Peso</Text>
                            </Layout>
                            
                            <Layout style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={{ marginHorizontal: 10, fontSize: 35, color: '#6C63FF' }} category="h1" onPress={() => changeWeight(-1)} >-</Text>
                                <Text style={{ marginLeft: 10, fontSize: 60, color: '#6C63FF' }}>{serie.weight}</Text><Text  style={{ marginRight: 10, fontSize: 20, color: '#6C63FF' }}>Kg</Text>
                                <Text style={{ marginHorizontal: 10, fontSize: 35, color: '#6C63FF' }} category="h1" onPress={() => changeWeight(1)} >+</Text>
                            </Layout>
                        </MyCard>

                        <Layout style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                            <MyButton size='small' text="Agregar" onSelect={addRoutine}/>
                        </Layout>
                    </Layout>
            }
        </MainLayout>
    )
}

