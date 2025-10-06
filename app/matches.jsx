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
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

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
    if (!result.canceled) return result.assets[0].uri;
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
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
        contentContainerStyle={{ paddingBottom: height * 0.12 }}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9f8",
    paddingHorizontal: width * 0.03,
    paddingTop: height * 0.015,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.015,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0c5702",
    borderRadius: 8,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.03,
    backgroundColor: "#fff",
    marginHorizontal: width * 0.01,
    fontSize: width * 0.037,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
  },
  addBtn: {
    backgroundColor: "#0c5702",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.1,
    height: width * 0.1,
  },
  addBtnText: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  clearBtn: {
    backgroundColor: "#b31616",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 20,
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: width * 0.03,
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#f8f9f8",
    padding: height * 0.02,
    marginVertical: height * 0.008,
    borderRadius: 26,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#58a44e",
    elevation: 3,
    position: "relative",
  },
  teamBlock: {
    alignItems: "center",
    width: width * 0.22,
  },
  teamLogo: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    marginBottom: height * 0.004,
  },
  teamName: {
    fontSize: width * 0.033,
    fontWeight: "400",
    textAlign: "center",
  },
  vsText: {
    fontSize: width * 0.04,
    fontWeight: "500",
    color: "#0c5702",
  },
  scoreInput: {
    width: width * 0.1,
    height: height * 0.04,
    borderWidth: 1,
    borderColor: "#0c5702",
    borderRadius: 6,
    textAlign: "center",
    marginHorizontal: width * 0.02,
    paddingVertical: width * 0.02,
    backgroundColor: "#fff",
    fontSize: width * 0.04,
  },
  deleteBtn: {
    position: "absolute",
    top: height * 0.005,
    right: width * 0.03,
  },
  deleteText: {
    fontSize: width * 0.05,
    color: "#b31616",
    fontWeight: "bold",
  },
});
