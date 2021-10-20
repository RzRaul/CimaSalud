import React from "react";
import {View, StyleSheet, Text, Button} from 'react-native';
import styles from '../styles/styles';

const SignupScreen= ({navigation})=>{
	return (
		<View style = {styles.container}>
            <Text>  This is SignUp </Text>
            <Button 
                title='Crear Cuenta'
                color = '#1779ba'
                onPress = {()=> navigation.pop()}
            />
        </View>
	
	);
};

export default SignupScreen;