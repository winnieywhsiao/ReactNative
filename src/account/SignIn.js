import React, {useState, useContext} from 'react';
import {Button, View, Text, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

import {AuthContext} from '../account/AuthContext';
import styles from '../styles';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const authContext = useContext(AuthContext);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  async function signIn(){
    try {
      const res= firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('User login successfully!');
          setEmail('');
          setPassword('');
          setMessage('');
        })
        authContext.setStatus(true); //呼叫App的setIsSignedIn
    }
    catch(error){
      setMessage(error.message);
    } 
  };

  async function checkAuthChange(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        Alert.alert(
          "登入",
          "登入成功",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      } else {
        console.log("Need to SignUp");
      }
    });
  }

  return(
    <View style={styles.form}>  
      <TextInput
        style={styles.inputStyle}
        placeholder="電子信箱"
        value={email}
        onChangeText={text=>setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="密碼"
        value={password}
        onChangeText={text=>setPassword(text)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <Button
        title="登入"
        onPress={signIn}
      />
      <Text>{message}</Text>
      <Button title="尚未註冊，我要註冊" />
    </View>
  )
}