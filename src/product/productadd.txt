import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  TouchableHighlight,
  Text,
} from "react-native";
import styles from "../styles";

export default function ProductAdd(props) {
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  function update() {
    props.update({ desc, price });
  }

  return (
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
        onPress={update}
      >
        <Text style={styles.textStyle}>新增</Text>
      </TouchableHighlight>
    </View>
  );
}
