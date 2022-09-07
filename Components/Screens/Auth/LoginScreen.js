import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError, sendPwResetEmail } from "../../../Redux/authSlice";
import WhiteLogo from "../../Utilities/LogoWhite";

export default function Login() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Update Redux store - authSlice
  async function logIn() {
    setPwResetMessage("");
    dispatch(login(loginData));
  }

  const authError = useSelector((state) => state.auth.error);

  // When the page loads 1st time, reset the error
  useEffect(() => {
    dispatch(resetError());
  }, []);

  const [pwResetMessage, setPwResetMessage] = useState();

  const resetPassword = () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (loginData.email.toLocaleLowerCase().match(regex)) {
      dispatch(sendPwResetEmail(loginData.email));
      setPwResetMessage("Password reset email sent. Check your email");
    } else {
      setPwResetMessage("Enter a valid email");
    }
  };

  return (
    <View style={styles.container}>
      <WhiteLogo />
      <TextInput
        label="Email"
        style={styles.textInput}
        onChangeText={(email) => setLoginData({ ...loginData, email: email })}
      />
      <TextInput
        label="Password"
        style={styles.textInput}
        onChangeText={(pw) => setLoginData({ ...loginData, password: pw })}
        secureTextEntry={true}
      />
      <Button
        onPress={() => logIn()}
        mode="contained"
        textColor="white"
        style={styles.button}
      >
        Login
      </Button>
      {authError && (
        <Text variant="labelLarge" style={styles.errorText}>
          Incorrect username / password!
        </Text>
      )}
      {pwResetMessage !== "" && (
        <Text variant="labelLarge" style={styles.errorText}>
          {pwResetMessage}
        </Text>
      )}
      <Button
        onPress={() => resetPassword()}
        style={styles.button}
        // disabled={true}
      >
        Reset Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    padding: 25,
    width: "100%",
  },
  textInput: {
    backgroundColor: "#fff",
    width: 300,
    fontSize: 16,
    margin: 5,
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  errorText: {
    margin: 10,
    color: "red",
  },
});
