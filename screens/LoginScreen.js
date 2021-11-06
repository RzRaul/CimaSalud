import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../utils/AuthContext';

const Login = ({navigation}) => {
    const {globalFuncs} = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');

    return (
        <View style = {myStyles.container}>
            <ImageBackground source={require('../assets/backgrounds/loginBkgdText.png')} resizeMode="cover" style={myStyles.bgImage}>
                <View style = {myStyles.content}>
                <TextInput 
                    style = {[styles.input, {width:200, height:40}]}
                    placeholder="Correo electrónico"
                    onChangeText={setEmail}
                    value = {email}  
                />
                <TextInput 
                    secureTextEntry = {true}
                    style = {[styles.input, {width:200,height:40, marginBottom:30}]}
                    placeholder="Contraseña"
                    onChangeText = {setPass}
                    value = {pass} 
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress = {()=> globalFuncs.signIn(email, pass)}
                >
                    
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {()=> navigation.push('SignUp')}
                >
                    <Text>Crear cuenta</Text>
                </TouchableOpacity>

                </View>
                
            </ImageBackground>
            
        </View>
    )
}

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
        paddingBottom:50
    },
    bgImage:{
        flex: 1, 
        justifyContent:'flex-end', 
        alignItems:'center'
    },
    
});

export default Login;