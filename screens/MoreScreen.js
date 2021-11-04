import React, {useContext, useEffect, useState} from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
import {Calendar} from 'react-native-calendars';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import styles from '../styles/styles';

const More = ({navigation}) => {
    //const {state, getUserInfo} = useContext(Context);

    // Get User token and if null login again
    const {getState} = React.useContext(AuthContext);
    const token = 1;
    //const token = getState().userToken;
    if(!token){
        console.log('token is null');
        //navigation.navigate('Login')
    }
    const [foods,setFoods] = useState([{
        name:'pizza',
        grasas:25,
        proteinas:20,
        cals:100,
        carbs:30
    },{
        name:'hamburguesa',
        grasas:30,
        proteinas:25,
        cals:150,
        carbs:50
    }]);
    try {
        //setFoods(DayFuncs.getDayByDate(token,Date()));
    } catch (error) {
        console.log("Error at line 21: 'setFoods(DayFuncs.getDayByDate(token,Date()));'");
        setFoods();
    }
    

    //Cuando se tenga funcion para recibir los dias con datos cambiar esto
    const markedDates = {
        '2021-11-16': {marked: true},
        '2021-11-17': {marked: true},
        '2021-11-18': {marked: true},
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

    const ListItem = ({food}) => {
        return (
            <View style={{paddingTop: 15, backgroundColor: '#F3F3F3'}}>
                <View style={{padding: 15, backgroundColor: '#9DD5D4'}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {styles.textBody}>{food.name}</Text>
                    </View>
                    <View style = {{padding: 10, flexDirection: 'column', justifyContent: 'space-around'}}>
                        <Text style = {styles.textBody}>Calorias {food.cals}</Text>
                        <Text style = {styles.textBody}>Grasas {food.grasas}</Text>
                        <Text style = {styles.textBody}>Proteinas {food.proteinas}</Text>
                        <Text style = {styles.textBody}>Carbohidratos {food.carbs}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style = {styles.container}>
            <ScrollView style = {{margin: 5, paddingTop:10}}>
                <Calendar 
                    onDayPress={(date) => {
                        console.log('selected day', date);
                        //const {dateString,day,month,year} = date;
                        //DayFuncs.getDayByDate(token,dateString,day,month,year)
                        delete date.timestamp;
                        setFoods(DayFuncs.getDayByDate(token,date));
                    }}
                    markedDates = {markedDates}
                />
                <View>
                    {foods.map((food,i) => (<ListItem food={food} key={i}/>))}
                </View>
                <View style = {{margin: 5, paddingTop:10}}>
                    <Button 
                        title='Contactanos'
                        color = '#1779ba'
                        onPress = {createTwoButtonAlert}
                    />
                </View>
            </ScrollView>
        </View>
    )
}



export default More;