import React, {useContext, useEffect} from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';


import styles from '../styles/styles';

const Inicio = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);


    return (
        <View style = {styles.container}>
            <Text>  This is welcome Screen </Text>
            <Button 
                title='Cambiar pantalla'
                color = '#1779ba'
                onPress = {()=> navigation.navigate('Login')}
            />
            
        </View>
    )
}



export default Inicio;