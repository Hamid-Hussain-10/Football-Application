import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scale = width / 375;

export default function Statistics() {
  const [team, setTeam] = useState("");
  const [player, setPlayer] = useState("");
  const [goals, setGoals] = useState("");
  const [assists, setAssists] = useState("");
  const [yellowCards, setYellowCards] = useState("");
  const [redCards, setRedCards] = useState("");
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const toInt = (v) => (isNaN(parseInt(v, 10)) ? 0 : parseInt(v, 10));

  const loadStats = async () => {
    try {
      const saved = await AsyncStorage.getItem("playerStats");
      if (!saved) return;
      const parsed = JSON.parse(saved);
      setStats(parsed);
    } catch (e) {
      console.error("Error loading stats", e);
    }
  };

  const saveStats = async (newStats) => {
    try {
      await AsyncStorage.setItem("playerStats", JSON.stringify(newStats));
    } catch (e) {
      console.error("Error saving stats", e);
    }
  };

  const addPlayer = () => {
    if (!team.trim() || !player.trim()) return;

    const newStats = { ...stats };
    const bucket = Array.isArray(newStats[team])
      ? newStats[team]
      : Object.values(newStats[team] || {});

    newStats[team] = bucket;

    const existing = bucket.find(
      (p) => p.player.toLowerCase() === player.trim().toLowerCase()
    );

    if (existing) {
      existing.goals += toInt(goals);
      existing.assists += toInt(assists);
      existing.yellowCards += toInt(yellowCards);
      existing.redCards += toInt(redCards);
    } else {
      bucket.push({
        player: player.trim(),
        goals: toInt(goals),
        assists: toInt(assists),
        yellowCards: toInt(yellowCards),
        redCards: toInt(redCards),
      });
    }

    setStats({ ...newStats });
    saveStats(newStats);

    setPlayer("");
    setGoals("");
    setAssists("");
    setYellowCards("");
    setRedCards("");
  };

  const deleteTeam = (teamName) => {
    const newStats = { ...stats };
    delete newStats[teamName];
    setStats(newStats);
    saveStats(newStats);
  };

  const teamData = Object.keys(stats).map((teamName) => ({
    name: teamName,
    players: Array.isArray(stats[teamName])
      ? stats[teamName]
      : Object.values(stats[teamName] || {}),
  }));

  const renderTeam = ({ item }) => {
    const players = item.players;
    if (!players || players.length === 0) return null;

    return (
      <View style={styles.teamContainer}>
        <View style={styles.teamHeaderRow}>
          <Text style={styles.teamHeader}>{item.name}</Text>
          <TouchableOpacity onPress={() => deleteTeam(item.name)}>
            <Ionicons name="trash" size={14 * scale} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Player</Text>
          <Text style={styles.headerCell}>Goals</Text>
          <Text style={styles.headerCell}>Assists</Text>
          <Text style={styles.headerCell}>YC</Text>
          <Text style={styles.headerCell}>RC</Text>
        </View>

        {players.map((p, idx) => (
          <View
            key={`${item.name}-${p.player}`}
            style={[
              styles.row,
              idx % 2 === 0 ? styles.rowEven : styles.rowOdd,
            ]}
          >
            <Text style={[styles.cell, { flex: 2 }]}>{p.player}</Text>
            <Text style={styles.cell}>{p.goals}</Text>
            <Text style={styles.cell}>{p.assists}</Text>
            <Text style={styles.cell}>{p.yellowCards}</Text>
            <Text style={styles.cell}>{p.redCards}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Input Form (fixed top section) */}
        <View>
          <View style={styles.formRow}>
            <TextInput
              placeholder="Team Name"
              value={team}
              onChangeText={setTeam}
              style={styles.input}
            />
            <TextInput
              placeholder="Player Name"
              value={player}
              onChangeText={setPlayer}
              style={styles.input}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              placeholder="Goals"
              value={goals}
              onChangeText={setGoals}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Assists"
              value={assists}
              onChangeText={setAssists}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              placeholder="Yellow Cards"
              value={yellowCards}
              onChangeText={setYellowCards}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Red Cards"
              value={redCards}
              onChangeText={setRedCards}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.btncon}>
              <TouchableOpacity style={styles.addBtn} onPress={addPlayer}>
                <Text style={styles.addText}>Add / Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Scrollable List (only this part scrolls) */}
        <FlatList
          data={teamData}
          keyExtractor={(item) => item.name}
          renderItem={renderTeam}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    paddingTop: 10,
  },
  formRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#f1eded",
    paddingVertical: 8 * scale,
    paddingHorizontal: 8 * scale,
    fontSize: 12 * scale,
  },
  btncon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  addBtn: {
    backgroundColor: "#0c5702",
    paddingVertical: 10 * scale,
    paddingHorizontal: 14 * scale,
    borderRadius: 20,
    minWidth: width * 0.25,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 10 * scale,
  },
  teamContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 6,
    overflow: "hidden",
  },
  teamHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  teamHeader: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14 * scale,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e9ecef",
    borderBottomWidth: 1,
    borderColor: "#8cbd21",
  },
  headerCell: {
    flex: 1,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 8 * scale,
    fontSize: 12 * scale,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8 * scale,
    paddingHorizontal: 6 * scale,
  },
  rowEven: { backgroundColor: "#fff" },
  rowOdd: { backgroundColor: "#f9f9f9" },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12 * scale,
    color: "#444",
  },
});
