import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [homeName, setHomeName] = useState("");
  const [awayName, setAwayName] = useState("");

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const saved = await AsyncStorage.getItem("matches");
      if (saved) setMatches(JSON.parse(saved));
    } catch (error) {
      console.log("Error loading matches:", error);
    }
  };

  const saveMatches = async (newMatches) => {
    try {
      await AsyncStorage.setItem("matches", JSON.stringify(newMatches));
    } catch (error) {
      console.log("Error saving matches:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  };

  const addMatch = async () => {
    if (!homeName.trim() || !awayName.trim()) {
      Alert.alert("Enter team names first!");
      return;
    }

    const homeLogo = await pickImage();
    const awayLogo = await pickImage();

    if (!homeLogo || !awayLogo) {
      Alert.alert("Both teams need a logo!");
      return;
    }

    const newMatch = {
      id: Date.now().toString(),
      home: homeLogo,
      away: awayLogo,
      homeName: homeName.trim(),
      awayName: awayName.trim(),
      homeScore: "",
      awayScore: "",
    };

    const updated = [...matches, newMatch];
    setMatches(updated);
    saveMatches(updated);

    // clear inputs
    setHomeName("");
    setAwayName("");
  };

  const updateScore = (id, field, value) => {
    const updated = matches.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    setMatches(updated);
    saveMatches(updated);
  };

  const deleteMatch = (id) => {
    Alert.alert("Delete Match", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updated = matches.filter((m) => m.id !== id);
          setMatches(updated);
          saveMatches(updated);
        },
        style: "destructive",
      },
    ]);
  };

  const clearAllMatches = () => {
    Alert.alert("Clear All", "Remove all matches?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        onPress: async () => {
          setMatches([]);
          await AsyncStorage.removeItem("matches");
        },
        style: "destructive",
      },
    ]);
  };

  const renderMatch = ({ item }) => (
    <View style={styles.matchCard}>
      <View style={styles.teamBlock}>
        <Image source={{ uri: item.home }} style={styles.teamLogo} />
        <Text style={styles.teamName}>{item.homeName}</Text>
      </View>

      <TextInput
        style={styles.scoreInput}
        keyboardType="numeric"
        value={item.homeScore}
        onChangeText={(text) => updateScore(item.id, "homeScore", text)}
        placeholder="-"
      />

      <Text style={styles.vsText}>VS</Text>

      <TextInput
        style={styles.scoreInput}
        keyboardType="numeric"
        value={item.awayScore}
        onChangeText={(text) => updateScore(item.id, "awayScore", text)}
        placeholder="-"
      />

      <View style={styles.teamBlock}>
        <Image source={{ uri: item.away }} style={styles.teamLogo} />
        <Text style={styles.teamName}>{item.awayName}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteMatch(item.id)}
      >
        <Text style={styles.deleteText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <TextInput
          style={styles.nameInput}
          placeholder="Home Team"
          value={homeName}
          onChangeText={setHomeName}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="Away Team"
          value={awayName}
          onChangeText={setAwayName}
        />
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.addBtn} onPress={addMatch}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={clearAllMatches}>
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderMatch}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9f8", padding: 5 },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 8,
    marginTop: 3,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0c5702",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  addBtn: {
    backgroundColor: "#0c5702",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  addBtnText: { color: "#f8f9f8", fontSize: 18, fontWeight: "bold" },
  clearBtn: {
    backgroundColor: "#b31616",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  clearBtnText: { color: "#f8f9f8", fontWeight: "bold", fontSize: 10 },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#f8f9f8",
    padding: 15,
    marginVertical: 6,
    borderRadius: 26,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 3,
    position: "relative",
    borderWidth: 1,
    borderColor: "#58a44e",
  },
  teamBlock: { alignItems: "center", width: 80 },
  teamLogo: { width: 50, height: 50, borderRadius: 25, marginBottom: 4 },
  teamName: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  vsText: { fontSize: 16, fontWeight: "bold", color: "#0c5702" },
  deleteBtn: { position: "absolute", top: 5, right: 10 },
  deleteText: { fontSize: 16, color: "#b31616" },
  scoreInput: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: "#0c5702",
    borderRadius: 6,
    textAlign: "center",
    marginHorizontal: 5,
    padding: 0,
    backgroundColor: "#fff",
  },
});