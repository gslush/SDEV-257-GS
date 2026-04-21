import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/films')
      .then((res) => res.json())
      .then((json) => setFilms(json.result))
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
            {films.map((item) => (
              <Swipeable key={item.uid} renderRightActions={renderRightActions}onSwipeableOpen={() => Alert.alert("Film Title", item.properties.title)}>
                <View style={styles.itemContainer}>
                  <Text style={styles.title}>{item.properties.title}</Text>
                  <Text>Episode: {item.properties.episode_id}</Text>
                </View>
              </Swipeable>
            ))}
          </ScrollView>
        )}
      </View>
    </GestureHandlerRootView>
  );
}