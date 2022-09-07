import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function ManagePasswordScreen({ navigation, theme }) {
  return (
    <View style={styles.container}>
      <Text>Manage Password Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
