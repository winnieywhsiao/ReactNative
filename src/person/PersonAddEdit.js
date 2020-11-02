import React, { useState, useEffect } from "react";
import {  Button, TextInput,  Modal} from "react-native";
import styles from "../styles";
import axios from 'axios';
import {axios_config, url} from './config';

export default function ProductAdd(props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");

  useEffect(()=>{
    setName(props.person.Name);
    setCity(props.person.City);
    setAge(""+props.person.Age);
  },[props.id]);

  function update() {
    async function sendData () {
      // if id exists, assign a newPerson with id, else assign a newPerson without id
      const newPerson = props.id 
      ?{records:[{
        id: props.id,
        fields:{
          Name:name,
          City:city,
          Age:parseInt(age)
        }}]
      }
      :{fields:{
        Name:name,
        City:city,
        Age:parseInt(age)
      }}

      try {
      // if id exists, call put, else call post      
      const result = props.id
        ?await axios.put(url,newPerson, axios_config)
        :await axios.post(url,newPerson, axios_config);
      props.hide();}
      catch (e){
        console.log("error:"+e);
      }
    }
    sendData();
  }

  return (
    <Modal visible={props.modalVisible}>
      <TextInput placeholder="姓名" value={name} onChangeText={text=>setName(text)}/>
      <TextInput placeholder="城市" value={city} onChangeText={text=>setCity(text)}/>
      <TextInput placeholder="年齡" value={age} onChangeText={text=>setAge(text)}/>
      <Button onPress={update} title="確定"/>
      <Button onPress={props.hide} title="取消"/>
    </Modal>
  );
}
