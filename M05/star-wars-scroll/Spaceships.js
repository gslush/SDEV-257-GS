import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/starships")
      .then((response) => response.json())
      .then((json) => {
        setSpaceships(json.results);
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
          data={spaceships}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}