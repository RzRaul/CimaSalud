import React, {useContext, useEffect} from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
import {Calendar} from 'react-native-calendars';

import { AuthContext } from '../utils/AuthContext';
import styles from '../styles/styles';

const More = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);
    const {signIn} = React.useContext(AuthContext);
    
    const markedDates = {
        '2021-11-16': {selected: true, marked: true, selectedColor: 'blue'},
        '2021-11-17': {marked: true},
        '2021-11-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2021-11-19': {disabled: true, disableTouchEvent: true}
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Contactanos por",
      "664-123-4567\ncimahealth@gmail.com",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return (
        <View style = {styles.container}>
            <ScrollView>
                <Calendar 
                    onDayPress={(day) => {console.log('selected day', day)}}
                    markedDates = {markedDates}
                />
                <Button 
                    title='Contactanos'
                    color = '#1779ba'
                    onPress = {createTwoButtonAlert}
                />
            </ScrollView>
        </View>
    )
}



export default More;