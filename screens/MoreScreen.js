import React, {useContext, useEffect, useState, useRef} from 'react';
import { Alert, Modal, PermissionsAndroid, Pressable, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import   { Calendar } from 'react-native-calendars';
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as Dates from '../utils/Dates';
import { PressableImg } from '../utils/components';
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

    const [day, setDay] = useState(null);
    const [markedDates,setMarkedDates] = useState(null);
    const [week, setWeek] = useState(null);
    // to save view to img
    const viewRef = useRef();

    React.useEffect(()=>{
        console.log('running React.useEffect');
        updateDay(Dates.getToday());
        getMarkedDates();
    },[]);
    
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

    const DayFoods = ({day}) => {
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

    const ItemReport = ({ food }) => {
        if (fontsLoaded)
            return (
                <View style={(styles.ListCard,{
                    padding:10, 
                    backgroundColor: colors.primary, 
                    marginBottom:10
                })}>
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
                    <View style={{
                        paddingHorizontal: '10%',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}>
                        <Text style={(styles.textBody,{fontSize:16})}>
                            Calorias: {food.cals}
                        </Text>
                        <Text style={(styles.textBody,{fontSize:16})}>
                            Proteinas: {food.proteinas}
                        </Text>
                        <Text style={(styles.textBody,{fontSize:16})}>Carbs: {food.carbs}</Text>
                        <Text style={(styles.textBody,{fontSize:16})}>
                            Grasas: {food.grasas}
                        </Text>
                    </View>
                </View>
            );
        else return null;
    };

    const FoodReport = ({ obj }) => {
        if (fontsLoaded)
            return (
                <View
                    style={[
                        styles.containerBody,
                    ]}
                >
                    <Text
                        style={{
                            fontFamily: 'regular',
                            fontSize: 20,
                            marginVertical: 10,
                            flex: 1,
                        }}
                    >
                        {obj.title}
                    </Text>

                    {obj.body.length != 0 ? (
                        obj.body.map( (food, i) => <ItemReport food={food} key={i} /> ) ) : 
                        ( <Text>No Hay Datos</Text> )
                    }
                </View>
            );
        else return null;
    };

    const DayReport = ({day}) => {
        return(
            <View style={{ justifyContent: 'center' }}>
                <Text style={(styles.textBody,{fontSize: 25, fontWeight: 'bold'})}>
                    {day.fecha.replace('T00:00:00.000Z','')}
                </Text>
                <FoodReport
                    obj={{
                        title: 'Desayuno',
                        body: day ? day.desayuno : [],
                    }}
                />
                <FoodReport
                    obj={{
                        title: 'Almuerzo',
                        body: day ? day.almuerzo : [],
                    }}
                />
                <FoodReport
                    obj={{
                        title: 'Cena',
                        body: day ? day.cena : [],
                    }}
                />
                <FoodReport
                    obj={{
                        title: 'Snacks',
                        body: day ? day.snacks : [],
                    }}
                />
            </View>
        );
    }

    const WeeklyReport = () => {
        return ( 
            <View>
                <View ref={viewRef} style={{backgroundColor:'#ffffff'}}>
                    <Text style={styles.textHeader}>Reporte Semanal</Text>
                    { week.map( (day, i) => <DayReport day={day} key={i} /> ) }
                </View>
                <View style={{flexDirection:'row'}}>
                    <PressableImg
                        width={80}
                        text=''
                        name='download-outline'
                        size={30}
                        color='black'
                        img={null}
                        onPress={downloadImage}
                    />
                    <PressableImg
                        width={80}
                        text=''
                        name='close-circle'
                        size={30}
                        color='black'
                        img={null}
                        onPress={() => {
                            setModalVisible(false);
                            console.log('Modal closed');}}
                    />
                    <PressableImg
                        width={80}
                        text=''
                        name='share-social-outline'
                        size={30}
                        color='black'
                        img={null}
                        onPress={shareImage}
                    />
                </View>
                
            </View> 
        );
    }
        // download image
    const downloadImage = async () => {
        try {
            // capture component 
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });

            if (Platform.OS === 'android') {
                const granted = await MediaLibrary.requestPermissionsAsync();
                console.log(granted);
                if (!granted) {
                return;
                }
            }

            // cameraroll saves image
            const image = MediaLibrary.createAssetAsync(uri);
            if (image) {
                Alert.alert(
                '',
                'Image saved successfully.',
                [{text: 'OK', onPress: () => {}}],
                {cancelable: false},
                );
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const shareImage = async () => {
        try {
          // capture component 
          const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 0.8,
          });
    
          // share
          const shareResponse = await Sharing.shareAsync(uri);
        } catch (error) {
          console.log('error', error);
        }
      };

    return (
        <View style={styles.mainContainer}>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                //Alert.alert('');
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView >
                            <WeeklyReport />
                        </ScrollView>
                    </View>
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
                            let temp = await DayFuncs.getWeekByDate(token, Dates.getToday()); // fix when there the func exists
                            setWeek(temp);
                            console.log('week = ',temp);
                            setModalVisible(true);
                        }}
                    >
                        <Text style = {{color:'#ffffff'}}>Reporte Semanal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.buttonBody}
                        onPress = {() => Alert.alert(
                            "Contactanos por",
                            "664-123-4567\ncimahealth@gmail.com"
                          )}
                    >
                        <Text style = {{color:'#ffffff'}}>Contactanos</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default More;