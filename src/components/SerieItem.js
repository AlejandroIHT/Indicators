import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../res/colors';

const SerieItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerValue}>
                <View style={styles.containerIcon}>
                    <Image style={styles.icon} source={require('Indicators/src/assets/money.png')} />
                </View>
                <Text style={styles.textValue}>{`${Intl.NumberFormat().format(item.valor)}`}</Text>
            </View>
            <Text style={styles.text}>{`${item.fecha.substring(0, 10)}`}</Text>
        </View>
    );
};

export default SerieItem;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingRight: 24,
        paddingLeft: 24,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 8,
        backgroundColor: Colors.white,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 4,   
    },
    containerValue: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    containerIcon: {
        backgroundColor: Colors.greenLight,
        padding: 4,
        marginRight: 4,
        borderRadius: 20
    },
    icon: {
        width: 10,
        height: 10,
        tintColor: Colors.green
    },
    textValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.green
    },
    text: {
        color: Colors.gray
    }
});