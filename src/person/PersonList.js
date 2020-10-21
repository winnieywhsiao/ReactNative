import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {Icon, Fab} from 'native-base';
import axios from 'axios';

import styles from '../styles';

export default function PersonList() {
  const axios_config = {
     headers: {'Authorization': 'Bearer key5hoPQlXIf5ig6M'}
    };

  const list_url="https://api.airtable.com/v0/app01RLxJzljyl9e3/Table%201?maxRecords=3&view=Grid%20view";

  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{index}</Text>
      <Text style={styles.title}>{item.fields.Name}</Text>
      <Text>{item.fields.City},</Text>
      <Text>{item.fields.Age}</Text>
    </View>
  );

  async function fetchData () {
      const result = await axios.get(list_url,axios_config);
      setPersons(result.data.records);
      setIsLoading(!isLoading);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
  <View style={styles.container}>
    {isLoading &&
      <View style={styles.loading}>
       <ActivityIndicator color="red" size="large" animating={isLoading} />
      </View>
    }
    {!isLoading &&
      <FlatList 
        data={persons} 
        renderItem = {renderItem}
        keyExtractor={(item, index) => ""+index}
        >
      </FlatList>
    }
  </View>
 );
}