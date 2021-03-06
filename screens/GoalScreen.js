import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as UserFuncs from '../services/userFetchs';
import * as Dates from '../utils/Dates';
import styles from '../styles/styles';

const Goals = ({navigation}) => {
  const {loginState, globalFuncs} = React.useContext(AuthContext);
  const token = loginState.userToken;
  let metas = loginState.metas;
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(false);

  const [today, setToday] = useState(null);
  const [userInfo, setUserInfo] = useState([
      {text: 'Calorias', val: 0, meta: 0},
      {text: 'Proteinas', val: 0, meta: 0},
      {text: 'Carbohidratos', val: 0, meta: 0},
      {text: 'Grasas', val: 0, meta: 0}
  ]);
  const [goals, setGoals] = useState({
      cals: 0,
      proteins: 0,
      carbs: 0,
      grasas: 0,
  });

  const getInfo = async () => {
    let dayTemp = await DayFuncs.getDayByDate(token, Dates.getToday());  
      
    let cals = proteinas = grasas = carbs = 0;
    setToday(dayTemp);
    const state = await globalFuncs.getState();
    //console.log('func getState.meta', state);
    let foods = dayTemp? dayTemp.desayuno.concat(dayTemp.almuerzo,dayTemp.cena,dayTemp.snacks): [];

    //console.log('in GoaScreen getInfo metas = ',metas);
    setGoals(metas);

    if(foods == 0){
      console.log('foods is [] in getNutInfo');
      setUserInfo([
        {text: 'Calorias', val: 0, meta: metas.cals},
        {text: 'Proteinas', val: 0, meta: metas.proteins},
        {text: 'Carbs', val: 0, meta: metas.carbs},
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
      {text: 'Proteinas', val: proteinas, meta: metas.proteins},
      {text: 'Carbs', val: carbs, meta: metas.carbs},
      {text: 'Grasas', val: grasas, meta: metas.grasas},
    ]);
    
    return ;
  }

  React.useEffect(()=>{
    //console.log('running React.useEffect in GoalScreen');
    getInfo();
  },[update, loginState.updateScreen]);
    
  const editHandler = async () => {
    if(editing){
      await globalFuncs.updateGoals(token, goals);
      //console.log('updateGoals to = ',goals);
      setUpdate(!update);
    }
    setEditing(!editing);
  }


  const ListItem = ({ item }) => {
    return (
      <View style={{ paddingTop: 15}}>
        <View style={{ padding: 15, backgroundColor: '#9DD5D4' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.textBody}>{item.text}</Text>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <ProgressChart
              data={{ data: [item.val < item.meta ? item.val / item.meta : 1] }}
              width={175}
              height={75}
              strokeWidth={10}
              radius={25}
              chartConfig={{
                backgroundColor: '#9DD5D4',
                backgroundGradientFrom: '#9DD5D4',
                backgroundGradientTo: '#9DD5D4',
                color: (opacity = 1) => {
                  return item.val < item.meta
                    ? `rgba(255, 255, 255, ${opacity})`
                    : `rgba(175, 10, 10, ${opacity})`;
                },
                style: {
                  borderRadius: 10,
                },
              }}
            />

            <Text style={styles.textBody}>
              {item.val} / {item.meta}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.containerHeader}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.textHeader}>Metas</Text>
            </View>
            <View>
              <Button
                title={editing ? 'Guardar' : 'Editar'}
                color='#1779ba'
                onPress={editHandler}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', padding: 10, flex: 1 }}>
            <View style={{ paddingRight: 15 }}>
              <Ionicons name='fitness-outline' size={100} color='black' />
            </View>
            {editing?
              <View>
                <TextInput
                  style={[styles.input, {width:140, borderWidth: 1}]}
                  keyboardType='numeric'
                  placeholder='Calorias'
                  value={goals.cals.toString()}
                  onChangeText={(texto) =>
                    setGoals({ ...goals, cals: Number(texto) })
                  }
                />
                <TextInput
                  style={[styles.input, {width:140, borderWidth: 1}]}
                  keyboardType='numeric'
                  placeholder='Proteinas'
                  value={goals.proteins.toString()}
                  onChangeText={(texto) =>
                    setGoals({ ...goals, proteins: Number(texto) })
                  }
                />
                <TextInput
                  style={[styles.input, {width:140, borderWidth: 1}]}
                  keyboardType='numeric'
                  placeholder='Carbs'
                  value={goals.carbs.toString()}
                  onChangeText={(texto) =>
                    setGoals({ ...goals, carbs: Number(texto) })
                  }
                />
                <TextInput
                  style={[styles.input, {width:140, borderWidth: 1}]}
                  keyboardType='numeric'
                  placeholder='Grasas'
                  value={goals.grasas.toString()}
                  onChangeText={(texto) =>
                    setGoals({ ...goals, grasas: Number(texto) })
                  }
                />
              </View>:
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View>
                  {userInfo.map((item, i) => (
                    <Text style={styles.textBody} key={i}>
                      {item.text}
                    </Text>
                  ))}
                </View>
                <View>
                  {userInfo.map((info, i) => (
                    <Text style={styles.textBody} key={i}>
                      {info.meta} g
                    </Text>
                  ))}
                </View>
              </View>
            }
          </View>
        </View>

          {userInfo.map((item, i) => (
            <ListItem item={item} key={i} />
          ))}
      </ScrollView>
    </View>
  );
};

export default Goals;
