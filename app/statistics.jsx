import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

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

  const toInt = (v) => {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? 0 : n;
  };

  const isPlayerObj = (p) =>
    p &&
    typeof p === "object" &&
    typeof p.player === "string" &&
    ["goals", "assists", "yellowCards", "redCards"].every((k) => k in p);

  const normalizeStats = (raw) => {
    const cleaned = {};
    if (!raw || typeof raw !== "object") return cleaned;

    for (const [teamName, val] of Object.entries(raw)) {
      let arr = Array.isArray(val) ? val : Object.values(val || {});
      cleaned[teamName] = arr.filter(isPlayerObj).map((p) => ({
        player: String(p.player),
        goals: toInt(p.goals),
        assists: toInt(p.assists),
        yellowCards: toInt(p.yellowCards),
        redCards: toInt(p.redCards),
      }));
    }
    return cleaned;
  };

  const loadStats = async () => {
    try {
      const saved = await AsyncStorage.getItem("playerStats");
      if (!saved) return;
      const parsed = JSON.parse(saved);
      const normalized = normalizeStats(parsed);
      setStats(normalized);

      if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        await AsyncStorage.setItem("playerStats", JSON.stringify(normalized));
      }
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

  const teamNames = Object.keys(stats);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
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
          placeholder="Yellow Card"
          value={yellowCards}
          onChangeText={setYellowCards}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Red Card"
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

      {teamNames.map((teamName) => {
        const players = Array.isArray(stats[teamName])
          ? stats[teamName]
          : Object.values(stats[teamName] || {});

        if (!players || players.length === 0) return null;

        return (
          <View key={teamName} style={styles.teamContainer}>
            <View style={styles.teamHeaderRow}>
              <Text style={styles.teamHeader}>{teamName}</Text>
              <TouchableOpacity onPress={() => deleteTeam(teamName)}>
                <Ionicons name="trash" size={14} color="#ffffff" />
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
                key={`${teamName}-${p.player}`}
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
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#bbb",
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  formRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  btncon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  addBtn: {
    backgroundColor: "#0c5702",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  addText: {
    color: "#f8f9f8",
    fontWeight: "bold",
    fontSize: 12,
  },
  teamContainer: {
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e9ecef",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 12,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  rowEven: { backgroundColor: "#fff" },
  rowOdd: { backgroundColor: "#f9f9f9" },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#444",
  },
});
