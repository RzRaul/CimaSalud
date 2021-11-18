import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Button, Text, View, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as FoodFuncs from '../services/foodFetchs';
import styles from '../styles/styles';

const Food = ({navigation}) => {
    const {loginState} = React.useContext(AuthContext);
    const token = loginState.userToken;

    const {searchFood, setSearchFood} = React.useState();

    const TouchableImg = (props) => {
        return (
            <TouchableOpacity
                style={[styles.button, {width: props.width, backgroundColor: props.backgroundColor}]}
                onPress = {props.onPress}
            >
                {
                    props.img !== null?
                    <Image source={props.img} style={{ width: props.imgWidth, height: props.imgHeight }} />:
                    <Ionicons name={props.name} size={props.size} color={props.color} />
                }
                <Text>{props.text}</Text>
            </TouchableOpacity>
        );
    }

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const createTwoButtonAlert = (text) =>
    Alert.alert(
      text,
      'Es correcto?',
      [
        {
          text: "Retomar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
            text: "Si", 
            onPress: () => setIsScanning(false) }
      ]
    );

    const createAlert = (text, text2, buttons) =>
    Alert.alert(
      text,
      text2,
      buttons
    );

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        getFoodByCode(token, data);

        // Falta peticion a la base de datos
        setIsScanning(false)
        /* Data = a el numero debajo del codigo de barras, el usuario no creo que lo verificaria
        createAlert(`Bar code with type ${type} and data ${data} has been scanned!`,'Es Correcto?',[
            {
              text: "Retomar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { 
                text: "Si", 
                onPress: () => setIsScanning(false) }
          ]);*/
    };


    return (
        <View style = {{flex : 1}}>
            { !isScanning?
                <View style = {styles.mainContainer}>
                    <ScrollView>
                        <View style = {[styles.containerHeader, {height: 175, paddingTop: 5}]}>
                            <View style = {{flexDirection: "row", justifyContent: 'space-between'}}>
                                <View >
                                    <Text style = {styles.textHeader}>Alimentos</Text>
                                    <TextInput 
                                        style = {[styles.input, {width:330}]}
                                        placeholder="Enter Food"
                                        onChangeText={setSearchFood}  
                                    />
                                </View>
                            </View>
                            
                            <View style = {{flexDirection: "row", padding: 5, flex:1}}>
                                <TouchableImg width={75} backgroundColor='#C1ACA1' text='Add'
                                    name='restaurant-outline' size={50} color='black' img={null}
                                    onPress={() => null} 
                                />

                                <TouchableImg width={75} backgroundColor='#C1ACA1' text='Delete'
                                    name='trash-outline' size={50} color='black' img={null}
                                    onPress={() => null} 
                                />

                                <TouchableImg width={75} backgroundColor='#C1ACA1' text='Edit'
                                    name='pencil' size={50} color='black' img={null}
                                    onPress={() => null} 
                                />

                                <TouchableImg width={75} backgroundColor='#C1ACA1' text='Scan'
                                    name='barcode-outline' size={50} color='black' img={null}
                                    onPress={() => {
                                        if (hasPermission === false) {
                                            createAlert('No se tiene acceso a la camara','',{
                                                text: "Okay", 
                                                onPress: () => console.log('No se tiene acceso a la camara') });
                                            return;
                                        }
                                        setIsScanning(true)
                                    }} 
                                />

                            </View>
                            
                        </View>
                        <View style={{paddingTop: 15, backgroundColor: '#F3F3F3'}}>
                            <Text style = {styles.textBody}>Recommended</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-around', paddingLeft: 0, height: 75, backgroundColor: '#9DD5D4'}}>
                            <TouchableImg width={50} backgroundColor='#9DD5D4' text=''
                                name='ios-arrow-back' size={30} color='black' img={null}
                                onPress={() => null} 
                            />

                            <TouchableImg width={75} backgroundColor='#9DD5D4' text='Apple'
                                img={require('../assets/foods/iconApple.png')} imgHeight={40} imgWidth={40}
                                onPress={() => null} 
                            />

                            <TouchableImg width={75} backgroundColor='#9DD5D4' text='Milk'
                                img={require('../assets/foods/iconMilk.png')} imgHeight={40} imgWidth={40}
                                onPress={() => null} 
                            />

                            <TouchableImg width={75} backgroundColor='#9DD5D4' text='Eggs'
                                img={require('../assets/foods/iconEggs.png')} imgHeight={40} imgWidth={40}
                                onPress={() => null} 
                            />

                            <TouchableImg width={50} backgroundColor='#9DD5D4' text=''
                                name='ios-arrow-forward' size={30} color='black' img={null}
                                onPress={() => null} 
                            /> 
                        </View>

                        <View style={{paddingTop: 15, margin: 15, backgroundColor: '#F3F3F3'}}>
                            <Text style = {styles.textBody}>Add Item</Text>
                            <View style={{padding: 15, backgroundColor: '#E1DEDE', alignItems:'center'}}>
                                <TextInput 
                                            style = {[styles.input, {width:200}]}
                                            placeholder="Enter Name"
                                            //onChangeText={setSearchFood}  
                                />
                                <TextInput 
                                            style = {[styles.input, {width:200}]}
                                            placeholder="Enter Calorias"
                                            //onChangeText={setSearchFood}  
                                />
                                <TextInput 
                                            style = {[styles.input, {width:200}]}
                                            placeholder="Enter Grasas"
                                            //onChangeText={setSearchFood}  
                                />
                                <TextInput 
                                            style = {[styles.input, {width:200}]}
                                            placeholder="Enter Proteinas"
                                            //onChangeText={setSearchFood}  
                                />
                                <TextInput 
                                            style = {[styles.input, {width:200}]}
                                            placeholder="Enter Carbohidratos"
                                            //onChangeText={setSearchFood}  
                                />
                                <TextInput 
                                            style = {[styles.input, {width:200}]}
                                            placeholder="Enter Gramos"
                                            //onChangeText={setSearchFood}  
                                />
                                <TouchableOpacity
                                    style={[styles.button, {width:200}]}
                                    //onPress = {()=> signIn('rulas@test.com', 'pass123')}
                                >
                                    <Text>Add Food</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View> : 
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <TouchableOpacity
                        style={[styles.button, {width:200, marginTop:535}]}
                        onPress = {() => setIsScanning(false)} 
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}



export default Food;