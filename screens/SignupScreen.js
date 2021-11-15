import React, { useState } from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../utils/AuthContext';

const SignupScreen= ({navigation})=>{
	const {globalFuncs} = React.useContext(AuthContext);
    const [data, setData] = React.useState({
        name: '',
        email:'',
        pass:'',
        rePass:''
    });

    const createOneButtonAlert = (text) =>
    Alert.alert(
        text,
        { text: "OK", onPress: () => console.log("OK Pressed") }
    );

    const signUpHandler = ()=>{
        if(data.name && data.email){
            if(data.pass===data.rePass){
                globalFuncs.signUp(data.name, data.email, data.pass);

            }else{
                console.log('Contraseñas no coinciden');
                createOneButtonAlert('Contraseñas no coinciden');
            }
        }else{
            console.log('Campos inválidos');
            createOneButtonAlert('Campos inválidos');
        }
    }

    return (
        <View style = {myStyles.container}>
        <ImageBackground source={require('../assets/backgrounds/loginBkgdText.png')} resizeMode="cover" style={myStyles.bgImage}>
            <View style = {myStyles.content}>
                <TextInput 
                    style = {[styles.input, {width:250, height:35}]}
                    placeholder="Nombre"
                    onChangeText={(texto)=> setData({...data,name:texto})}  
                />
                <TextInput 
                    style = {[styles.input, {width:250, height:35}]}
                    placeholder="Correo electrónico"
                    onChangeText={(texto)=> setData({...data,email:texto})}  
                />
                <TextInput 
                    secureTextEntry = {true}
                    style = {[styles.input, {width:250, height:35}]}
                    placeholder="Contraseña"
                    onChangeText = {(texto)=> setData({...data,pass:texto})}
                />
                <TextInput 
                    secureTextEntry = {true}
                    style = {[styles.input, {width:250, height:35}]}
                    placeholder="Confirma contraseña"
                    onChangeText = {(texto)=> setData({...data,rePass:texto}) }
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress = {signUpHandler}
                >
                    <Text>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
            
        </View>
    )
};

const myStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#d4c9b9',
        justifyContent: 'center'
    },
    content:{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom:60
    },
    bgImage:{
        flex: 1, 
        justifyContent:'flex-end', 
        alignItems:'center'
    },
    
});

export default SignupScreen;