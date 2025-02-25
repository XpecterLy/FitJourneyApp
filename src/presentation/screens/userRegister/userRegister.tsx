import { Input, Layout } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { ScrollView, Image, TouchableOpacity } from "react-native"
import { MyIcon } from "../../components/UI/MyIcon"
import { useState } from "react"
import { UserType } from "../../../domain/entities/user.type"
import { MyButton } from "../../components/UI/MyButton"
import { msUser } from "../../../api/msUser"
import { MyAlert } from "../../components/UI/MyAlert"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigation"

export const UserRegister = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [security, setSecurity] = useState(true);
    const [ user, setUser ] = useState<UserType>({
        username: '',
        email: '',
        password: ''
    });

    const registerUser = async () => {
        try {
            const res = await msUser.registerUser(user);
            if(res) MyAlert({ title: "Exito", subTitle: "Usuario registrado.", onSelectOk: () => navigation.navigate('LoginScreen') });
        } catch (error) {
            MyAlert({ title: "Error", subTitle: "El usuario no fue registrado.", onSelectOk: () => {} });            
        }
    }

    return (
        <MainLayout title="Registrar" subTitle="">
            <ScrollView style={{marginHorizontal: 40}}>
                <Layout style={{flex: 1}}>
                    <Image  
                        source={require('../../../assets/logInImage.png')}
                        style={{width: '100%', height: 200}}
                    />
                    <Layout style={{flex: 1,  width: '100%', alignItems: 'center', top: 70}}> 
                        <Input 
                            placeholder="Nombre de usuario" 
                            label="Usuario" 
                            value={user.username}
                            onChangeText={ item => setUser({...user, username: item}) }
                        />

                        <Layout style={{height: 30}}/>

                        <Input 
                            placeholder="Direccion de correo"
                            value={user.email} 
                            label="Correo" 
                            autoCapitalize="none" 
                            keyboardType="email-address" 
                            autoCorrect={false}
                            onChangeText={ item => setUser({...user, email: item}) }
                        />
                        
                        <Layout style={{height: 30}}/>

                        <Input
                            label='Contrseña'
                            placeholder='Digite su contraseña'
                            size='medium'
                            value={user.password}
                            onChangeText={(item) => setUser({...user, password: item})}
                            accessoryRight={
                                <TouchableOpacity 
                                    onPress={ () => setSecurity(!security) }
                                >
                                    <MyIcon name={security ? 'eye-off' : 'eye'} size={{ width: 25, height: 25 }}/>
                                </TouchableOpacity >}
                            secureTextEntry={security}
                        />
                        
                        <Layout style={{height: 50}}/>

                        <MyButton text="Registrar" size="small" onSelect={ registerUser } />

                    </Layout>
                </Layout>
            </ScrollView>
        </MainLayout>
    )
}