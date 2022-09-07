import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function MyTrainingScreen({ navigation, theme }) {
  return (
    <View style={styles.container}>
      <Text>My Training Screen</Text>
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
