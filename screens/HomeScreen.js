import React, { useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import styles from '../styles/styles';

const Home = ({navigation}) => {
    // Get User token and if null login again
    const {getState} = React.useContext(AuthContext);

    const token = 1;
    //const token = getState().userToken;
    if(!token){
        console.log('token is null');
        navigation.navigate('Login')
    }

    const [userInfo, setUserInfo] = useState([
        {text: 'Grasas', val: 150, meta: 100, id:0},
        {text: 'Proteinas', val: 25, meta: 50, id:1},
        {text: 'Calorias', val: 50, meta: 123, id:2},
        {text: 'Carbohidratos', val: 75, meta: 200, id:3}
    ]);
    
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

    const getNutrInfo = (day = DayFuncs.getDayByDate(token,Date())) => {
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

    //const [nutrInfo, setNutrInfo] = useState( getNutrInfo( DayFuncs.getDayByDate( token, Date() ) ));
    const [items, setItems] = useState([
        {text: 'Calorias', val: 50, meta: 123, id:2},
        {text: 'Grasas', val: 150, meta: 100, id:0},
        {text: 'Proteinas', val: 25, meta: 50, id:1},
        {text: 'Carbohidratos', val: 75, meta: 200, id:3}
    ]);

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
        <View style = {{flex: 1}}>
            <ScrollView>
                <View style = {styles.containerHeader}>
                    
                    <Text style = {styles.textHeader}>Home</Text>
                    
                    <View style = {{flexDirection: "row", flex:1, justifyContent:'space-between' }}>
                        <ProgressChart
                            data={ {
                                labels: items.map(item => item.text), 
                                data: items.map(item => item.val<item.meta ? item.val / item.meta : 1)
                            } }
                            width={150}
                            height={150}
                            strokeWidth={8}
                            radius={25}
                            hideLegend={true}
                            chartConfig={{
                                backgroundGradientFrom: "#C1ACA1",
                                backgroundGradientTo: "#C1ACA1",
                                color: (opacity = 1, color = 255) => {
                                    return (
                                        `rgba(${color}, ${color}, ${color}, ${opacity})`
                                    )
                                },
                                style: {
                                    borderRadius: 5,
                                    flexDirection: "column",
                                    justifyContent: 'center'
                                }
                            }}
                        />
                        <View>
                            {userInfo.map((info) => {
                                return (
                                    <View style={{flexDirection: "row"}}>
                                        <Text style = {styles.textBody} key = {info.id}>{info.text}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View>
                            {userInfo.map((info, opacity = 1, color = 255) => <Text style = {styles.textBody} key = {info.id}>{info.val} g</Text>)}
                        </View>
                    </View>
                </View>

                <View style = {{flex: 1}}>
                    <View>
                        {foods.map((food,i) => (<ListItem food={food} key={i}/>))}
                    </View>
                </View>
                <Button 
                    title='Cerrar sesión'
                    color = '#1779ba'
                    onPress = {()=> signOut()}
                />
            </ScrollView>
        </View>
    )
}



export default Home;