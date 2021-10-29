import React, { useState } from 'react';
import { Button, Text, View, Image, FlatList, TextInput } from 'react-native';
import styles from '../styles/styles';
import ListItem from '../components/ListItem';

const Goals = ({navigation}) => {
    const [editing, setEditing] = useState(false);
    const [items, setItems] = useState([
        {text: 'Grasas', val: 10, meta: 0, id: 0},
        {text: 'Proteinas', val: 0, meta: 10, id: 1},
        {text: 'Calorias', val: 0, meta: 123, id: 2},
        {text: 'Carbohidratos', val: 0, meta: 0, id: 3}
    ]);
    const MyInput = (props) => {
        return (
            <TextInput 
                style={styles.input}
                keyboardType="numeric"
                //value={props.item.meta}
                onChangeText={input => {
                    //props.item.meta = input;
                    if(!isNaN(Number(input)))
                        items[props.index].meta = Number(input);
                }}  
                 />
        );
    }
    
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
                
                <View style = {{flexDirection: "row", padding: 15, flex:1}}>
                    <View style = {{paddingRight: 15}}>
                        <Image source={require('../assets/icon.png')} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style = {{paddingRight: 15}}>
                        {items.map(item => (<Text style={styles.textBody} id={item.id}>{item.text}</Text>))}
                    </View>
                    <View>
                        {editing? 
                            items.map((item,i) => (<MyInput item={item} index={i} />)):
                            items.map(item => <Text style={styles.textBody}>{item.meta.toString()} g</Text>)}
                    </View>
                </View>
            </View>

            <View style = {{flex: 2}}>
            <FlatList 
                data={items}
                renderItem={({item}) => <ListItem item={item} key={item.id}/>} />
            </View>
            
            <Button 
                title='Volver a inicio'
                color = '#1779ba'
                onPress = {()=> navigation.navigate('Inicio')}
            />
        </View>
    );
};

export default Goals;