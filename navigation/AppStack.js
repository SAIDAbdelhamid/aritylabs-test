
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from '../screens/MainScreen'

const Stack = createStackNavigator();

export default function AppStack() {

  //SCREEN
  return (
      <Stack.Navigator initialRouteName={"MainScreen"} screenOptions={{ title: "Aritylabs Test" }}>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
        />
      </Stack.Navigator>
  );
}