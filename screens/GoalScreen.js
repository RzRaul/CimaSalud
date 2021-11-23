import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as UserFuncs from '../services/userFetchs';
import * as Dates from '../utils/Dates';
import styles from '../styles/styles';

const Goals = ({ navigation }) => {
  const { loginState, globalFuncs } = React.useContext(AuthContext);
  const token = loginState.userToken;
  const metas = loginState.metas;
  console.log(JSON.stringify(metas));
  const [editing, setEditing] = useState(false);

  const [today, setToday] = useState(null);
  const [userInfo, setUserInfo] = useState([
    { text: 'Calorias', val: 0, meta: 0 },
    { text: 'Proteinas', val: 0, meta: 0 },
    { text: 'Carbohidratos', val: 0, meta: 0 },
    { text: 'Grasas', val: 0, meta: 0 },
  ]);
  const [goals, setGoals] = useState({
    cals: 0,
    proteins: 0,
    carbs: 0,
    grasas: 0,
  });
  const [isFetched, setIsFetched] = useState(false);

  const updateToday = async () => {
    let dayTemp = await DayFuncs.getDayByDate(token, Dates.getToday());
    setToday(dayTemp);
  };

  const getNutrInfo = () => {
    let cals = (proteinas = grasas = carbs = 0);
    let foods = today
      ? today.desayuno.concat(today.almuerzo, today.cena, today.snacks)
      : [];

    let meta = metas;
    console.log('Meta es:' + meta); //debug
    setGoals(meta);

    if (!today) {
      //console.log('today is undefined');
      setUserInfo([
        { text: 'Calorias', val: 0, meta: meta.cals ? meta.cals : 1 },
        {
          text: 'Proteinas',
          val: 0,
          meta: meta.proteinas ? meta.proteinas : 1,
        },
        { text: 'Carbohidratos', val: 0, meta: meta.carbs ? meta.carbs : 1 },
        { text: 'Grasas', val: 0, meta: meta.grasas ? meta.grasas : 1 },
      ]);
      if (!isFetched) setIsFetched(true);
      return;
    }

    for (const food of foods) {
      cals += food.cals;
      proteinas += food.proteinas;
      grasas += food.grasas;
      carbs += food.carbs;
    }
    setUserInfo([
      { text: 'Calorias', val: cals, meta: meta.cals },
      { text: 'Proteinas', val: proteinas, meta: meta.proteins },
      { text: 'Carbohidratos', val: carbs, meta: meta.carbs },
      { text: 'Grasas', val: grasas, meta: meta.grasas },
    ]);
    return;
  };

  React.useEffect(() => {
    //console.log('GoalScreen running React.useEffect');
    updateToday();
    getNutrInfo();
  }, [isFetched]);

  const MyInput = (props) => {
    return (
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        // cuando se tenga la funcion para actualizar las metas en la base de datos cambiarla
        onChangeText={(input) => {
          if (!isNaN(Number(input) && input !== undefined))
            userInfo[props.index].meta = Number(input);
        }}
      />
    );
  };

  const DisplayGoals = () => {
    let myStyle = { width: 150, height: 28, marginTop: 2 };
    if (editing)
      return (
        <View>
          <TextInput
            style={[styles.input, myStyle]}
            keyboardType='numeric'
            placeholder='Calorias'
            value={goals.cals.toString()}
            onChangeText={(texto) =>
              setGoals({ ...goals, cals: Number(texto) })
            }
          />
          <TextInput
            style={[styles.input, myStyle]}
            keyboardType='numeric'
            placeholder='Proteinas'
            value={goals.proteins.toString()}
            onChangeText={(texto) =>
              setGoals({ ...goals, proteins: Number(texto) })
            }
          />
          <TextInput
            style={[styles.input, myStyle]}
            keyboardType='numeric'
            placeholder='Carbohidratos'
            value={goals.carbs.toString()}
            onChangeText={(texto) =>
              setGoals({ ...goals, carbs: Number(texto) })
            }
          />
          <TextInput
            style={[styles.input, myStyle]}
            keyboardType='numeric'
            placeholder='Grasas'
            value={goals.grasas.toString()}
            onChangeText={(texto) =>
              setGoals({ ...goals, grasas: Number(texto) })
            }
          />
        </View>
      );
    else
      return (
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
      );
  };

  const ListItem = ({ item }) => {
    return (
      <View style={{ paddingTop: 15, backgroundColor: '#F3F3F3' }}>
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

  const editHandler = () => {
    if (editing) {
      console.log('UserFuncs.updateUserGoals(token, goals); goals = ', goals);
      globalFuncs.updateGoals(metas);
      setIsFetched(!isFetched);
    }
    setEditing(!editing);
  };

  return (
    <View style={styles.mainContainer}>
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
          <DisplayGoals />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView>
          {userInfo.map((item, i) => (
            <ListItem item={item} key={i} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Goals;
