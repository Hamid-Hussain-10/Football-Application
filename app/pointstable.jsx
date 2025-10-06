import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function PointsTable() {
  const [table, setTable] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadTable = async () => {
      const saved = await AsyncStorage.getItem("matches");
      if (!saved) return;

      const matches = JSON.parse(saved);
      const points = {};

      matches.forEach((m) => {
        const homeScore = parseInt(m.homeScore) || 0;
        const awayScore = parseInt(m.awayScore) || 0;

        if (!points[m.homeName]) {
          points[m.homeName] = {
            team: m.homeName,
            pts: 0,
            W: 0,
            D: 0,
            L: 0,
            P: 0,
          };
        }
        if (!points[m.awayName]) {
          points[m.awayName] = {
            team: m.awayName,
            pts: 0,
            W: 0,
            D: 0,
            L: 0,
            P: 0,
          };
        }

        if (m.homeScore !== "" && m.awayScore !== "") {
          points[m.homeName].P += 1;
          points[m.awayName].P += 1;

          if (homeScore > awayScore) {
            points[m.homeName].pts += 2;
            points[m.homeName].W += 1;
            points[m.awayName].L += 1;
          } else if (awayScore > homeScore) {
            points[m.awayName].pts += 2;
            points[m.awayName].W += 1;
            points[m.homeName].L += 1;
          } else {
            points[m.homeName].pts += 1;
            points[m.awayName].pts += 1;
            points[m.homeName].D += 1;
            points[m.awayName].D += 1;
          }
        }
      });

      const sorted = Object.values(points).sort((a, b) => b.pts - a.pts);
      setTable(sorted);
    };

    if (isFocused) {
      loadTable();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.teamCell]}>Team</Text>
        <Text style={styles.cell}>P</Text>
        <Text style={styles.cell}>W</Text>
        <Text style={styles.cell}>D</Text>
        <Text style={styles.cell}>L</Text>
        <Text style={styles.cell}>Pts</Text>
      </View>

      <FlatList
        data={table}
        keyExtractor={(item) => item.team}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.row,
              { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" },
            ]}
          >
            <Text style={[styles.cell, styles.teamCell]}>{item.team}</Text>
            <Text style={styles.cell}>{item.P}</Text>
            <Text style={styles.cell}>{item.W}</Text>
            <Text style={styles.cell}>{item.D}</Text>
            <Text style={styles.cell}>{item.L}</Text>
            <Text style={[styles.cell, styles.bold]}>{item.pts}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: "#f8f9f8",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#51834a",
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.02,
    marginBottom: width * 0.03,
    backgroundColor: "#e9f5e6",
    borderRadius: width * 0.02,
  },
  row: {
    flexDirection: "row",
    paddingVertical: width * 0.025,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    borderRadius: width * 0.015,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: width * 0.035,
    fontWeight: "400",
    color: "#333",
    marginLeft: width * 0.01,
  },
  teamCell: {
    flex: 2,
    fontWeight: "500",
    color: "#222",
    textAlign: "left",
    fontSize: width * 0.037,
  },
  bold: {
    fontWeight: "500",
    color: "#000",
  },
});
