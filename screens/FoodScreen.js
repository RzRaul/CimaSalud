import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import styles from '../styles/styles';

const Food = ({navigation}) => {
    // Get User token and if null login again
    const {getState} = React.useContext(AuthContext);

    const token = 1;
    //const token = getState().userToken;
    if(!token){
        console.log('token is null');
        navigation.navigate('Login')
    }

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

    return (
        <View style = {{flex: 1}}>
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
                        <TouchableImg width={100} backgroundColor='#C1ACA1' text='Add Food'
                            name='restaurant-outline' size={50} color='black' img={null}
                            onPress={() => null} 
                        />

                        <TouchableImg width={100} backgroundColor='#C1ACA1' text='Delete Food'
                            name='trash-outline' size={50} color='black' img={null}
                            onPress={() => null} 
                        />

                        <TouchableImg width={100} backgroundColor='#C1ACA1' text='Edit Food'
                            name='pencil' size={50} color='black' img={null}
                            onPress={() => null} 
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
        </View>
    );
}



export default Food;