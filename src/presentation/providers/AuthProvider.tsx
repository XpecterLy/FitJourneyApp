import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from '../navigation/StackNavigation';
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuthStore } from "../hooks/useLogin";
import React, { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({children}: PropsWithChildren) => {
    
const navigate = useNavigation<StackNavigationProp<RootStackParams>>();

const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
        if(status != 'checking' ){
            if(status === 'authenticated'){
                navigate.reset({
                    index: 0,
                    routes: [{name: "HomeScreen"}]
                })
            }
        }else {
            navigate.reset({
                index: 0,
                routes: [{name: "LoginScreen"}]
            })
        }
    }, [status]);

    return (
        <>{children}</>
    )
}