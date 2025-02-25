import { Layout, Text, Input, Button} from "@ui-kitten/components";
import { Alert, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { MyIcon } from "../../components/UI/MyIcon";
import { useAuthStore } from "../../hooks/useLogin";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigation";


export const LoginScreen = () => {
    const { top } = useSafeAreaInsets();
    const { login } = useAuthStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [username, setUsername] = useState('user_root');
    const [password, setPassword] = useState('@Root123');
    const [isPosting, setPosting] = useState(false);
    const [security, setSecurity] = useState(true);

    const onLogIn = async () => {
        setPosting(true);
        const wasSuccessFull = await login(username, password);
        setPosting(false);
        if(wasSuccessFull) return;
        Alert.alert('Error', 'Correo o contraseña incorrectos');
    }

    return (
        <Layout style={{flex: 1, top: top}}>
            <ScrollView style={{marginHorizontal: 40}}>
            <Layout style={{flex: 1, top: 15}}>
                <Image  
                    source={require('../../../assets/logInImage.png')}
                    style={{width: '100%', height: 200}}
                />

                <Layout style={{flex: 1,  width: '100%', alignItems: 'center', top: 70}}> 
                    <Text category='h3'>Bienvenido</Text>

                    {/* Form */}

                    <Layout style={{margin: 30, top: 10}}>
                        <Input 
                            label='Correo'
                            style={{width: '100%'}}
                            placeholder='Digite su correo'
                            size='medium'
                            value={username}
                            onChangeText={(item) => setUsername(item)}
                        />

                        <Layout style={{height: 30}}/>

                        <Input
                            label='Contrseña'
                            placeholder='Digite su contraseña'
                            size='medium'
                            value={password}
                            onChangeText={(item) => setPassword(item)}
                            accessoryRight={
                                <TouchableOpacity 
                                    onPress={ () => setSecurity(!security) }
                                >
                                    <MyIcon name={security ? 'eye-off' : 'eye'} size={{ width: 25, height: 25 }}/>
                                </TouchableOpacity >}
                            secureTextEntry={security}
                        />

                        <Layout style={{height: 30}}/>

                        <Button
                            onPress={onLogIn}
                            disabled={isPosting}
                        >
                            <Text>Iniciar</Text>
                        </Button>

                        <Button
                            appearance='ghost'
                            onPress={ () => navigation.navigate('UserRegister') }
                            disabled={isPosting}
                        >
                            <Text>Registrase</Text>
                        </Button>
                    </Layout>

                    <Layout style={{height: 10}}/>

                    {/* Otros */}

                    <Text appearance='hint'>¿Olvidaste la contraseña?</Text>

                    <Layout style={{height: 30}}/>

                    <Layout style={{ flexDirection: 'row' }}>
                        <MyIcon name="facebook-outline"/>
                        <MyIcon name="google-outline"/>
                    </Layout>
                </Layout>


                </Layout>
            </ScrollView>
        </Layout>
    )
}
