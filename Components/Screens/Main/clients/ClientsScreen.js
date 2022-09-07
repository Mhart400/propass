import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function ClientsScreen({ navigation, theme }) {
  return (
    <View style={styles.container}>
      <Text>Clients Screen</Text>
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
