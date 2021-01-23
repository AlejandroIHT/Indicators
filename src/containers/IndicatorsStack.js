import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IndicatorsScreen from './IndicatorsScreen';
import IndicatorDetailScreen from './IndicatorDetailScreen';
import Colors from '../res/colors';

const Stack = createStackNavigator();

const IndicatorsStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: Colors.white,
          },
          headerTintColor: Colors.bluePrimary,
        }}>
        <Stack.Screen name="Indicators" component={IndicatorsScreen} />
        <Stack.Screen name="IndicatorDetail" component={IndicatorDetailScreen} />
      </Stack.Navigator>
    );
  };
  
  export default IndicatorsStack;