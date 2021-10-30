import React, { useEffect} from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../utils/AuthContext';


import styles from '../styles/styles';

const Home = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);
    const {signOut, getState} = React.useContext(AuthContext);
    const state = getState();
    return (
        <View style = {styles.container}>
            <Text>  Bienvenido {state.userName}! </Text>
            <Button 
                title='Cerrar sesión'
                color = '#1779ba'
                onPress = {()=> signOut()}
            />
        </View>
    )
}



export default Home;