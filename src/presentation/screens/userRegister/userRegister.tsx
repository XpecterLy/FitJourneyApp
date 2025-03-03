import { Input, Layout, Text } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { ScrollView, Image, TouchableOpacity } from "react-native"
import { Formik } from "formik"
import * as Yup from 'yup';
import { MyIcon } from "../../components/UI/MyIcon"
import { useState } from "react"
import { MyButton } from "../../components/UI/MyButton"
import { msUser } from "../../../api/msUser"
import { MyAlert } from "../../components/UI/MyAlert"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigation"

export const UserRegister = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [security, setSecurity] = useState(true);

        const PASSWORD_REGEX = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
          );
    
        const validationSchema = Yup.object().shape({
            username: Yup.string().min(6, 'Mínimo 6 caracteres').max(60, 'Maximo 60 caracteres').required('Campo Requerido'),
            email: Yup.string().email('El correo no es valido').required('Requerido'),
            password: Yup.string()
                .matches(
                PASSWORD_REGEX,
                    "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
                )
                .required("La contraseña es requerida"),
        });

    const registerUser = async (
        values: {
            username: string;
            email: string;
            password: string;
    }) => {
        try {
            const res = await msUser.registerUser( values );
            if(res) MyAlert({ title: "Exito", subTitle: "Usuario registrado.", onSelectOk: () => navigation.navigate('LoginScreen') });
        } catch (error) {
            MyAlert({ title: "Error", subTitle: "El usuario no fue registrado.", onSelectOk: () => {} });            
        }
    }

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values) }
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

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
                                    value={values.username}
                                    onChangeText={ handleChange('username') }
                                />
                                {errors.username && <Text style={{marginLeft: 10, color: '#ec9d9d'}}>{errors.username}</Text>}

                                <Layout style={{height: 30}}/>

                                <Input 
                                    placeholder="Direccion de correo"
                                    value={values.email} 
                                    label="Correo" 
                                    autoCapitalize="none" 
                                    keyboardType="email-address" 
                                    autoCorrect={false}
                                    onChangeText={ handleChange('email') }
                                />
                                {errors.email && <Text style={{marginLeft: 10, color: '#ec9d9d'}}>{errors.email}</Text>}
                                
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
                                
                                <Layout style={{height: 50}}/>

                                <MyButton text="Registrar" size="small" onSelect={ handleSubmit } />
                            </Layout>
                        </Layout>
                    </ScrollView>
                </MainLayout>
            )}
        </Formik>
    )
}