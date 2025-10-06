import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  View,
  StatusBar as RNStatusBar,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/frontpage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={[
          styles.statusBarBackground,
          {
            height: Platform.OS === "android" ? RNStatusBar.currentHeight : 44,
          },
        ]}
      />
      <StatusBar backgroundColor="#9f0703" style="light" />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/(tabs)")}
        style={styles.button}
      >
        <Ionicons name="football" size={40} color="#f8f9f8" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.08,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#9f0703",
    zIndex: 10,
  },
  button: {
    backgroundColor: "#9f0703",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
