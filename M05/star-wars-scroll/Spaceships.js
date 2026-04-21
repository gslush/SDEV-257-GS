import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/starships')
      .then((res) => res.json())
      .then((json) => setSpaceships(json.results))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const renderRightActions = () => (
    <View style={styles.swipeAction}><Text style={styles.swipeText}>Info</Text></View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator size="large" /> : (
          <ScrollView style={{ width: '100%' }}>
            {spaceships.map((item) => (
              <Swipeable key={item.uid} renderRightActions={renderRightActions}onSwipeableOpen={() => Alert.alert("Starship Info", item.name)}>
                <View style={styles.itemContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </Swipeable>
            ))}
          </ScrollView>
        )}
      </View>
    </GestureHandlerRootView>
  );
}