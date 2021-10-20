import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";


import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import GoalScreen from "./screens/GoalScreen";
import FoodScreen from "./screens/FoodScreen";
import CommunityScreen from "./screens/CommunityScreen";
import MoreScreen from "./screens/MoreScreen";
import SplashScreen from "./screens/SplashScreen";

const LogStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const Draws = createDrawerNavigator();

// const LogScreen = () =>(
//   <LogStack.Navigator>
//     <LogStack.Screen  name= "Login" component={LoginScreen}/>
//     <LogStack.Screen  name= "SignUp" component={SignupScreen}/>
//   </LogStack.Navigator>
// );


// const TabsScreen = () =>(
//   <Tabs.Navigator>
//     <Tabs.Screen name="Home" component={HomeScreen} />
//     <Tabs.Screen name="Food" component={FoodScreen} />
//     <Tabs.Screen name="Goal" component={GoalScreen} />
//     <Tabs.Screen name="Community" component={CommunityScreen} />
//     <Tabs.Screen name="More" component={MoreScreen} />
//   </Tabs.Navigator>
// );

function App() {
  // const [isLoading, setIsLoading] = React.useState(true); //Custom Splash
  // React.useEffect(()=>{
  //   setTimeout(()=>{
  //     setIsLoading(false);
  //   },1000);
  // }

  // );
  // if(isLoading){
  //   return (<SplashScreen/>);
  // }
  const [userToken, setuserToken] = React.useState(null);
  // const authContext = React.useMemo(()=>{
  //   return {
  //     signIn:()=>{

  //     },
  //     signUp:
  //   }
  // });

  return (
    <NavigationContainer>
      {!userToken ? (
        <Tabs.Navigator>
          <Tabs.Screen name='Inicio' component={HomeScreen} />
          <Tabs.Screen name='Alimentos' component={FoodScreen} />
          <Tabs.Screen name='Metas' component={GoalScreen} />
          <Tabs.Screen name='Communidad' component={CommunityScreen} />
          <Tabs.Screen name='Más...' component={MoreScreen} />
        </Tabs.Navigator>
      ) : (
        <LogStack.Navigator>
          <LogStack.Screen name='Login' component={LoginScreen} />
          <LogStack.Screen name='SignUp' component={SignupScreen} />
        </LogStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default (App);
