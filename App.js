import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {AuthContext} from "./utils/AuthContext";
import { loginReducer, initialState } from "./utils/authReducer";
import * as UserFuncs from "./services/userFetchs"


import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import GoalScreen from "./screens/GoalScreen";
import FoodScreen from "./screens/FoodScreen";
import CommunityScreen from "./screens/CommunityScreen";
import MoreScreen from "./screens/MoreScreen";
import SplashScreen from "./screens/SplashScreen";

const RootStack = createNativeStackNavigator();
const LogStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const RootStackScreen = ({userToken})=>(
    <RootStack.Navigator screenOptions={{headerShown:false}}>
      {!userToken?(
        <RootStack.Screen name="Auth" component={LogScreen}/>
      ):(
        <RootStack.Screen name="App" component={TabsScreen}/>
      )}
    </RootStack.Navigator>
);
const LogScreen = () =>(
  <LogStack.Navigator screenOptions={{headerShown:false}}>
    <LogStack.Screen  name= "Login" component={LoginScreen} />
    <LogStack.Screen  name= "SignUp" component={SignupScreen}/>
  </LogStack.Navigator>
);


const TabsScreen = () =>(
  <Tabs.Navigator
    screenOptions={{headerShown:false}, ({ route}) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return (
            <Ionicons
              name={
                focused
                  ? 'home'
                  : 'home-outline'
              }
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'Food') {
          return (
            <Ionicons
              name={focused ? 'nutrition' : 'nutrition-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'Goals') {
          return (
            <Ionicons
              name={focused ? 'golf' : 'golf-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'Community') {
          return (
            <Ionicons
              name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'More') {
          return (
            <Ionicons
              name={focused ? 'apps' : 'apps-outline'}
              size={size}
              color={color}
            />
          );
        }
      },
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: 'black',
    })}
  >
   <Tabs.Group
    screenOptions={{headerShown:false}}
  >
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Food" component={FoodScreen} />
    <Tabs.Screen name="Goals" component={GoalScreen} />
    <Tabs.Screen name="Community" component={CommunityScreen} />
    <Tabs.Screen name="More" component={MoreScreen} />
  </Tabs.Group>
  </Tabs.Navigator>
);

function App() {
  const [loginState, dispatch] = React.useReducer(loginReducer,initialState);
  
  const globalFuncs = React.useMemo(()=>({
      signIn: async (userMail,userPassword) => {
        let userToken;
        let user;
        if(userMail && userPassword){
            userToken =  await UserFuncs.login(userMail, userPassword);
            user =  await UserFuncs.getUserInfo(userToken);
            dispatch({type: 'login', userMail:user.email,userName: user.name, userToken, metas:user.meta});
        }
      
      },
      signOut: async () => {
        dispatch({type: 'logout'});
      },
      signUp: async (userName, userMail, userPassword, metas) => {
        let userToken;
        let user;
        userToken= await UserFuncs.signup(userMail,userPassword, userName, metas);
        user = await UserFuncs.getUserInfo(userToken);
        dispatch({type: 'signup', userMail, userName, userToken, metas});
      },
      updateGoals: async (usertoken, metas) => {
        let goals = await UserFuncs.updateUserGoals(usertoken, metas);
        dispatch({type: 'updateMetas', metas:goals});
      },
      getState:()=>{
        return loginState;
      }
   }), []);
  React.useEffect(()=>{
    setTimeout(()=>{
      //setIsLoading(false);
      dispatch({type:'signup', token:null});
    },1000);
  },[]);

  const authContext = {loginState, globalFuncs};

  if(loginState.isLoading){
    return (<SplashScreen/>);
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={loginState.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default (App);
