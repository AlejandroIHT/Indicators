import React from 'react';
import { View, Text, SafeAreaView, SectionList, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SerieItem from '../components/SerieItem';
import Chart from '../components/Chart';
import Http from '../libs/http';
import Colors from '../res/colors';
import 'intl';
import 'intl/locale-data/jsonp/en';

class IndicatorDetailScreen extends React.Component {
    state = {
        loading: false,
        data: {
            serie: []
        },
    };

    componentDidMount() {
        const {indicator} = this.props.route.params;
        this.props.navigation.setOptions({title: indicator[0].toUpperCase()});
        this.setState({ loading: true });
        this.getIndicator(indicator);
    };

    getSections = (data) => {
        const sections = [
          {
            title: 'Nombre',
            data: [`${data.nombre}`],
          },
          {
            title: 'Unidad de medida',
            data: [`${data.unidad_medida}`],
          },
        ];
    
        return sections;
    };

    getIndicator = async (indicator) => {
        if (!this.state.loading) {
            this.setState({ loading: true })
        }
        const res = await Http.instance.get(`https://mindicador.cl/api/${indicator[1].codigo}`);
        this.setState({
            loading: false,
            data: res
        })
    };

    getLabels = (e) => {
        if(e.length !== 0) {
            let labels = e.map(element => {
                return element.fecha.substring(0, 10).substring(5, 10);
            });

            return labels.splice(0, 6).reverse();
        }

        return [""];
    };

    getPrice = (e) => {
        if(e.length !== 0) {
            let arrayPrice = e.map(element => {
                return parseInt(Intl.NumberFormat().format(element.valor));
            });

            return arrayPrice.splice(0, 6).reverse();
        }

        return [0];
    };

    render() {
        const { data, loading } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.scrollView}>
                    {loading ? (
                        <ActivityIndicator color={Colors.bluePrimary} size="large" />
                    ) : null}
                    <SectionList 
                        style={styles.section}
                        sections={this.getSections(data)}
                        ListHeaderComponent={
                            <>
                                <View style={styles.containerTitle}>
                                    <Text style={styles.seriesTitle}>Series</Text>
                                </View>
                                <FlatList
                                    style={styles.listStyle}
                                    horizontal={true}
                                    data={data.serie}
                                    keyExtractor={(item) => item.fecha}
                                    renderItem={({item}) => <SerieItem item={item} unid={data.unidad_medida} />}
                                />
                                <Chart labels={this.getLabels(data.serie)} values={this.getPrice(data.serie)} />
                            </>
                        }
                        keyExtractor={(item) => item.title}
                        renderItem={({item}) => (
                            <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                            </View>
                        )}
                        renderSectionHeader={({section}) => (
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>{section.title}</Text>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    };
};

export default IndicatorDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        backgroundColor: Colors.white,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        height: 140,
    },
    sectionHeader: {
        backgroundColor: Colors.blueOpacity,
        marginLeft: 16,
        marginRight: 16,
        padding: 8,
        borderRadius: 8,
    },
    sectionItem: {
        marginLeft: 16,
        marginRight: 16,
        padding: 8,
        paddingBottom: 16,
    },
    itemText: {
        color: Colors.gray,
        fontSize: 14,
    },
    sectionText: {
        color: Colors.bluePrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerTitle: {
        backgroundColor: Colors.blueOpacity,
        margin: 16,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 8,
    },
    seriesTitle: {
        color: Colors.bluePrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    listStyle: {
        maxHeight: 100,
        marginLeft: 16,
    },
})