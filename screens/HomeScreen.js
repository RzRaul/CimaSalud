import React, {useContext, useEffect} from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';


import styles from '../styles/styles';

const Home = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);


    return (
        <View style = {styles.container}>
            <Text>  Esta es la pantalla de inicio </Text>
            <Button 
                title='Cambiar pantalla'
                color = '#1779ba'
                onPress = {()=> navigation.navigate('')}
            />
            
        </View>
    )
}



export default Home;