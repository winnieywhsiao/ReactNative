import React, { useState } from "react";
import {  Button, TextInput,  Modal} from "react-native";
import styles from "../styles";
import axios from 'axios';
import {axios_config, url} from './config';

export default function ProductAdd(props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");

  async function sendData () {
      const newPerson={
        fields:{
          Name:name,
          City:city,
          Age:parseInt(age)
        }
      }

      try {
      	const result = await axios.post(url, newPerson, axios_config);
      	console.log(result);
      	//setPersons(result.data.records);
      	props.update();
      }
      catch (e){
        console.log("error:"+e);
      }
  }

  function update() {
    sendData();
  }

  return (
    <Modal visible={props.modalVisible}>
      <TextInput placeholder="姓名" value={name} onChangeText={text=>setName(text)}/>
      <TextInput placeholder="城市" value={city} onChangeText={text=>setCity(text)}/>
      <TextInput placeholder="年齡" value={age} onChangeText={text=>setAge(text)}/>
      <Button onPress={update} title="新增"/>
    </Modal>
  );
}
