import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image, Alert, TextInput } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [filteredSpaceships, setFilteredSpaceships] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/starships')
      .then((res) => res.json())
      .then((json) => {
        setSpaceships(json.results);
        setFilteredSpaceships(json.results); 
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
  
  const filtered = spaceships.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSpaceships(filtered);
  };

  const renderRightActions = () => (
    <View style={styles.swipeAction}><Text style={styles.swipeText}>Info</Text></View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search starships..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>
        <Image 
          source={{ uri: 'https://nortenews.org/wp-content/uploads/2022/09/ISD-1-SV.webp' }} 
          style={styles.headerImage} 
        />
        {isLoading ? <ActivityIndicator size="large" /> : (
          <ScrollView style={{ width: '100%' }}>
            {filteredSpaceships.map((item) => (
              <Swipeable key={item.uid} renderRightActions={renderRightActions} onSwipeableOpen={() => Alert.alert("Starship Info", item.name)}>
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