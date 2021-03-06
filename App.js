import React, {useState} from 'react';
import { Button, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from './src/account/SignIn';
import SignUp from './src/account/SignUp';
import SignOut from './src/account/SignOut';
import {AuthContext} from './src/account/AuthContext';
import ProductList from "./src/product/ProductList";
import PersonList from "./src/person/PersonList";
import ImageUpload from './src/storage/ImageUpload';
import TodoList from './src/component/TodoList';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './src/store/reducer'


const store = createStore(reducer)

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('備忘錄')}
        title="Go to lists"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    // Provider管理store
    <Provider store={store}>
      <NavigationContainer>
        <AuthContext.Provider value={{isSignedIn: isSignedIn, setStatus:setIsSignedIn}}>
          <Drawer.Navigator initialRouteName="登入">
            {isSignedIn?(
              <>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="ProductList" component={ProductList} />
              <Drawer.Screen name="PersonList" component={PersonList} />
              <Drawer.Screen name="Notifications" component={NotificationsScreen} />
              <Drawer.Screen name="Image" component={ImageUpload} />
              <Drawer.Screen name="登出" component={SignOut} />
              </>
            )
            :(
              <>
              {/* <Drawer.Screen name="登入" component={SignIn} />
              <Drawer.Screen name="註冊" component={SignUp} /> */}
              <Drawer.Screen name="ProductList" component={ProductList} />
              {/* <Drawer.Screen name="TodoList" component={TodoList} /> */}
              </>
            )
            }
          </Drawer.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </Provider>
  );
}