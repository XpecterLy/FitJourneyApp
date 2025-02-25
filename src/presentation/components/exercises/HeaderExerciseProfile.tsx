import { Layout, Text } from "@ui-kitten/components"
import { StyleSheet, Image } from "react-native"
import { SubTitle } from "../UI/SubTitle";
import { ExerciseType } from "../../../domain/entities/exercise.type";

interface Props {
    exercise: ExerciseType;
}

export const HeaderExerciseProfile = ({exercise}: Props) => {
    
    return (
        <>
            <Layout style={{alignItems: 'center', margin: 20}}>
                <SubTitle text="Ejercicio"/>

                <Layout style={{width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 20}}>  
                    <Layout style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Layout style={styles.imageContainer}>
                            <Image style={{ width: '100%', height: '100%',  borderRadius: 10 }} source={{uri: exercise.imageUrl}}/>  
                        </Layout>
                    </Layout>
                    <Layout style={{alignItems: 'center', justifyContent: 'center', marginLeft: 10}} >
                        <Text>{ exercise.name ?? '' }</Text>
                        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Text numberOfLines={4} style={{ marginLeft: 4 }}>{exercise.details}</Text> */}
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 100, 
        height: 100, 
        backgroundColor: '#d1d1d2',
        borderRadius: 10,
        borderColor: '#6C63FF',
        borderWidth: 1
    }
});