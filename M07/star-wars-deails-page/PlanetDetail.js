import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import styles from './styles';

export default function PlanetDetail({ route, navigation }) { 
  const { uid } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetch(`https://www.swapi.tech/api/planets/${uid}`)
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((json) => {
      if (json.result && json.result.properties) {
        setData(json.result.properties);
      }
    })
    .catch((err) => console.error("Fetch error:", err))
    .finally(() => setLoading(false));
}, [uid]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.detailContainer}>
      {data && (
        <>
          <View style={styles.detailHeader}>
            <Text style={styles.detailName}>{data.name}</Text>
          </View>
          
          <View style={styles.detailCard}>
            <DetailRow label="Climate" value={data.climate} />
            <DetailRow label="Terrain" value={data.terrain} />
            <DetailRow label="Population" value={data.population} />
            <DetailRow label="Gravity" value={data.gravity} />
            <DetailRow label="Diameter" value={`${data.diameter}km`} />
            <DetailRow label="Rotation" value={data.rotation_period} />
          </View>
          <Pressable 
            style={[styles.backButton, { alignSelf: 'center', marginBottom: 30 }]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← BACK TO PLANETS</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);