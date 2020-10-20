import React, { useState } from "react";
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
} from "react-native";

import { Icon, Fab } from "native-base";

/*
const data = [
  {
    name: "iPhone 7",
    price: 12000,
    category: "phone",
    inventory: 1000,
    safetyStock: 100,
  },
  {
    name: "iPhone 8",
    price: 10000,
    category: "phone",
    inventory: 900,
    safetyStock: 100,
  },
  {
    name: "iPhone X",
    price: 20000,
    category: "phone",
    inventory: 1000,
    safetyStock: 100,
  },
];
*/

export default function ProductList() {
  const [selected, setSelected] = useState(null); //必須要放 function 裡面
  const [products, setProducts] = useState([
    { desc: "iPad", price: 20000 },
    { desc: "iPhone X", price: 30000 },
  ]);
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

  function update(newProduct) {
    // setState 可以給 value 或 callback function
    setProducts((oldProducts) => [...oldProducts, newProduct]); //此為一個callback function
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.desc}
      ></FlatList>

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
