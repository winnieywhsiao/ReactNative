import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Icon, Fab} from 'native-base';
import axios from 'axios';

import styles from '../styles';

const Stack = createStackNavigator();

export default function PersonList() {
  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  } 
  

  return (
    <View style={styles.memocontainer}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '備忘錄',
            headerStyle: {
              backgroundColor: '#000',
              height: 70,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              // alignSelf: 'center'
            },
          }}
        />
      </Stack.Navigator>
    </View>
 );
}