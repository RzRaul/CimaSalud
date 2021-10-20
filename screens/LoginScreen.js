import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../styles/styles';

const Login = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text>  This is LoginScreen </Text>
            <Button 
                title='Crear Cuenta'
                color = '#1779ba'
                onPress = {()=> navigation.push('SignUp')}
            />
        </View>
    )
}

export default Login;