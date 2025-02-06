import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login/loginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}