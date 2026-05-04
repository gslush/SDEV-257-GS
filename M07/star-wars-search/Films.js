import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image, Alert, TextInput } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/films')
      .then((res) => res.json())
      .then((json) => {
        const data = json.result;
        setFilms(data);
        setFilteredFilms(data); 
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
  
  const filtered = films.filter((item) =>
      item.properties.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFilms(filtered);
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
            placeholder="Search films..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>
        <Image 
          source={{ uri: 'https://static.wikia.nocookie.net/starwars/images/c/cc/Star-wars-logo-new-tall.jpg/revision/latest?cb=20190313021755' }} 
          style={styles.headerImage} 
        />
        {isLoading ? <ActivityIndicator size="large" /> : (
          <ScrollView style={{ width: '100%' }}>
            {filteredFilms.map((item) => (
              <Swipeable key={item.uid} renderRightActions={renderRightActions} onSwipeableOpen={() => Alert.alert("Film Info", item.properties.title)}>
                <Pressable>
                  {({ pressed }) => (
                    <View style={styles.itemContainer}>
                      <Text style={[styles.title, pressed && styles.titleBold]}>
                        {item.properties.title}
                      </Text>
                      <Text>Episode: {item.properties.episode_id}</Text>
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