import React, {useContext, useEffect, useState} from 'react';
import { Alert, Modal, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import   { Calendar } from 'react-native-calendars';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as Dates from '../utils/Dates';
import styles, { colors } from '../styles/styles';
import {
    useFonts,
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_300Light_Italic,
} from '@expo-google-fonts/roboto';

const More = ({navigation}) => {
    const {loginState} = React.useContext(AuthContext);
    const token = loginState.userToken;

    let [fontsLoaded] = useFonts({
        light: Roboto_300Light,
        regular: Roboto_500Medium,
        bold: Roboto_700Bold,
    });
    const [showing, setShow] = React.useState({
        showBreakFast: false,
        showLunch: false,
        showDinner: false,
        showSnacks: false,
    });
    const [modalVisible, setModalVisible] = useState(false);
    

    const updateDay = async (date) => {
        let dayTemp = await DayFuncs.getDayByDate(token, date);
        console.log('date = '+date+' updateDay = '+dayTemp);
        setDay(dayTemp);
    }
    
    const getMarkedDates = async () => {
        let days = await DayFuncs.getMyDays(token);
        let dates = {};


        if(days)
            days.forEach((day) => {dates[day.fecha.replace("T00:00:00.000Z", "")] = {marked:true} });
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

    const viewItems = (title) => {
        switch (title) {
            case 'Desayuno':
                setShow({
                    ...showing,
                    showBreakFast: !showing.showBreakFast,
                });
                break;
            case 'Almuerzo':
                setShow({ ...showing, showLunch: !showing.showLunch });
                break;
            case 'Cena':
                setShow({ ...showing, showDinner: !showing.showDinner });
                break;
            case 'Snacks':
                setShow({ ...showing, showSnacks: !showing.showSnacks });
                break;
            default:
                break;
        }
    };

    const ListItem = ({ food }) => {
        if (fontsLoaded)
            return (
                <View style={styles.ListCard}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontFamily: 'light', fontSize: 18 }}>
                            {food.name}
                        </Text>
                    </View>
                    <View style={styles.fourCard}>
                        <Text style={styles.textBody}>
                            Calorias: {food.cals}
                        </Text>
                        <Text style={styles.textBody}>
                            Proteinas: {food.proteinas}
                        </Text>
                        <Text style={styles.textBody}>Carbs: {food.carbs}</Text>
                        <Text style={styles.textBody}>
                            Grasas: {food.grasas}
                        </Text>
                    </View>
                </View>
            );
        else return null;
    };

    const TitleWithBody = ({ obj }) => {
        if (fontsLoaded)
            return (
                <TouchableOpacity
                    onPress={() => viewItems(obj.title)}
                    activeOpacity={0.9}
                >
                    <View
                        style={[
                            styles.containerBody,
                            { backgroundColor: colors.neutro },
                        ]}
                        marginTop={20}
                        padding={8}
                    >
                        <Text
                            style={{
                                fontFamily: 'regular',
                                fontSize: 22,
                                marginVertical: 13,
                                flex: 1,
                            }}
                        >
                            {obj.title}
                        </Text>

                        {obj.body.length != 0 ? (
                            obj.body.map(
                                (food, i) =>
                                    obj.show && <ListItem food={food} key={i} />
                            )
                        ) : (
                            <Text>No Hay Datos</Text>
                        )}
                    </View>
                </TouchableOpacity>
            );
        else return null;
    };

    const DayFoods = (day) => {
        return (
            <View style={(styles.container, { marginBottom:15 })}>
                <TitleWithBody
                    obj={{
                        title: 'Desayuno',
                        body: day ? day.desayuno : [],
                        show: showing.showBreakFast,
                    }}
                />
                <TitleWithBody
                    obj={{
                        title: 'Almuerzo',
                        body: day ? day.almuerzo : [],
                        show: showing.showLunch,
                    }}
                />
                <TitleWithBody
                    obj={{
                        title: 'Cena',
                        body: day ? day.cena : [],
                        show: showing.showDinner,
                    }}
                />
                <TitleWithBody
                    obj={{
                        title: 'Snacks',
                        body: day ? day.snacks : [],
                        show: showing.showSnacks,
                    }}
                />
            </View>
        );
    };

    const WeeklyReport = () => {
        return ( 
            <View>
                { week.map( day => <DayFoods day={day} /> ) }
            </View> );
    }



    return (
        <View style={styles.mainContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                <View>
                    <WeeklyReport />
                </View>
            </ Modal>
            <ScrollView style = {{margin: 5, paddingTop:10}}>
                <Calendar 
                    onDayPress={ async (date) => {
                        updateDay(date.dateString);
                    }}
                    markedDates = {markedDates}
                />
                <DayFoods day={day}/>

                <View style={{ flex: 1, justifyContent:'space-evenly', alignItems:'center', marginBottom:10 }}>
                    <TouchableOpacity
                        style = {styles.buttonBody}
                        onPress = { async () => {
                            //let week = await DayFuncs.getInfoByRange(token, day, '-7'); // fix when there the func exists
                            setModalVisible(true);
                        }}
                    >
                        <Text style = {{color:'#ffffff'}}>Reporte Semanal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.buttonBody}
                        onPress = {createTwoButtonAlert}
                    >
                        <Text style = {{color:'#ffffff'}}>Contactanos</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default More;