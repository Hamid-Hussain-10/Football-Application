import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#f8f9f8",
        tabBarStyle: {
          backgroundColor: "#9f0703",
          height: 90,
        },
        tabBarLabelStyle: { fontSize: 10 },
        headerStyle: {
          backgroundColor: "#9f0703",
          height: 90,
        },
        headerTitleStyle: {
          color: "#f8f9f8",
          fontSize: 18,
          fontWeight: "bold",
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Football Tournament Management",
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home-outline"
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TournamentDetails"
        options={{
          headerTitle: "Tournament Details",
          title: "Tournament",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="football" size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lineup"
        options={{
          headerTitle: "Line Up Position",
          title: "Lineup",
          animation: "shift",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="soccer-field"
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
