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
        {index + 1}. {item.name}
      </Text>
      <TouchableOpacity
        onPress={() => deleteTeam(item.id)}
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
          placeholder="Enter Team Name"
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={addTeam} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Teams</Text>

      {/* Teams List */}
      <FlatList
        data={teams}
        renderItem={renderTeam}
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
    paddingVertical: height * 0.010,
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
  teamItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.010,
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f8f9f8",
    borderRadius: 8,
    marginBottom: height * 0.01,
  },
  teamText: {
    fontSize: width * 0.04,
    color: "#333",
  },
  deleteBtn: {
    padding: width * 0.015,
  },
});
