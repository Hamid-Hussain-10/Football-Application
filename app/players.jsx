import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <Ionicons name="trash" size={18} color="#b31616" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Player Name"
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TouchableOpacity onPress={addPlayer} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Players</Text>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#ccc",
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: "#0c5702",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  playerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 50,
    width: "100%",
  },
  playerText: {
    fontSize: 14,
  },
  deleteBtn: {
    padding: 5,
  },
});
