import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#f8f9f8",
        tabBarStyle: {
          backgroundColor: "#9f0703",
          height: 90,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 8,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12 },
        headerStyle: {
          backgroundColor: "#9f0703",
          height: 100,
        },
        headerTitleStyle: {
          color: "#f8f9f8",
          fontSize: 20,
          fontWeight: "500",
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Football Tournament Management",
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="TournamentDetails"
        options={{
          headerTitle: "Tournament Details",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <View style={styles.container}>
              <View style={styles.container2}>
                <Ionicons
                  name="football"
                  size={44}
                  color={color}
                  style={styles.centericon}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="lineup"
        options={{
          headerTitle: "Line Up Position",
          title: "Lineup",
          animation: "shift",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="soccer-field"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ffffff",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  container2: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: "#0c5702",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
});
