import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import whiteLogo from "../../assets/logo_white.png";

// All White Loading Screen with Propass Logo
export default function LoadingWhite() {
  return (
    <View style={styles.container}>
      <Image source={whiteLogo} />
      <ActivityIndicator animating size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
