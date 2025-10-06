import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Prices() {
  const [prizes, setPrizes] = useState([]);
  const [place, setPlace] = useState("");
  const [reward, setReward] = useState("");

  useEffect(() => {
    const loadPrizes = async () => {
      const saved = await AsyncStorage.getItem("prizes");
      if (saved) setPrizes(JSON.parse(saved));
    };
    loadPrizes();
  }, []);

  const savePrizes = async (data) => {
    setPrizes(data);
    await AsyncStorage.setItem("prizes", JSON.stringify(data));
  };

  const addPrize = () => {
    if (!place || !reward) return;

    const newPrize = {
      id: Date.now().toString(),
      place,
      reward,
    };

    const updated = [...prizes, newPrize];
    savePrizes(updated);
    setPlace("");
    setReward("");
  };

  const deletePrize = (id) => {
    const updated = prizes.filter((p) => p.id !== id);
    savePrizes(updated);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8f9f8" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Tournament Prizes</Text>

          <View style={styles.form}>
            <TextInput
              value={place}
              onChangeText={setPlace}
              placeholder="Enter place (e.g. 1st Place)"
              style={styles.input}
              placeholderTextColor="#777"
            />
            <TextInput
              value={reward}
              onChangeText={setReward}
              placeholder="Enter reward (e.g. Gold Trophy)"
              style={styles.input}
              placeholderTextColor="#777"
            />
            <TouchableOpacity style={styles.addBtn} onPress={addPrize}>
              <Ionicons name="add-circle" size={22} color="#fff" />
              <Text style={styles.btnText}>Add Prize</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={prizes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Ionicons name="trophy" size={22} color="#9f0703" />
                <View style={styles.textContainer}>
                  <Text style={styles.place}>{item.place}</Text>
                  <Text style={styles.reward}>{item.reward}</Text>
                </View>
                <TouchableOpacity onPress={() => deletePrize(item.id)}>
                  <Ionicons name="trash" size={18} color="#9f0703" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 30 }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#9f0703",
    marginBottom: 18,
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#a5da64",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: width * 0.04,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9f0703",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    maxWidth: 150,
    alignSelf: "center",
    marginTop: 5,
  },
  btnText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "500",
    fontSize: width * 0.04,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#3c9c10",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  place: {
    fontSize: width * 0.045,
    fontWeight: "400",
    color: "#222",
  },
  reward: {
    fontSize: width * 0.04,
    color: "#666",
  },
});
