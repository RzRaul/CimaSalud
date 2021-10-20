import React, {useContext, useEffect} from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';


import styles from '../styles/styles';

const Food = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);


    return (
        <View style = {styles.container}>
            <Text>  Cargando... </Text>
        </View>
    )
}



export default Food;