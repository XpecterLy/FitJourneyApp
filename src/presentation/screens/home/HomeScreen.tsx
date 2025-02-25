
import { ScrollView } from "react-native-gesture-handler"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { Layout, Text } from "@ui-kitten/components"

import { MainLayout } from "../../layouts/MainLayout"
import { MyDivider } from "../../components/UI/MyDivider"
import { useAuthStore } from "../../hooks/useLogin"
import { msRoutine } from "../../../api/msRoutine"
import { SeriesContentCards } from "../../components/series/seriesContentCards"
import { msRoutineTraking } from "../../../api/msRoutineTraking"
import { RoutineType } from "../../../domain/entities/routines.type"
import { MyCard } from "../../components/UI/MyCards"
import { MyButton } from "../../components/UI/MyButton"
import { SubTitle } from "../../components/UI/SubTitle"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigation"

export const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { user, logout } = useAuthStore();
    const [ routineTrakingData, setRoutineTrakingData ] = useState<RoutineType>();

    const { data: routines } = useQuery({
        queryKey: ['routines'],
        staleTime: 1000 * 60 * 60, // 1 hour
        queryFn: () => msRoutine.getAllRoutines(),
    });

    const { data: routineTrackings } = useQuery({
        queryKey: ['routinesTraking', `${user?.id}`],
        staleTime: 1000 * 60 * 60, // 1 hour
        queryFn: () => msRoutineTraking.getAllRoutinesTraking(undefined, undefined, undefined, 'active'),
    });

    useEffect( () => {
        if(routineTrackings){
            if(routineTrackings.length > 0){
                const getRoutine = async () => {
                    setRoutineTrakingData( await msRoutine.getRoutineById(routineTrackings[0].routineId) );
                } 
                getRoutine();
            }   
        } 
    }, [routineTrackings] );

    return(
        <MainLayout title="Inicio" subTitle="" rightActionIcon="log-out-outline" rightAction={logout}>
            <ScrollView 
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
            >
                { routines  &&
                    <>
                        {/* <HeaderProfile user={user!}/> */}
                        {/* <MyDivider /> */}

                        {/* Continue routine */}
                        { routineTrackings &&
                            <>
                            <Layout style={{alignItems: 'center', marginVertical: 5}}>
                                <SubTitle text="Rutina Iniciada" />
                            </Layout>
                                <MyCard>
                                    <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text category='h2' style={{color: '#bbb5c6'}}>{routineTrakingData && routineTrakingData.name}</Text>
                                        <Text category='h5' style={{color: '#bbb5c6'}}>{`Ejercicios: ${routineTrakingData && routineTrakingData.exercises.length}`}</Text>
                                        <Layout style={{height: 15}}/>
                                        <MyButton text="Continuar" size="small" onSelect={ () => navigation.navigate('RoutineTraking', {id: routineTrackings[0].id }) }/>
                                    </Layout>
                                </MyCard>
                                <MyDivider/>
                            </>
                        }

                        {/* Init new routine */}
                        <SeriesContentCards data={routines}/>
                    </>
                }
                <Layout style={{height: 150}}/>
            </ScrollView>
        </MainLayout>
    )
}