import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/Home.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Form Section */}
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
                placeholderTextColor="#777"
                style={styles.input}
                value={startDate}
                onChangeText={setStartDate}
              />
              <TextInput
                placeholder="End Date"
                placeholderTextColor="#777"
                style={styles.input}
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/TournamentDetails",
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f8f9f8",
    paddingBottom: height * 0.05,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: height * 0.28,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    marginTop: height * 0.02,
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  contentText: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#b31616",
    marginBottom: height * 0.02,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.03,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderStyle: "dotted",
    borderColor: "#0c5702",
    borderRadius: 12,
    paddingVertical: height * 0.013,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.035,
    color: "#000",
    backgroundColor: "#fff",
    marginBottom: height * 0.013,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  button: {
    flex: 1,
    paddingVertical: height * 0.012,
    borderRadius: 24,
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#0c5702",
  },
  clearButton: {
    backgroundColor: "#b31616",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "400",
  },
});