import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { withTheme } from "react-native-paper";
import whiteLogo from "../../../assets/logo_white.png";

function AuthLandingScreen({ theme, navigation }) {
  const { colors } = theme;
  return (
    <View style={styles.view}>
      <Image source={whiteLogo} />
      <View style={styles.buttonContainer}>
        <Button
          uppercase
          mode="contained"
          buttonColor={colors.primary}
          style={styles.buttons}
          labelStyle={{ fontWeight: "bold" }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
        <Button
          uppercase
          style={styles.buttons}
          onPress={() => navigation.navigate("Signup")}
        >
          sign-up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 200,
  },
  buttonContainer: {
    flex: 1,
    padding: 100,
    // flexDirection: "row",
  },
  iconImage: {},
  buttons: {
    marginVertical: 10,
    width: 250,
    marginHorizontal: 20,
  },
});

export default withTheme(AuthLandingScreen);
