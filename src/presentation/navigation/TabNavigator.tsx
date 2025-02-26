import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MyIcon } from '../components/UI/MyIcon';
import { RoutinesTrakingScreen } from '../screens/routineTraking/RoutinesTraking';
import { DashBoardScreen } from '../screens/dashBoard/DashBoard';

export type RootStackParams = {
  HomeScreen: undefined;
  RoutinesTrakingScreen: undefined;
  DashBoardScreen: undefined;
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
      <Tab.Screen name="RoutinesTrakingScreen" component={RoutinesTrakingScreen} options={{ tabBarIcon: () => ( <MyIcon name={'checkmark-circle-outline'} color='#a9a3b3' /> ), title: '' }}/>
      <Tab.Screen name="DashBoardScreen" component={DashBoardScreen} options={{ tabBarIcon: () => ( <MyIcon name={'activity-outline'} color='#a9a3b3' /> ), title: '' }}/>
    </Tab.Navigator>
  );
}