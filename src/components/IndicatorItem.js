import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Colors from '../res/colors';

const IndicatorItem = ({ item, onPress }) => {
    if(item[0] === "version" ||
        item[0] === "fecha" ||
        item[0] === "autor") return null;

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.containerTitle}>
                <View>
                    <Text style={styles.title}>{item[0].toUpperCase()}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>{item[1].nombre}</Text>
                </View>
            </View>
            <View style={styles.containerUnid}>
                <View style={styles.containerUnidIcons}>
                    <View style={item[1].unidad_medida === 'Porcentaje' ? styles.containerIconPercent : styles.containerIcon}>
                        {item[1].unidad_medida === 'Porcentaje' && <Image style={styles.iconPercent} source={require('Indicators/src/assets/percent.png')} />}
                        {(item[1].unidad_medida === 'Pesos' || item[1].unidad_medida === 'Dólar') && <Image style={styles.icon} source={require('Indicators/src/assets/money.png')} />}
                    </View>
                    <Text style={item[1].unidad_medida === 'Porcentaje' ? styles.unidPercent  : styles.unid}>{item[1].unidad_medida}</Text>
                </View>
            </View>
            <View style={styles.containerValue}>
                <View style={styles.containerColor}>
                    {(item[1].unidad_medida === 'Pesos' || item[1].unidad_medida === 'Dólar') && <Text style={styles.value}>{`$${Intl.NumberFormat().format(item[1].valor)}`}</Text>}
                    {item[1].unidad_medida === 'Porcentaje' && <Text style={styles.value}>{`${item[1].valor}%`}</Text>}
                </View>
            </View>
        </Pressable>
    );
};

export default IndicatorItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        marginTop: 8,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.1)"
    },
    containerTitle: {
        flexDirection: "column",
        width: '45%',
        paddingRight: 8
    },
    containerUnid: {
        width: '25%',
        paddingRight: 8,
        justifyContent: 'center'
    },
    containerUnidIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerValue: {
        width: '30%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    title: {
        color: Colors.gray,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4
    },
    subtitle: {
        fontSize: 14,
        color: Colors.gray,
    },
    containerIcon: {
        backgroundColor: Colors.greenLight,
        padding: 4,
        marginRight: 4,
        borderRadius: 20
    },
    containerIconPercent: {
        backgroundColor: Colors.blueOpacity,
        padding: 4,
        marginRight: 4,
        borderRadius: 20
    },
    icon: {
        width: 10,
        height: 10,
        tintColor: Colors.green
    },
    iconPercent: {
        width: 10,
        height: 10,
        tintColor: Colors.bluePrimary
    },
    unid: {
        color: Colors.green,
        fontWeight: 'bold'
    },
    unidPercent: {
        color: Colors.bluePrimary,
        fontWeight: 'bold'   
    },
    containerColor: {
        backgroundColor: Colors.blueOpacity,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 8
    },
    value: {
        color: Colors.bluePrimary,
        fontWeight: 'bold'
    }
});