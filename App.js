import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioScreen from "./screens/Inicio";
import LoginScreen from "./screens/Login";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
