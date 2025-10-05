import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Pointstable from "../pointstable";
import Matches from "../matches";
import Players from "../players";
import Teams from "../teams";
import Home from "../home";
import MatchStatistics from "../statistics";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Prices from "../Prices";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0c5702", height: 55 },
        headerTintColor: "#f8f9f8",
        drawerActiveTintColor: "#9f0703",
        drawerInactiveTintColor: "#000",
        headerTitleStyle: {
          fontSize: 16,
        },
        drawerStyle: {
          width: 200,
        },
        headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/Prices")}>
          <Ionicons
            name="trophy"
            component={Prices}
            size={24}
            color="#f8f9f8"
            style={{ marginRight: 12 }}
          />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
        <Drawer.Screen
          name="players"
          component={Players}
          options={{
            title: "Players",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={size} color={color} />
            ),
          }}
        />
          <Drawer.Screen
            name="teams"
            component={Teams}
            options={{
              title: "Teams",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="people" size={size} color={color} />
              ),
            }}
          />
      <Drawer.Screen
        name="matches"
        component={Matches}
        options={{
          title: "Matches",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="football" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="pointstable"
        component={Pointstable}
        options={{
          title: "Pointstable",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="statistics"
        component={MatchStatistics}
        options={{
          title: "Statistics",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
