import React, { useState } from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import styles from '../styles/styles';

const ListItem = ({item}) => {
    
    return (
        <View style={listStyles.listItemOuter}>
            <View style={listStyles.listItemInner}>
                <View style = {listStyles.listItemTop}>
                    <Text style = {styles.textBody}>{item.text}</Text>
                </View>
                <View style = {listStyles.listItemBottom}>
                    <Image source={require('../assets/icon.png')} style={{ width: 50, height: 50 }} />

                    <Text style = {styles.textBody}>{item.val} / {item.meta}</Text>
                    
                </View>
            </View>
        </View>
    );
};

const listStyles = StyleSheet.create({
    listItemOuter: {
        paddingTop: 20,
        backgroundColor: '#F3F3F3',
    },
    listItemInner: {
        padding: 15,
        backgroundColor: '#9DD5D4',
    },
    listItemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemBottom: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    
});

export default ListItem;