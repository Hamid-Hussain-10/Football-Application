import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const [tournamentName, setTournamentName] = useState("");
  const [venue, setVenue] = useState("");
  const [teams, setTeams] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const router = useRouter();

  const clearAll = () => {
    setTournamentName("");
    setVenue("");
    setTeams("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/Home.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.contentText}>Add Tournament Details</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Tournament Name"
              placeholderTextColor="#777"
              style={styles.input}
              value={tournamentName}
              onChangeText={setTournamentName}
            />
            <TextInput
              placeholder="Tournament Venue"
              placeholderTextColor="#777"
              style={styles.input}
              value={venue}
              onChangeText={setVenue}
            />
            <TextInput
              placeholder="Number of Teams"
              placeholderTextColor="#777"
              style={styles.input}
              value={teams}
              onChangeText={setTeams}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Start Date"
              keyboardType="numeric"
              placeholderTextColor="#777"
              style={styles.input}
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              placeholder="End Date"
              keyboardType="numeric"
              placeholderTextColor="#777"
              style={styles.input}
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() =>
                router.push({
                  pathname: "./(tabs)/TournamentDetails",
                  params: { tournamentName, venue, teams, startDate, endDate },
                })
              }
            >
              <Text style={styles.buttonText}>Save Tournament</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearAll}
            >
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f8f9f8",
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    marginTop: 15,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#b31616",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderStyle: "dotted",
    borderColor: "#0c5702",
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: "#000",
    backgroundColor: "#f8f9f8",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
  },
  saveButton: {
    backgroundColor: "#0c5702",
  },
  clearButton: {
    backgroundColor: "#b31616",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});