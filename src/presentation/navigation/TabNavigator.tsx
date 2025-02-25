import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MyIcon } from '../components/UI/MyIcon';
import { RoutinesTraking } from '../screens/routineTraking/RoutinesTraking';

export type RootStackParams = {
  HomeScreen: undefined;
  RoutinesTraking: undefined;
};

const Tab = createBottomTabNavigator<RootStackParams>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='HomeScreen'
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarIcon: () => ( <MyIcon name={'home-outline'} color='#a9a3b3' /> ), title: '' }}/>
      <Tab.Screen name="RoutinesTraking" component={RoutinesTraking} options={{ tabBarIcon: () => ( <MyIcon name={'checkmark-circle-outline'} color='#a9a3b3' /> ), title: '' }}/>
    </Tab.Navigator>
  );
}