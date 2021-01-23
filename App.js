import React from 'react';
import { Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IndicatorsStack from './src/containers/IndicatorsStack';
import Colors from './src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: Colors.white,
          style: {
            backgroundColor: Colors.blue,
            borderTopWidth: 4,
            borderBottomWidth: 4,
            borderColor: Colors.blue,
            borderTopColor: Colors.blue,
            shadowColor: Colors.blue,
            shadowOffset: {
              width: 0,
              height: -6,
            },
            shadowRadius: 0,
            shadowOpacity: 1.0,
            elevation: 10,
          },
        }}
      >
        <Tabs.Screen 
          name="Indicadores"
          component={IndicatorsStack}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{tintColor: color, width: 20, height: 20}}
                source={require('Indicators/src/assets/coins.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
