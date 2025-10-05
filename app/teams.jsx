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

export default function Teams() {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const savedTeams = await AsyncStorage.getItem("teams");
        if (savedTeams) {
          setTeams(JSON.parse(savedTeams));
        }
      } catch (error) {
        console.log("Error loading teams:", error);
      }
    };
    loadTeams();
  }, []);

  const saveTeams = async (newTeams) => {
    try {
      await AsyncStorage.setItem("teams", JSON.stringify(newTeams));
    } catch (error) {
      console.log("Error saving teams:", error);
    }
  };

  const addTeam = () => {
    if (teamName.trim() === "") return;
    const newTeams = [...teams, { id: Date.now().toString(), name: teamName }];
    setTeams(newTeams);
    saveTeams(newTeams);
    setTeamName("");
  };

  const deleteTeam = (id) => {
    const newTeams = teams.filter((team) => team.id !== id);
    setTeams(newTeams);
    saveTeams(newTeams);
  };

  const renderTeam = ({ item, index }) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamText}>
        {index + 1}  {item.name}
      </Text>

      <TouchableOpacity
        onPress={() => deleteTeam(item.id)}
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
          placeholder="Enter Team Name"
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
        />
        <TouchableOpacity onPress={addTeam} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Teams</Text>

      <FlatList
        data={teams}
        renderItem={renderTeam}
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
  teamItem: {
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
    width: "98%",
  },
  teamText: {
    fontSize: 14,
  },
  deleteBtn: {
    padding: 5,
  },
});
