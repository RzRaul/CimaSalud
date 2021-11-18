import React, { useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Button, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as Dates from '../utils/Dates';
import styles from '../styles/styles';

const Home = ({navigation}) => {
    const {loginState, globalFuncs} = React.useContext(AuthContext);
    const token = loginState.userToken;
    const metas = loginState.metas;

    const [today, setToday] = useState(null);
    const [userInfo, setUserInfo] = useState([
        {text: 'Calorias', val: 0, meta: 0},
        {text: 'Proteinas', val: 0, meta: 0},
        {text: 'Carbohidratos', val: 0, meta: 0},
        {text: 'Grasas', val: 0, meta: 0},
    ]);

    const getInfo = async () => {
        let dayTemp = await DayFuncs.getDayByDate(token, Dates.getToday());
        let cals = proteinas = grasas = carbs = 0;
        setToday(dayTemp);

        let foods = dayTemp? dayTemp.desayuno.concat(dayTemp.almuerzo,dayTemp.cena,dayTemp.snacks): [];

        if(foods == 0){
            console.log('foods is [] in getNutInfo');
            setUserInfo([
                {text: 'Calorias', val: 0, meta: metas.cals},
                {text: 'Proteinas', val: 0, meta: metas.proteinas},
                {text: 'Carbohidratos', val: 0, meta: metas.carbs},
                {text: 'Grasas', val: 0, meta: metas.grasas},
            ]);
            return ;
        }

        for(const food of foods){
            cals += food.cals;
            proteinas += food.proteinas;
            grasas += food.grasas;
            carbs += food.carbs;
        }

        setUserInfo([
            {text: 'Calorias', val: cals, meta: metas.cals},
            {text: 'Proteinas', val: proteinas, meta: metas.proteinas},
            {text: 'Carbohidratos', val: carbs, meta: metas.carbs},
            {text: 'Grasas', val: grasas, meta: metas.grasas},

        ]);
        return ;
    }

    React.useEffect(()=>{
        console.log('running React.useEffect');
        getInfo();
    },[]);

    const logOutHandler = () =>{
        globalFuncs.signOut();
    }

    const ListItem = ({food}) => {
        return (
            <View style={{paddingTop: 15, backgroundColor: '#F3F3F3'}}>
                <View style={{padding: 15, backgroundColor: '#9DD5D4'}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {styles.textBody}>{food.name}</Text>
                    </View>
                    <View style = {{padding: 10, flexDirection: 'column', justifyContent: 'space-around'}}>
                        <Text style = {styles.textBody}>Calorias {food.cals}</Text>
                        <Text style = {styles.textBody}>Proteinas {food.proteinas}</Text>
                        <Text style = {styles.textBody}>Carbohidratos {food.carbs}</Text>
                        <Text style = {styles.textBody}>Grasas {food.grasas}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const TitleWithBody = ({obj}) => {
        return (
            <View style={[styles.containerBody,{backgroundColor: '#d4c9b9'}]} margin={5} padding={10}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>{ obj.title }</Text>
                { obj.body.length != 0 ? 
                    obj.body.map( (food,i) => (<ListItem food={food} key={i}/>) ):
                    <Text>No Hay Datos</Text>
                }
            </View>
        );
    }

    const DayFoods = () => {

        return (
            <View>
                <TitleWithBody obj={{title:'Desayuno', body: today? today.desayuno : []}} />
                <TitleWithBody obj={{title:'Almuerzo', body: today? today.almuerzo : []}} />
                <TitleWithBody obj={{title:'Cena', body: today? today.cena : []}} />
                <TitleWithBody obj={{title:'Snacks', body: today? today.snacks : []}} />
            </View>
        );
    }

    const UserGraph = () => {
        const userData = {
            labels: userInfo.map(item => item.text), 
            data: userInfo.map(item => item.val<item.meta ? item.val / item.meta : 1)
        };
        return (<ProgressChart
            data={ userData }
            width={150}
            height={145}
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
        />);
    }

    return (
        <View style = {styles.mainContainer}>
            <ScrollView>
                <View style = {styles.containerHeader}>
                    
                    <Text style = {styles.textHeader}>{`Bienvenido, ${loginState.userName}`}</Text>
                    
                    <View style = {{flexDirection: "row", flex:1, justifyContent:'space-between' }}>
                        <UserGraph />
                        <View>
                            {userInfo.map((info, i) => <Text style = {styles.textBody} key = {i}>{info.text}</Text>)}
                        </View>
                        <View>
                            {userInfo.map((info,i) => <Text style = {styles.textBody} key = {i}>{info.val} g</Text>)}
                        </View>
                    </View>
                </View>

                <DayFoods />
                <Button 
                    title='Cerrar sesión'
                    color = '#1779ba'
                    onPress = {logOutHandler}
                />
            </ScrollView>
        </View>
    )
}



export default Home;