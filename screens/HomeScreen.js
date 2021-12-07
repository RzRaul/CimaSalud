import React, { useEffect, useState,useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    Alert,
    Button,
    Text,
    View,
    Modal,
    Image,
    Pressable,
    TextInput,
    ScrollView,
    Touchable,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { url } from '../services/jsonServer';
import { Picker } from '@react-native-picker/picker';
import { ProgressChart } from 'react-native-chart-kit';
import { AuthContext } from '../utils/AuthContext';
import * as DayFuncs from '../services/dayFetchs';
import * as FoodFuncs from '../services/foodFetchs';
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
import {
    AutocompleteDropdown
} from 'react-native-autocomplete-dropdown';
import Food from './FoodScreen';

const Home = ({ navigation }) => {
    const { loginState, globalFuncs } = React.useContext(AuthContext);
    const token = loginState.userToken;
    const metas = loginState.metas;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState('desayuno');
    const [selectedItem, setSelectedItem] = useState(null);
    const [foodNames, setFoodNames] = useState(null);
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
    
    
    const getInfo = async () => {
        let i=0;
        const items = await FoodFuncs.getFoodAllNames(token);
        const suggestions = items.map((item) => ({
            id: item._id,
            title: item.name
        }));
        
        let dayTemp = await DayFuncs.getDayByDate(token, Dates.getToday());
        let cals = (proteinas = grasas = carbs = 0);
        setToday(dayTemp);
        setFoodNames((suggestions));

        let foods = dayTemp
            ? dayTemp.desayuno.concat(
                  dayTemp.almuerzo,
                  dayTemp.cena,
                  dayTemp.snacks
              )
            : [];

        if (foods == 0) {
            //console.log('foods is [] in getInfo');
            setUserInfo([
                { text: 'Calorias', val: 0, meta: metas.cals },
                { text: 'Proteinas', val: 0, meta: metas.proteins },
                { text: 'Carbs', val: 0, meta: metas.carbs },
                { text: 'Grasas', val: 0, meta: metas.grasas },
            ]);
            return;
        }

        for (const food of foods) {
            cals += food.cals;
            proteinas += food.proteinas;
            grasas += food.grasas;
            carbs += food.carbs;
        }

        setUserInfo([
            { text: 'Calorias', val: cals, meta: metas.cals },
            { text: 'Proteinas', val: proteinas, meta: metas.proteins },
            { text: 'Carbs', val: carbs, meta: metas.carbs },
            { text: 'Grasas', val: grasas, meta: metas.grasas },
        ]);

        return;
    };

    React.useEffect(() => {        
        //console.log('running React.useEffect');
        getInfo();
    }, []);

    const logOutHandler = () => {
        globalFuncs.signOut();
    };

    const addFood = () => {
        setModalVisible(!modalVisible);
        navigation.navigate('Food');
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
            <View style={(styles.container, { marginBottom: 15 })}>
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
    const handleAdd= async () => {
        setModalVisible(!modalVisible);
        if(!today){
            await DayFuncs.postDay(token,{
                desayuno:[],
                almuerzo:[],
                cena:[],
                snacks:[]
            });
        }

        console.log(selectedItem.id +' -> ' + selectedItem.title);
        switch (selectedMeal) {
            case 'desayuno':
                await DayFuncs.updateDayBreakFast(token,Dates.getToday(),selectedItem.id);              
                break;
            case 'almuerzo':
                await DayFuncs.updateDayLunch(token,Dates.getToday(),selectedItem.id);              
                break;
            case 'cena':
                await DayFuncs.updateDayDinner(token,Dates.getToday(),selectedItem.id);              
                break;
            case 'snack':
                await DayFuncs.updateDaySnacks(token,Dates.getToday(),selectedItem.id);              
                break;
        
            default:
                break;
        }
        getInfo();

        if( checkGoals() ) {
            console.log('se ha excedido la meta');
            Alert.alert(
                '',
                "Se ha excidido de la meta diaria"
            );
        }
    };

    const checkGoals = () => {
        let ret = false;
        userInfo.map((item) => ret = ret || (item.val <= item.meta));
        return ret;
    }

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
                                        {info.val}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>

                    <DayFoods />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableImg
                            width={80}
                            text='Registrar consumo'
                            name='add-circle'
                            size={35}
                            color={colors.accent}
                            img={null}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        />
                        <TouchableImg
                            width={80}
                            text='Sugerir comida'
                            name='restaurant-outline'
                            size={35}
                            color={colors.accent}
                            img={null}
                            onPress={() => {
                                Alert.alert(
                                    'Sugerencia',
                                    'Pollo con Arroz',
                                );
                            }}
                        />
                        <TouchableImg
                            width={80}
                            text='Cerrar sesión'
                            name='log-out-outline'
                            size={35}
                            color={colors.accent}
                            img={null}
                            onPress={globalFuncs.signOut}
                        />
                    </View>
                    
                </ScrollView>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('No se guardó nada');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>                                  
                           
                            <Text style={styles.modalText}>
                                Selecciona el tipo de comida:
                            </Text>
                            <Picker
                                selectedValue={selectedMeal}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedMeal(itemValue)
                                }
                                style={styles.dropDown}
                                mode='dropdown'
                            >
                                <Picker.Item
                                    label='Desayuno'
                                    value='desayuno'
                                />
                                <Picker.Item
                                    label='Almuerzo'
                                    value='almuerzo'
                                />
                                <Picker.Item label='Cena' value='cena' />
                                <Picker.Item label='Snacks' value='snack' />
                            </Picker>
                            <Text style={styles.modalText}>
                                Elige el alimento
                            </Text>
                            <AutocompleteDropdown
                                    containerStyle={styles.autocompletesContainer}
                                    textInputProps={{
                                        placeholder: "ej. Cheetos",
                                        autoCorrect: false,
                                        autoCapitalize: "none",

                                      }}
                                        clearOnFocus={false}
                                        closeOnBlur={true}
                                        
                                        onSelectItem={setSelectedItem}
                                        dataSet={foodNames}
                                    />

                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonAccept,
                                    { marginBottom: 40 },
                                ]}
                                onPress={()=>handleAdd()}
                            >
                                <Text style={styles.textStyle}>Aceptar</Text>
                            </Pressable>

                            <Text style={styles.modalText}>
                                ¿No se encuentra tu alimento? Agrégalo
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={addFood}
                            >
                                <Text style={styles.textStyle}>
                                    Agregar alimento
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

export default Home;
