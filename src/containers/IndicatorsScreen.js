import React from 'react';
import {View, Text, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, StyleSheet} from 'react-native';
import IndicatorItem from '../components/IndicatorItem';
import Http from '../libs/http';
import Colors from '../res/colors';

class IndicatorsScreen extends React.Component {
    state = {
        loading: false,
        refreshing: false,
        indicators: []
    }

    componentDidMount() {
        this.getIndicators();
        console.log(this.state.indicators);
    };

    getIndicators = async () => {
        if (!this.state.loading) {
            this.setState({ loading: true })
        }
        const res = await Http.instance.get('https://mindicador.cl/api');

        this.setState({
            loading: false,
            refreshing: false,
            indicators: Object.entries(res)
        })
    };

    handlePress = (indicator) => {
        this.props.navigation.navigate('IndicatorDetail', {indicator});
      };

    handleRefresh = () => {
        this.setState({ refreshing: true }, () => this.getIndicators());
    };

    render() {
        const { loading, refreshing, indicators } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerTitles}>
                    <View style={styles.containerCode}>
                        <Text style={styles.text}>Código</Text>
                    </View>
                    <View style={styles.containerUnid}>
                        <Text style={styles.text}>Unidad</Text>
                    </View>
                    <View style={styles.containerValue}>
                        <Text style={styles.text}>Valor</Text>
                    </View>
                </View>
                <FlatList 
                    data={indicators}
                    refreshing={refreshing}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh}
                        progressBackgroundColor={Colors.lightBlue}
                    />
                    }
                    keyExtractor={(item) => item[0]}
                    ListHeaderComponent={
                    <>
                        {loading ? (
                        <ActivityIndicator
                            color={Colors.darkBlue}
                            size="large"
                        />
                        ) : null}
                    </>
                    }
                    renderItem={({item}) => (
                        <IndicatorItem item={item} onPress={() => this.handlePress(item)} />
                    )}
                />
            </SafeAreaView>
        );
    };
}

export default IndicatorsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    containerTitles: {
        flexDirection: "row",
        margin: 16,
    },
    containerCode: {
        width: '45%',
    },
    containerUnid: {
        width: '25%',
    },
    containerValue: {
        width: '30%',
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.lightGray
    }
})