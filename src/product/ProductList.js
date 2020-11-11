import React, { useState, useEffect} from "react";
import styles from "../styles";
import ProductAdd from "./ProductAdd";

import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Icon, Fab } from "native-base";

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';
// import {config} from './firebase_config';

export default function ProductList() {

  const [selected, setSelected] = useState(null); //必須要放 function 裡面
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item, index }) => {
    const backgroundColor = index === selected ? "#f9c2ff" : "#00ffff";

    return (
      <TouchableOpacity
        onPress={() => setSelected(index)}
        style={[styles.item, { backgroundColor }]}
      >
        <Text style={styles.title}>{item.desc}</Text>
        <Text style={styles.content}>{item.price}</Text>
        <Text style={styles.content}>/{index}</Text>
      </TouchableOpacity>
    );
  };

  function hide(){
    setSelectedId("");
    setModalVisible(false);
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function readData(){
    const newProducts=[];
    try {
      const querySnapshot = await db.collection("product").get();
      querySnapshot.forEach((doc) => {
        const newProduct = {
          desc:doc.data().desc,
          price:doc.data().price
        }
        newProducts.push(newProduct);
      });//foreach
       setProducts(newProducts);
       setIsLoading(false);
    }
    catch(e){console.log(e);}
  }//readData

  useEffect(()=>{
    readData();
  },[modalVisible]);

  function update(newProduct) {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ?
        <View style={styles.loading}>
          <ActivityIndicator color="red" size="large" animating={isLoading} />
        </View>
        :
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.desc}
        ></FlatList>
      }
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ProductAdd update={update} />

            <TouchableHighlight
              style={styles.hideButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Fab onPress={() => setModalVisible(true)}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>
    </SafeAreaView>
  );
}
