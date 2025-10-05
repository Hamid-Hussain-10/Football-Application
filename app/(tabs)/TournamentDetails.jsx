import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TournamentDetails() {
  const { tournamentName, venue, teams, startDate, endDate } =
    useLocalSearchParams();

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="trophy" size={22} color="#0c5702" />
        <Text style={styles.detail}>
          {tournamentName || "Sadpara Super Cup"}
        </Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="map-marker" size={22} color="#0c5702" />
        <Text style={styles.detail}> {venue || "Sadpara Park"}</Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#0c5702"
        />
        <Text style={styles.detail}> {teams || "10 Teams"}</Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="calendar-start"
          size={22}
          color="#0c5702"
        />
        <Text style={styles.detail}> {startDate || "10-09-2025"}</Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar-end" size={22} color="#0c5702" />
        <Text style={styles.detail}> {endDate || "10-10-2025"}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.imagecontainer}>
        <Image
          source={require("../../assets/images/goal.jpeg")}
          style={styles.detailsimage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: "#fff",
  },
  detail: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#51834a",
    marginVertical: 10,
  },
  imagecontainer: {
    width: "100%",
  },
  detailsimage: {
    width: "100%",
    height: "75%",
  },
});
