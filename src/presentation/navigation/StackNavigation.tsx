import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login/loginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { RoutineTraking } from '../screens/routineTraking/RoutineTraking';
import { ExerciseTraking } from '../screens/exerciseTraking/ExerciseTraking';
import { UserRegister } from '../screens/userRegister/userRegister';
import { TabNavigator } from './TabNavigator';

export type RootStackParams = {
  LoginScreen: undefined;
  TabNavigator: undefined;
  RoutineTraking: { id: string };
  ExerciseTraking: { id: string };
  UserRegister: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="RoutineTraking" component={RoutineTraking} />
      <Stack.Screen name="ExerciseTraking" component={ExerciseTraking} />
      <Stack.Screen name="UserRegister" component={UserRegister} />
    </Stack.Navigator>
  );
}