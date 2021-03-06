import React, { useState } from "react";
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

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function add() {
    try {
      const docRef = await db.collection("product").add({
        desc: desc,
        price: parseInt(price)
      });
      console.log(docRef.id);
      setDesc("");
      setPrice("");
      props.hide();
    }
    catch(error) {
      console.error("Error adding document: ", error);
    }
  }

  function cancel(){
    setDesc("");
    setPrice("");
    props.hide();
  }

  return (
    <SafeAreaView >
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
                onPress={add}
              >
                <Text style={styles.textStyle}>新增</Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              style={styles.hideButton}
              onPress={cancel}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
