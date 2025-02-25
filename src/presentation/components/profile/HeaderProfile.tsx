import { Layout, Text } from "@ui-kitten/components"
import { StyleSheet } from "react-native"
import { MyIcon } from "../UI/MyIcon";
import { SubTitle } from "../UI/SubTitle";
import { UserEntity } from "../../../domain/entities/user.entity";

interface Props {
    user: UserEntity;
}

export const HeaderProfile = ({user}: Props) => {
    
    return (
        <>
            <Layout style={{alignItems: 'center', margin: 10}}>
                <SubTitle text="Perfil" />

                <Layout style={{width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 20}}>  
                    <Layout style={{width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                        <Layout style={styles.imageContainer}>

                        </Layout>
                    </Layout>
                    <Layout>
                        <Text style={{fontSize: 20}} category='label'>{ user.username ? user.username : '' }</Text>
                        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MyIcon name="alert-circle-outline" color="#23c02f" size={{ width: 15, height: 15 }} />
                            <Text style={{ marginLeft: 4 }}>Ultima rutina: 10/01/2025</Text>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 60, 
        height: 60, 
        backgroundColor: '#d1d1d2',
        borderRadius: 10,
        borderColor: '#6C63FF',
        borderWidth: 1
    }
});