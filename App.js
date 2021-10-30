import React from "react";
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
  <LogStack.Navigator>
    <LogStack.Screen  name= "Login" component={LoginScreen}/>
    <LogStack.Screen  name= "SignUp" component={SignupScreen}/>
  </LogStack.Navigator>
);


const TabsScreen = () =>(
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Food" component={FoodScreen} />
    <Tabs.Screen name="Goals" component={GoalScreen} />
    <Tabs.Screen name="Community" component={CommunityScreen} />
    <Tabs.Screen name="More" component={MoreScreen} />
  </Tabs.Navigator>
);

function App() {
  //const [isLoading, setIsLoading] = React.useState(true); //Custom Splash
  //const [userToken, setuserToken] = React.useState(null);
  const [loginState, dispatch] = React.useReducer(loginReducer,initialState);
  //const [dataState, dispatch] = React.useReducer(loginReducer,initialState);

  const globalContext = React.useMemo(()=>{
    return {
      signIn: (userMail,userPassword) => {
      let userToken;
      let user;
      if(userMail && userPassword){
       userToken = UserFuncs.login(userMail, userPassword);
       user = UserFuncs.getUserInfo(userToken);
      }
      dispatch({type: 'login', userMail,userName: user.userName, userToken});
      },
      signOut: () => {
        dispatch({type: 'logout'});
      },
      signUp: (userName, userMail, userPassword) => {
        let userToken= UserFuncs.signup(userMail,userPassword, userName);
        user = UserFuncs.getUserInfo(userToken);
        dispatch({type: 'signup', userMail: user.email, userName: user.name, token: usertoken})
      },
      getState:()=>{
        return loginState;
      }
      
    };
   }, []);
  React.useEffect(()=>{
    setTimeout(()=>{
      //setIsLoading(false);
      dispatch({type:'signup', token:null});
    },1000);
  },[]);

  if(loginState.isLoading){
    return (<SplashScreen/>);
  }
  
  return (
    <AuthContext.Provider value={globalContext}>
      <NavigationContainer>
        <RootStackScreen userToken={loginState.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default (App);
