import React, {useContext, useEffect, useState} from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
import {Calendar} from 'react-native-calendars';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as Dates from '../utils/Dates';
import styles from '../styles/styles';

const More = ({navigation}) => {
    const {loginState} = React.useContext(AuthContext);
    const token = loginState.userToken;
    
    

    const updateDay = async (date) => {
        let dayTemp = await DayFuncs.getDayByDate(token, date);
        console.log('updateDay = ',dayTemp);
        setDay(dayTemp);
    }
    
    const getMarkedDates = async () => {
        let days = await DayFuncs.getMyDays(token);
        let dates = {};

        days.forEach((day) => {dates[day.fecha.replace("T00:00:00.000Z", "")] = {marked:true} });
        setMarkedDates(dates);
    }

    const [day, setDay] = useState(null);
    const [markedDates,setMarkedDates] = useState(null);

    React.useEffect(()=>{
        console.log('running React.useEffect');
        updateDay(Dates.getToday());
        getMarkedDates();
    },[]);

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

    // Check if both are passing corretly
    const TitleWithBody = ({obj}) => {
        return (
            <View style={[styles.containerBody,{backgroundColor: '#d4c9b9'}]} margin={5} padding={10}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>{ obj.title }</Text>
                { obj.body !== undefined || obj.body.length != 0 ? 
                    obj.body.map( (food,i) => (<ListItem food={food} key={i}/>) ):
                    <Text>No Hay Datos</Text>
                }
            </View>
        );
    }

    const DayFoods = () => {
        let desayuno = day? day.desayuno : [];
        let almuerzo = day? day.desayuno : [];
        let cena = day? day.desayuno : [];
        let snacks = day? day.desayuno : [];
        return (
            <View>
                <TitleWithBody obj={{title:'Desayuno', body:desayuno}} />
                <TitleWithBody obj={{title:'Almuerzo', body:almuerzo}} />
                <TitleWithBody obj={{title:'Cena', body:cena}} />
                <TitleWithBody obj={{title:'Snacks', body:snacks}} />
            </View>
        );
    }

    return (
        <View style = {{flex:1}}>
            <ScrollView style = {{margin: 5, paddingTop:10}}>
                <Calendar 
                    onDayPress={ async (date) => {
                        updateDay(date.dateString);
                    }}
                    markedDates = {markedDates}
                />
                <DayFoods />
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