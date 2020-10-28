import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {Icon, Fab} from 'native-base';
import axios from 'axios';

import PersonAdd from './PersonAdd';
import styles from '../styles';
import {axios_config, url} from './config';

export default function PersonList() {
  const get_url = url+"?maxRecords=50&view=Grid%20view";

  const [persons, setPersons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData () {
      const result = await axios.get(get_url,axios_config);
      setPersons(result.data.records);
      setIsLoading(!isLoading);
  }

  useEffect(() => {
    fetchData();
  },[modalVisible]);

  function update(){
    setModalVisible(false);
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{index}</Text>
      <Text style={styles.title}>{item.fields.Name}</Text>
      <Text>{item.fields.City},</Text>
      <Text>{item.fields.Age}</Text>
    </View>
  );

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
    <Fab onPress={()=>setModalVisible(true)}>
      <Icon ios='ios-add' android="md-add"/>
    </Fab>
    <PersonAdd modalVisible = {modalVisible} update={update}/>
  </View>
 );
}