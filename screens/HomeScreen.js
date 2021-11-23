import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    Alert,
    Button,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    Touchable,
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as UserFuncs from '../services/userFetchs';
import * as Dates from '../utils/Dates';
import { TouchableImg } from '../utils/components';
import styles, { colors, fonts } from '../styles/styles';
import {
    useFonts,
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_300Light_Italic,
} from '@expo-google-fonts/roboto';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
    const { loginState, globalFuncs } = React.useContext(AuthContext);
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

    const [today, setToday] = useState(null);
    const [userInfo, setUserInfo] = useState([
        { text: 'Calorias', val: 0, meta: 0 },
        { text: 'Proteinas', val: 0, meta: 0 },
        { text: 'Carbs', val: 0, meta: 0 },
        { text: 'Grasas', val: 0, meta: 0 },
    ]);
    const [isFetched, setIsFetched] = useState(false);

    const updateToday = async () => {
        let dayTemp = await DayFuncs.getDayByDate(
            loginState.userToken,
            Dates.getToday()
        );
        setToday(dayTemp);
    };

    const getNutrInfo = async () => {
        let cals = (proteinas = grasas = carbs = 0);
        let foods = today
            ? today.desayuno.concat(today.almuerzo, today.cena, today.snacks)
            : [];

        let { meta } = await UserFuncs.getUserInfo(token);

        if (!today) {
            console.log('today is undefined');
            setUserInfo([
                {
                    text: 'Calorias:',
                    val: 0,
                    meta: meta.cals ? meta.cals : 1,
                },
                {
                    text: 'Proteinas:',
                    val: 0,
                    meta: meta.proteinas ? meta.proteinas : 1,
                },
                {
                    text: 'Cars:',
                    val: 0,
                    meta: meta.carbs ? meta.carbs : 1,
                },
                {
                    text: 'Grasas:',
                    val: 0,
                    meta: meta.grasas ? meta.grasas : 1,
                },
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
            { text: 'Calorias:', val: cals, meta: meta.cals },
            { text: 'Proteinas:', val: proteinas, meta: meta.proteinas },
            { text: 'Carbs:', val: carbs, meta: meta.carbs },
            { text: 'Grasas:', val: grasas, meta: meta.grasas },
        ]);
        return;
    };

    React.useEffect(() => {
        console.log('running React.useEffect');
        updateToday();
        getNutrInfo();
    }, [isFetched]);

    const logOutHandler = () => {
        globalFuncs.signOut();
    };
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

    const DayFoods = () => {
        return (
            <View style={(styles.container, { marginBottom:15 })}>
                <TitleWithBody
                    obj={{
                        title: 'Desayuno',
                        body: today ? today.desayuno : [],
                        show: showing.showBreakFast,
                    }}
                />
                <TitleWithBody
                    obj={{
                        title: 'Almuerzo',
                        body: today ? today.almuerzo : [],
                        show: showing.showLunch,
                    }}
                />
                <TitleWithBody
                    obj={{
                        title: 'Cena',
                        body: today ? today.cena : [],
                        show: showing.showDinner,
                    }}
                />
                <TitleWithBody
                    obj={{
                        title: 'Snacks',
                        body: today ? today.snacks : [],
                        show: showing.showSnacks,
                    }}
                />
            </View>
        );
    };

    const UserGraph = () => {
        const userData = {
            labels: userInfo.map((item) => item.text),
            data: userInfo.map((item) =>
                item.val < item.meta ? item.val / item.meta : 1
            ),
        };
        return (
            <ProgressChart
                data={userData}
                width={150}
                height={150}
                strokeWidth={9}
                radius={35}
                hideLegend={true}
                chartConfig={{
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    color: (opacity = 1, color = 255) => {
                        return `rgba(${90}, ${178}, ${110}, ${opacity})`;
                    },
                    style: {
                        borderRadius: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    },
                }}
            />
        );
    };
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.containerHeader}>
                        <Text
                            style={styles.textHeader}
                        >{`Bienvenido, ${loginState.userName}`}</Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'space-between',
                            }}
                        >
                            <UserGraph />
                            <View>
                                {userInfo.map((info, i) => (
                                    <Text style={styles.textBody2} key={i}>
                                        {info.text}
                                    </Text>
                                ))}
                            </View>
                            <View>
                                {userInfo.map((info, i) => (
                                    <Text style={styles.textBody2} key={i}>
                                        {info.val} g
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>

                    <DayFoods />
                    <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
                        <TouchableImg
                            width={80}
                            text='Registrar consumo'
                            name='restaurant-outline'
                            size={35}
                            color={colors.accent}
                            img={null}
                            onPress={() => null}
                        />
                        <TouchableImg
                            width={130}
                            text='Cerrar sesión'
                            name='restaurant-outline'
                            size={35}
                            color={colors.accent}
                            img={null}
                            onPress={() => null}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default Home;
