import React, {useState} from 'react';
import {Button, View, Text, TextInput } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
import styles from '../styles';

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); //for error message from signUp
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  async function signUp(){
    try {
      const res = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({displayName: displayName});
      //console.log('User registered successfully!');
      setDisplayName('');
      setEmail('');
      setPassword('');
      setMessage('');
    }
    catch(error){
      setMessage(error.message);
    }
  }

  return(
    <View style={styles.form}>  
      <TextInput
        style={styles.inputStyle}
        placeholder="姓名"
        value={displayName}
        onChangeText={text=>setDisplayName(text)}
      />      
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
        title="註冊"
        onPress={signUp}
      />

      <Text>{message}</Text>
      <Button title="已經註冊，我要登入" />
    </View>
  )
}