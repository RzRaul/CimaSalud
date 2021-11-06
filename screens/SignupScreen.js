import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../utils/AuthContext';

const SignupScreen= ({navigation})=>{
	const {signIn} = React.useContext(AuthContext);
    const {name, setName} = React.useState(null);
	const {email, setEmail} = React.useState(null);
    const {pass, setPass} = React.useState(null);
    const {rePass, setRePass} = React.useState(null);

    return (
        <View style = {{
            flex: 1,
            backgroundColor: '#d4c9b9',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            <ImageBackground source={require('../assets/backgrounds/loginBkgdText.png')} resizeMode="cover" style={{flex: 1, width: 300, justifyContent:'flex-end', alignItems:'center', overlayColor: 'white'}}>
                <TextInput 
                    style = {[styles.input, {width:200}]}
                    placeholder="Enter name"
                    onChangeText={setName}  
                />
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
                <TextInput 
                    style = {[styles.input, {width:200}]}
                    placeholder="Confirm password"
                    onChangeText = {setRePass}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress = {()=> signIn('asd', 'asd')}
                >
                    <Text>SIGN UP</Text>
                </TouchableOpacity>
            </ImageBackground>
            
        </View>
    )
};

export default SignupScreen;