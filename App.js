import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {AuthContext} from "./utils/AuthContext";
import { loginReducer, initialState } from "./utils/authReducer";


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

  const authContext = React.useMemo(()=>{
    return {
      signIn: (eMail,userPassword) => {
      //  setuserToken('asd');
      //  setIsLoading(false);
      let userToken;
      if(eMail && userPassword){
        userToken = 'asd';
      }
      dispatch({type: 'login', userMail: eMail, token: userToken});
      },
      signOut: () => {
      //  setuserToken(null);
      //  setIsLoading(false);
      dispatch({type: 'logout'});
      },
      signUp: () => {
      //  setuserToken('asd');
      //  setIsLoading(false);
      },
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
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={loginState.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default (App);
