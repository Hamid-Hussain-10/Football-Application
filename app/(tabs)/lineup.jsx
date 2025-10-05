import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const LineUp = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/download.jpeg")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default LineUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64924b",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height,
  },
});
