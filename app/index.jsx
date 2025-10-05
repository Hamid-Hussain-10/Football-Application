import {
  TouchableOpacity,
  ImageBackground,
  View,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/frontpage.png")}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 70,
      }}
      resizeMode="cover"
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "android" ? RNStatusBar.currentHeight : 44,
          backgroundColor: "#9f0703",
        }}
      />
      <StatusBar style="light" />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/(tabs)")}
        style={{
          backgroundColor: "#9f0703",
          padding: 12,
          marginBottom: 10,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="football" size={28} color="#f8f9f8" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
