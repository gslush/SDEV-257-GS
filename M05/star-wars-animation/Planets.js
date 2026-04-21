import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Pressable } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/planets')
      .then((res) => res.json())
      .then((json) => setPlanets(json.results))
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
            {planets.map((item) => (
              <Swipeable key={item.uid} renderRightActions={renderRightActions} onSwipeableOpen={() => Alert.alert("Planet Info", item.name)}>
                <Pressable>
                  {({ pressed }) => (
                    <View style={styles.itemContainer}>
                      <Text style={[styles.title, pressed && styles.titleBold]}>
                        {item.name}
                      </Text>
                    </View>
                  )}
                </Pressable>
              </Swipeable>
            ))}
          </ScrollView>
        )}
      </View>
    </GestureHandlerRootView>
  );
}