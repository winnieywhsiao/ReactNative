import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {Icon, Fab} from 'native-base';
import styles from '../styles';

export default function PersonList() {
  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{index}</Text>
      <Text style={styles.title}>{item.Name}</Text>
      <Text>{item.City},</Text>
      <Text>{item.Age}</Text>
    </View>
  );

  const [persons, setPersons] = useState([
    {Name: "Ben", City:"Taipei", Age:16},
    {Name: "Cathy", City:"Taipei", Age:26}
  ]);

  return (
   <View style={styles.container}>
    <FlatList 
      data={persons} 
      renderItem = {renderItem}
      keyExtractor={(item, index) => ""+index}
      >
    </FlatList>
   </View>
 );
}