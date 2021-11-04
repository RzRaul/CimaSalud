import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../utils/AuthContext';

const Login = ({navigation}) => {
    const {signIn} = React.useContext(AuthContext);
    const {email, setEmail} = React.useState(null);
    const {pass, setPass} = React.useState(null);

    return (
        <View style = {{
            flex: 1,
            backgroundColor: '#d4c9b9',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            <ImageBackground source={require('../assets/loginBackground.png')} resizeMode="cover" style={{flex: 1, width: 300, justifyContent:'flex-end', alignItems:'center'}}>
                <TextInput 
                    style = {[styles.input, {width:200}]}
                    placeholder="Enter e-mail"
                    onChangeText={setEmail}  
                />
                <TextInput 
                    style = {[styles.input, {width:200}]}
                    placeholder="Enter password"
                    onChangeText = {setPass}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress = {()=> signIn('rulas@test.com', 'pass123')}
                >
                    
                    <Text>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {()=> navigation.push('SignUp')}
                >
                    <Text>SIGN UP</Text>
                </TouchableOpacity>
            </ImageBackground>
            
        </View>
    )
}

export default Login;