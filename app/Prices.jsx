import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

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
    <View style={styles.container}>
      <Text style={styles.header}>Tournament Prizes</Text>

      <View style={styles.form}>
        <TextInput
          value={place}
          onChangeText={setPlace}
          placeholder="Enter place (e.g. 1st Place)"
          style={styles.input}
        />
        <TextInput
          value={reward}
          onChangeText={setReward}
          placeholder="Enter reward (e.g. Gold Trophy)"
          style={styles.input}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9f8", padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#9f0703",
    marginBottom: 16,
    textAlign: "center",
  },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9f0703",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  btnText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "space-between",
  },
  textContainer: { marginLeft: 10, flex: 1 },
  place: { fontSize: 16, fontWeight: "bold", color: "#333" },
  reward: { fontSize: 14, color: "#666" },
});
