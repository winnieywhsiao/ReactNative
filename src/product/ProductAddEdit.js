import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  TouchableHighlight,
  Text,
  Modal,
  SafeAreaView,
} from "react-native";
import styles from "../styles";

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function ProductAdd(props) {
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  useEffect(()=>{
    setDesc(props.product.desc);
    setPrice(props.product.price);
  },[props.id]);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  function renew() {
    async function sendData () {
      try {    
      const result = props.id
        ? update(props.id)
        : add()
      props.hide();}
      catch (e){
        console.log("error:"+e);
      }
    }
    sendData();
  }

  async function add() {
    try {
      const docRef = await db.collection("product").add({
        desc: desc,
        price: parseInt(price)
      });
      console.log(docRef.id);
    }
    catch(error) {
      console.error("Error adding document: ", error);
    }
  }

  async function update(id) {
    const docRef = await db.collection("product").doc(id).set({
      desc: desc,
      price: parseInt(price)
    })
    .then(function() {
      console.log("update success!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  async function deleteProduct(id){
    // console.log(id + " delete");
    await db.collection("product").doc(id).delete()
    .then(function() {
      props.hide();
      console.log("delete success!");
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  function showDeleteButton(){
    // console.log(props.id + " deleted");
    deleteProduct(props.id);
  }

  function cancel(){
    setDesc("");
    setPrice("");
    props.hide();
  }

  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalText}>
              <TextInput
                placeholder="產品說明"
                style={styles.inputStyle}
                value={desc}
                onChangeText={(text) => setDesc(text)}
              />
              <TextInput
                placeholder="價格"
                style={styles.inputStyle}
                value={price}
                onChangeText={(text) => setPrice(text)}
              />

              <TouchableHighlight
                style={styles.addButton}
                onPress={renew}
              >
                <Text style={styles.textStyle}>確定</Text>
              </TouchableHighlight>
              
              {props.id?
                <TouchableHighlight
                  style={styles.deleteButton}
                  onPress={showDeleteButton}
                >
                  <Text style={styles.textStyle}>刪除</Text>
                </TouchableHighlight>
                :
                <View />
              }
              
            </View>
            <TouchableHighlight
              style={styles.hideButton}
              onPress={cancel}
            >
              <Text style={styles.textStyle}>取消</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
