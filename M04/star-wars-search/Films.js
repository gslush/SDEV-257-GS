import React, { useState } from "react";
import { View, Text, TextInput, Modal, Button } from "react-native";
import styles from "./styles";

export default function Films() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Films..."
          onChangeText={setSearchText}
          onSubmitEditing={() => setModalVisible(true)}
          value={searchText}
        />
      </View>

      <View style={styles.centerContainer}>
        <Text style={{ fontSize: 24 }}>Films</Text>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 15 }}>Search term: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}