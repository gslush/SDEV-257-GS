import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Platform, SafeAreaView } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import styles from './styles';
import Home from "./Planets";
import News from "./Films";
import Settings from "./Spaceships";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!isConnected && (
        <SafeAreaView style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </SafeAreaView>
      )}

      <NavigationContainer>
      {Platform.OS === 'ios' && (
        <Tab.Navigator>
          <Tab.Screen name="Planets" component={Home} />
          <Tab.Screen name="Films" component={News} />
          <Tab.Screen name="Spaceships" component={Settings} />
        </Tab.Navigator>
      )}

      {Platform.OS == 'android' && (
        <Drawer.Navigator useLegacyImplementation={false}>
          <Drawer.Screen name="Planets" component={Home} />
          <Drawer.Screen name="Films" component={News} />
          <Drawer.Screen name="Spaceships" component={Settings} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
    </View>
  );
}