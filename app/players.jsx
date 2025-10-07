import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Players() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const savedPlayers = await AsyncStorage.getItem("players");
        if (savedPlayers) {
          setPlayers(JSON.parse(savedPlayers));
        }
      } catch (error) {
        console.log("Error loading players:", error);
      }
    };
    loadPlayers();
  }, []);

  const savePlayers = async (newPlayers) => {
    try {
      await AsyncStorage.setItem("players", JSON.stringify(newPlayers));
    } catch (error) {
      console.log("Error saving players:", error);
    }
  };

  const addPlayer = () => {
    if (playerName.trim() === "") return;
    const newPlayerList = [
      ...players,
      { id: Date.now().toString(), name: playerName },
    ];
    setPlayers(newPlayerList);
    savePlayers(newPlayerList);
    setPlayerName("");
  };

  const deletePlayer = (id) => {
    const newPlayers = players.filter((player) => player.id !== id);
    setPlayers(newPlayers);
    savePlayers(newPlayers);
  };

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerText}>🙎‍♂️ {item.name}</Text>
      <TouchableOpacity
        onPress={() => deletePlayer(item.id)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash" size={width * 0.045} color="#b31616" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Player Name"
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={addPlayer} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Players</Text>

      {/* Player List */}
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1.2,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.037,
    color: "#000",
    backgroundColor: "#fcf8f8",
  },
  addBtn: {
    marginLeft: width * 0.025,
    backgroundColor: "#0c5702",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  addBtnText: {
    fontSize: width * 0.035,
    color: "#fff",
    fontWeight: "500",
  },
  heading: {
    fontSize: width * 0.045,
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",
    marginBottom: height * 0.015,
  },
  listContainer: {
    paddingBottom: height * 0.1,
  },
  playerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f8f9f8",
    borderRadius: 8,
    marginBottom: height * 0.01,
  },
  playerText: {
    fontSize: width * 0.04,
    color: "#333",
  },
  deleteBtn: {
    padding: width * 0.015,
  },
});
