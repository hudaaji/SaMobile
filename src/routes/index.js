import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login, Maps, Splash } from '../screen'

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  );
};
export default Routers;