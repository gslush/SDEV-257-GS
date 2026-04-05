import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/films')
      .then((response) => response.json())
      .then((json) => {
        setFilms(json.result); 
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large"/>
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontSize: 18 }}>{item.properties.title}</Text>
              <Text>Episode: {item.properties.episode_id}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}