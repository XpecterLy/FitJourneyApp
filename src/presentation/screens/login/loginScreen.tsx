import { Layout, Text, Input, Button} from "@ui-kitten/components";
import { Alert, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from 'yup';
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

    const [isPosting, setPosting] = useState(false);
    const [security, setSecurity] = useState(true);

    const PASSWORD_REGEX = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
      );

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6, 'Mínimo 6 caracteres').max(60, 'Maximo 60 caracteres').required('Campo Requerido'),
        password: Yup.string()
            .matches(
            PASSWORD_REGEX,
                "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
            )
            .required("La contraseña es requerida"),
    });

    const onLogIn = async ( value : { username: string, password: string} ) => {
        setPosting(true);
        const wasSuccessFull = await login(value.username, value.password);
        setPosting(false);
        if(wasSuccessFull) return;
        Alert.alert('Error', 'Correo o contraseña incorrectos');
    }

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => onLogIn(values) }
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

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
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                    />
                                    {errors.username && <Text style={{marginLeft: 10, color: '#ec9d9d'}}>{errors.username}</Text>}

                                    <Layout style={{height: 30}}/>

                                    <Input
                                        label='Contrseña'
                                        placeholder='Digite su contraseña'
                                        size='medium'
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        accessoryRight={
                                            <TouchableOpacity 
                                                onPress={ () => setSecurity(!security) }
                                            >
                                                <MyIcon name={security ? 'eye-off' : 'eye'} size={{ width: 25, height: 25 }}/>
                                            </TouchableOpacity >}
                                        secureTextEntry={security}
                                    />
                                    {errors.password && <Text style={{marginLeft: 10, color: '#ec9d9d'}}>{errors.password}</Text>}

                                    <Layout style={{height: 30}}/>

                                    <Button
                                        onPress={() => handleSubmit()}
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
            )}
        </Formik>

    )
}
