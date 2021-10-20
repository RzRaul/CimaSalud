import React from "react";
import {View, StyleSheet, Text, Button} from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../utils/AuthContext';

const SignupScreen= ({navigation})=>{
	const {signIn} = React.useContext(AuthContext);
	return (
		<View style = {styles.container}>
            <Text>  This is SignUp </Text>
            <Button 
                title='Crear Cuenta'
                color = '#1779ba'
                onPress = {()=> signIn('asd', 'asd')}
            />
        </View>
	
	);
};

export default SignupScreen;