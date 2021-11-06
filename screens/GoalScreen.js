import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import styles from '../styles/styles';

const Goals = ({navigation}) => {
    // Get User token and if null login again
    const {getState} = React.useContext(AuthContext);

    const token = 1;
    //const token = getState().userToken;
    if(!token){
        console.log('token is null');
        navigation.navigate('Login')
    }

    const getNutrInfo = (day) => {
        let cals = proteinas = grasas = carbs = 0;
        let foods = day.desayuno.concat(day.almuerzo,day.cena,day.snacks);

        // actualizar a la funcion para recibir las metas
        let metas = UserFuncs.getUserInfo(token);

        for(const food of foods){
            cals += food.cals;
            proteinas += food.proteinas;
            grasas += food.grasas;
            carbs += food.carbs;
        }

        // si se cambia el retorno entonces se va a tener que hacer varios cambios al codigo
        return [
            {text: 'Calorias', val: cals, meta: metas.cals},
            {text: 'Grasas', val: grasas, meta: metas.grasas},
            {text: 'Proteinas', val: proteinas, meta: metas.proteinas},
            {text: 'Carbohidratos', val: carbs, meta: metas.carbs}
        ];
    }
    const [editing, setEditing] = useState(false);
    //const [nutrInfo, setNutrInfo] = useState( getNutrInfo( DayFuncs.getDayByDate( token, Date() ) ));
    const [items, setItems] = useState([
        {text: 'Grasas', val: 150, meta: 100, id:0},
        {text: 'Proteinas', val: 25, meta: 50, id:1},
        {text: 'Calorias', val: 50, meta: 123, id:2},
        {text: 'Carbohidratos', val: 75, meta: 200, id:3}
    ]);
    const MyInput = (props) => {
        return (
            <TextInput 
                style={styles.input}
                keyboardType="numeric"

                // cuando se tenga la funcion para actualizar las metas en la base de datos cambiarla
                onChangeText={input => {
                    if(!isNaN(Number(input) && input!== undefined))
                        items[props.index].meta = Number(input);
                }}  
            />
        );
    }
    const ListItem = ({item}) => {
        return (
            <View style={{paddingTop: 15, backgroundColor: '#F3F3F3'}}>
                <View style={{padding: 15, backgroundColor: '#9DD5D4'}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {styles.textBody}>{item.text}</Text>
                    </View>
                    <View style = {{padding: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <ProgressChart
                            data={ {data: [item.val<item.meta ? item.val / item.meta : 1]} }
                            width={175}
                            height={75}
                            strokeWidth={10}
                            radius={25}
                            chartConfig={{
                                backgroundColor: "#9DD5D4",
                                backgroundGradientFrom: "#9DD5D4",
                                backgroundGradientTo: "#9DD5D4",
                                color: (opacity = 1) => {
                                    return (
                                        item.val<item.meta?
                                        `rgba(255, 255, 255, ${opacity})`:
                                        `rgba(175, 10, 10, ${opacity})`
                                    )
                                },
                                style: {
                                  borderRadius: 10
                                }
                            }}
                        />

                        <Text style = {styles.textBody}>{item.val} / {item.meta}</Text>
                        
                    </View>
                </View>
            </View>
        );
    };
    
    return (
        <View style = {{flex: 1}}>
            <View style = {styles.containerHeader}>
                <View style = {{flexDirection: "row", justifyContent: 'space-between'}}>
                    <View >
                        <Text style = {styles.textHeader}>Metas</Text>
                    </View>
                    <View >
                    <Button 
                            title= {editing? 'Guardar':'Editar'}
                            color = '#1779ba'
                            onPress = {() => {
                                setEditing(!editing);
                            }}
                        />
                    </View>
                    
                </View>
                
                <View style = {{flexDirection: "row", padding: 10, flex:1}}>
                    <View style = {{paddingRight: 15}}>
                        <Ionicons name='fitness-outline' size={100} color='black' />
                        
                    </View>
                    <View style = {{paddingRight: 15}}>
                        {items.map((item) => (<Text style={styles.textBody} key={item.id}>{item.text}</Text>))}
                    </View>
                    <View>
                        {editing? 
                            items.map((item) => (<MyInput item={item} key={item.id} index={item.id} />)):
                            items.map((item) => <Text style={styles.textBody} key={item.id}>{item.meta.toString()} g</Text>)}
                    </View>
                </View>
            </View>

            <View style = {{flex: 1}}>
                <ScrollView>
                    {items.map((item) => <ListItem item={item} key={item.id}/>)}
                </ScrollView>
            </View>
            
            
        </View>
    );
};

export default Goals;
