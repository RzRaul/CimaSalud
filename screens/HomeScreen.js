import React, { useEffect} from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../utils/AuthContext';


import styles from '../styles/styles';

const Home = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);
    const {signOut} = React.useContext(AuthContext);

    return (
        <View style = {styles.container}>
            <Text>  Esta es la pantalla de inicio </Text>
            <Button 
                title='Cerrar sesión'
                color = '#1779ba'
                onPress = {()=> signOut()}
            />
            
        </View>
    )
}



export default Home;