import React, { useState, useEffect } from "react";
import { View, StatusBar, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import styles from "./styles";

StatusBar.setBarStyle("dark-content");

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      setHasPermission(true);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        showsPointsOfInterest={false}
        showsUserLocation={hasPermission} 
        followUserLocation={hasPermission}
      >
        <Marker
          title="Jaggers"
          description="Fresh Means Fresh"
          coordinate={{ latitude: 40.0003800312989, longitude: -86.00136268319507 }}
        />
      </MapView>
    </View>
  );
}