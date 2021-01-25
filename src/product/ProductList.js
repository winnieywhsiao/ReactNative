import React, { useState, useEffect} from "react";
import styles from "../styles";
import ProductAdd from "./ProductAddEdit";

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

  const [selectedId, setSelectedId] = useState(null); //必須要放 function 裡面
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState({
    desc:"",
    price:null,
  });

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  useEffect(()=>{
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

    readData();
  },[modalVisible]);

  function hide(){
    setSelectedId("");
    setModalVisible(false);
  }

  function add(){
    console.log("add");
    setSelectedId("");
    setModalVisible(true);
  }

  function update(id){
    console.log("update index:" + id);

    async function getId(index){
      // console.log(products[index]); // object

      setProducts({
        desc:products[index].desc,
        price:products[index].price.toString(),
      });

      try {
        const ref = await db.collection("product").get();

        const docRefId = ref.docs[index].id;
        // console.log(docRefId);

        setSelectedId(docRefId);
        setModalVisible(true);
      } catch(e){console.log(e);}
    }getId(id);
  }

  const renderItem = ({ item, index }) => {
    const backgroundColor = index === selectedId ? "#f9c2ff" : "#00ffff";

    return (
      <TouchableOpacity
        onPress={() => update(index)}
        style={[styles.item, { backgroundColor }]}
      >
        <Text style={styles.title}>{item.desc}</Text>
        <Text style={styles.content}>{item.price}</Text>
        <Text style={styles.content}>/{index}</Text>
      </TouchableOpacity>
    );
  };

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
          keyExtractor={(item, index) => "" + index}
        ></FlatList>
      }
      
      <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>
      
      <ProductAdd 
        hide={hide}
        product = {products}
        id={selectedId}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
}
