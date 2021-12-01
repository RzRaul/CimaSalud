import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { AuthContext } from '../utils/AuthContext';
import { TouchableImg } from '../utils/components';
import * as DayFuncs from '../services/dayFetchs';
import * as FoodFuncs from '../services/foodFetchs';
import styles, { colors, fonts } from '../styles/styles';

const Food = ({navigation}) => {
    const {loginState} = React.useContext(AuthContext);
    const token = loginState.userToken;

    const [section, setSection] = React.useState(0);
    const [found, setFound] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [foodData, setFoodData] = React.useState({
        name: '',
        cals:'',
        grasas:'',
        proteinas:'',
        carbs:''
    });
    const [dbFoodData, setDbFoodData] = React.useState([]);

    const [hasPermission, setHasPermission] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const createOkAlert = (text) =>
    Alert.alert(
        '',
        text,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        // Falta peticion a la base de datos
        //getFoodByCode(token, data.toString());

        setIsScanning(false)
    };

    const AddFoodHandler = async () => {
        let data;
        if(foodData.name && foodData.cals && foodData.grasas && foodData.proteinas && foodData.carbs){
            data = {...foodData, 
                cals:Number(foodData.cals), 
                grasas:Number(foodData.grasas), 
                proteinas:Number(foodData.proteinas), 
                carbs:Number(foodData.carbs), 
                type:'food'};
            console.log('foodData= ',data);
            createOkAlert('Comida añadida');
            FoodFuncs.addFoodByName(token, data);
        }else{
            console.log('Campos inválidos');
            createOkAlert('Campos inválidos');
        }
    }

    const DeleteFoodHandler = async () => {
        if(foodData.name){
            FoodFuncs.deleteFoodByName(token, foodData);
            setFound(false);
            console.log('food deleted = ',foodData.name);
            createOkAlert('Comida eliminada');
        }
    }

    const EditFoodHandler = async () => {
        let data;
        
        if(foodData.name && foodData.cals && foodData.grasas && foodData.proteinas && foodData.carbs){
            data = {
                name:foodData.name, 
                cals:Number(foodData.cals), 
                grasas:Number(foodData.grasas), 
                proteinas:Number(foodData.proteinas), 
                carbs:Number(foodData.carbs), 
                type:'food'};
            console.log('update food to = ',data);
            createOkAlert('Comida editada');
            FoodFuncs.updateFoodByName(token, data);
            setFound(false);
        }else{
            console.log('Campos inválidos');
            createOkAlert('Campos inválidos');
        }
    }

    const SearchFood = async () => {
        if(!found){
            let temp = await FoodFuncs.getFoodByName(token,foodData.name);
            console.log('searched food= ',temp);
            setIndex(0);
            setDbFoodData(temp);
            setFoodData(temp?temp[0]:{
                name: '',
                cals:0,
                grasas:0,
                proteinas:0,
                carbs:0
            });
            
            setFound(true);
        } else {
            setFound(false);
        }
        
    }

    return (
        <View style = {{flex : 1}}>
            { !isScanning?
                <View style = {styles.mainContainer}>
                    <ScrollView>
                        <View style = {[styles.containerHeader, {paddingTop: 15}]}>
                            <Text style = {styles.textHeader}>Alimentos</Text>
                            
                            <View style = {{flexDirection: "row", padding: 5, flex:1}}>
                                <TouchableImg width={75} text='Agregar'
                                    name='restaurant-outline' size={40} color={colors.accent} img={null}
                                    onPress={() => {setSection(0)}} 
                                />

                                <TouchableImg width={75}  text='Eliminar'
                                    name='trash-outline' size={40} color={colors.accent} img={null}
                                    onPress={() => {setSection(1)}} 
                                />

                                <TouchableImg width={75}  text='Edit'
                                    name='pencil' size={40} color={colors.accent} img={null}
                                    onPress={() => {setSection(2)}} 
                                />

                                <TouchableImg width={75} text='Scan'
                                    name='barcode-outline' size={40} color={colors.accent} img={null}
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
                        
                        {
                            section == 0?
                            <View style={{margin: 15}}>
                                <Text style = {styles.textBody}>Agregar alimento</Text>
                                <View style={{padding: 15, backgroundColor: colors.neutro, alignItems:'center', justifyContent:'space-between'}}>
                                    <TextInput 
                                        style = {[styles.input, {width:200}]}
                                        placeholder="Enter Name"
                                        onChangeText={(text)=> setFoodData({...foodData,name:text})}
                                    />
                                    <TextInput 
                                        style = {[styles.input, {width:200}]}
                                        placeholder="Enter Calorias" value={foodData.cals} keyboardType="numeric"
                                        onChangeText={(text)=> setFoodData({...foodData,cals:text})}
                                    />
                                    <TextInput 
                                        style = {[styles.input, {width:200}]}
                                        placeholder="Enter Grasas" keyboardType="numeric"
                                        onChangeText={(text)=> setFoodData({...foodData,grasas:text})}
                                    />
                                    <TextInput 
                                        style = {[styles.input, {width:200}]}
                                        placeholder="Enter Proteinas" keyboardType="numeric"
                                        onChangeText={(text)=> setFoodData({...foodData,proteinas:text})}
                                    />
                                    <TextInput 
                                        style = {[styles.input, {width:200}]}
                                        placeholder="Enter Carbohidratos" keyboardType="numeric"
                                        onChangeText={(text)=> setFoodData({...foodData,carbs:text})}
                                    />
                                    <TouchableOpacity
                                        style={[styles.button, {width:200}]}
                                        onPress = {AddFoodHandler}
                                    >
                                        <Text>Add Food</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>: section == 1?
                                <View style={{margin: 15}}>
                                    <Text style = {styles.textBody}>Eliminar alimento</Text>
                                    <View style={{padding: 15, backgroundColor: colors.neutro, alignItems:'center', justifyContent:'space-between'}}>   
                                        {
                                            found?
                                            <View>
                                                <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                                                    <TouchableImg width={50}  text=''
                                                        name='ios-arrow-back' size={30} color='black' img={null}
                                                        onPress={() => {
                                                            if(index !== 0)
                                                                setIndex(index - 1);
                                                            setFoodData(dbFoodData[index]);
                                                        }} 
                                                    />
                                                    <TouchableImg width={50}  text=''
                                                        name='ios-arrow-forward' size={30} color='black' img={null}
                                                        onPress={() => {
                                                            if(dbFoodData[index+1])
                                                                setIndex(index + 1);
                                                            setFoodData(dbFoodData[index]);
                                                        }}
                                                    />
                                                </View>
                                                <Text style = {styles.textBody}>Name: {foodData.name}</Text>
                                                <Text style = {styles.textBody}>Cals: {foodData.cals}</Text>
                                                <Text style = {styles.textBody}>Grasas: {foodData.grasas}</Text>
                                                <Text style = {styles.textBody}>Proteinas: {foodData.proteinas}</Text>
                                                <Text style = {styles.textBody}>Carbs: {foodData.carbs}</Text>
                                                
                                                <TouchableOpacity
                                                    style={[styles.button, {width:200}]}
                                                    onPress = {DeleteFoodHandler}
                                                >
                                                    <Text>Delete Food</Text>
                                                </TouchableOpacity>
                                            </View>:
                                            <TextInput 
                                                style = {[styles.input, {width:200}]}
                                                placeholder="Enter Name"
                                                onChangeText={(text)=> setFoodData({...foodData,name:text})}
                                            />
                                        }
                                        <TouchableOpacity
                                            style={[styles.button, {width:200}]}
                                            onPress = {SearchFood}
                                        >
                                            <Text>Search Food</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>:
                                <View style={{margin: 15}}>
                                    <Text style = {styles.textBody}>Editar alimento</Text>
                                    <View style={{padding: 15, backgroundColor: colors.neutro, alignItems:'center', justifyContent:'space-between'}}>
                                        {
                                            found?
                                            <View>
                                                <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                                                    <TouchableImg width={50}  text=''
                                                        name='ios-arrow-back' size={30} color='black' img={null}
                                                        onPress={() => {
                                                            if(index !== 0)
                                                                setIndex(index - 1);
                                                            setFoodData(dbFoodData[index]);
                                                        }} 
                                                    />
                                                    <TouchableImg width={50}  text=''
                                                        name='ios-arrow-forward' size={30} color='black' img={null}
                                                        onPress={() => {
                                                            if(dbFoodData[index+1])
                                                                setIndex(index + 1);
                                                            setFoodData(dbFoodData[index]);
                                                        }}
                                                    />
                                                </View>
                                                <Text style = {styles.textBody}>Name: {foodData.name}</Text>
                                                <TextInput 
                                                    style = {[styles.input, {width:200}]}
                                                    placeholder="Enter Calorias" defaultValue={foodData.cals.toString()}
                                                    onChangeText={(text)=> setFoodData({...foodData,cals:text})}
                                                />
                                                <TextInput 
                                                    style = {[styles.input, {width:200}]}
                                                    placeholder="Enter Grasas" defaultValue={foodData.grasas.toString()}
                                                    onChangeText={(text)=> setFoodData({...foodData,grasas:text})}
                                                />
                                                <TextInput 
                                                    style = {[styles.input, {width:200}]}
                                                    placeholder="Enter Proteinas" defaultValue={foodData.proteinas.toString()}
                                                    onChangeText={(text)=> setFoodData({...foodData,proteinas:text})}
                                                />
                                                <TextInput 
                                                    style = {[styles.input, {width:200}]}
                                                    placeholder="Enter Carbohidratos" defaultValue={foodData.carbs.toString()}
                                                    onChangeText={(text)=> setFoodData({...foodData,carbs:text})}
                                                />
                                                <TouchableOpacity
                                                    style={[styles.button, {width:200}]}
                                                    onPress = {EditFoodHandler}
                                                >
                                                    <Text>Edit Food</Text>
                                                </TouchableOpacity>
                                            </View>:
                                            <View>
                                                <TextInput 
                                                    style = {[styles.input, {width:200}]}
                                                    placeholder="Enter Name"
                                                    onChangeText={(text)=> setFoodData({...foodData,name:text})}
                                                />
                                            </View>
                                            
                                        }
                                        <TouchableOpacity
                                            style={[styles.button, {width:200}]}
                                            onPress = {SearchFood}
                                        >
                                            <Text>Search Food</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </ScrollView>
                </View> : 
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
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