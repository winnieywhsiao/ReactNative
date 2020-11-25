import React, {useState, useContext} from 'react';
import {Button, View, Text } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

import {AuthContext} from '../account/AuthContext';
import styles from '../styles';

export default function SignOut() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [message, setMessage] = useState("");
  const authContext = useContext(AuthContext);

  async function signOut(){
    try{
      await firebase.auth().signOut() 
        .then((res) => {
          console.log('User signed out successfully!'); 
      })
      authContext.setStatus(false);
    }
    catch(error){
      setMessage(error.message);
    }
  };

  return(
    <View style={styles.form}>  
      <Text>{message}</Text>      
      <Button
        title="登出"
        onPress={signOut}
      />
      <Text>{message}</Text>
      <Text>
        我要登入
      </Text>                          
    </View>
  )
}