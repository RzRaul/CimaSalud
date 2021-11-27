import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from '../styles/styles';

export const TouchableImg = (props) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width: props.width,
                    height: props.width,
                    backgroundColor: props.backgroundColor,
                },
            ]}
            onPress={props.onPress}
        >
            {props.img !== null ? (
                <Image
                    source={props.img}
                    style={{ width: props.imgWidth, height: props.imgHeight }}
                />
            ) : (
                <Ionicons
                    name={props.name}
                    size={props.size}
                    color={props.color}
                />
            )}
            <Text style={{ color: props.color }}>{props.text}</Text>
        </TouchableOpacity>
    );
};
