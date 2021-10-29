import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../utils/AuthContext';

const Login = ({navigation}) => {
    const {signIn} = React.useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <Text>  This is LoginScreen </Text>
            <Button 
                title='Iniciar sesión'
                color = '#1779ba'
                onPress = {()=> signIn('rulas@test.com', 'pass123')}
            />
            <Button 
                title='Crear Cuenta'
                color = '#1779ba'
                onPress = {()=> navigation.push('SignUp')}
            />
        </View>
    )
}

export default Login;