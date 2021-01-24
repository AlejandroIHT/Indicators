import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const Chart = ({ labels, values }) => {
    return (
        <View style={styles.container}>
            <LineChart 
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: values
                        }
                    ]
                }}
                width={Dimensions.get('window').width}
                height={320}
                yAxisSuffix='k'
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: '#FFF',
                    backgroundGradientFrom: '#FFF',
                    backgroundGradientTo: '#FFF',
                    decimalPlaces: 2,
                    color:(opacity = 0) => `rgba(0, 168, 0, ${opacity})`,
                    labelColor:(opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                }}
            />
        </View>
    );
};

export default Chart;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginTop: 40
    }
})