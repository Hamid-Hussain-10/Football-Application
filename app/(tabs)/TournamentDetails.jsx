import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function TournamentDetails() {
  const { tournamentName, venue, teams, startDate, endDate } =
    useLocalSearchParams();

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="trophy"
            size={width * 0.06}
            color="#0c5702"
          />
          <Text style={styles.detail}>
            {tournamentName || "Sadpara Super Cup"}
          </Text>
        </View>
        <View style={styles.line}></View>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="map-marker"
            size={width * 0.06}
            color="#0c5702"
          />
          <Text style={styles.detail}>{venue || "Sadpara Park"}</Text>
        </View>
        <View style={styles.line}></View>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="account-group"
            size={width * 0.06}
            color="#0c5702"
          />
          <Text style={styles.detail}>{teams || "10 Teams"}</Text>
        </View>
        <View style={styles.line}></View>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="calendar-start"
            size={width * 0.06}
            color="#0c5702"
          />
          <Text style={styles.detail}>{startDate || "10-09-2025"}</Text>
        </View>
        <View style={styles.line}></View>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="calendar-end"
            size={width * 0.06}
            color="#0c5702"
          />
          <Text style={styles.detail}>{endDate || "10-10-2025"}</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/goal.jpeg")}
            style={styles.detailsImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    backgroundColor: "#fff",
  },
  detail: {
    fontSize: width * 0.04,
    marginLeft: width * 0.03,
    color: "#333",
    flexShrink: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#51834a",
    marginVertical: height * 0.012,
  },
  imageContainer: {
    width: "100%",
    marginTop: height * 0.02,
    overflow: "hidden",
  },
  detailsImage: {
    width: "100%",
    height: height * 0.4,
  },
});
