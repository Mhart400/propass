import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import WhiteLogo from "../../Utilities/LogoWhite";
import { useState, useRef } from "react";
import useFirebase from "../../../Actions/useFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { theme } from "../../../theme";

export default function SingupScreen() {
  const { auth, db } = useFirebase();
  const { colors } = theme;

  const firstNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const emailRef = useRef();

  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const [loginData, setLoginData] = useState(initialData);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [signupError, setSignupError] = useState("");

  const resetAll = () => {
    setLoginData(initialData);
    firstNameRef.current.focus();
    setPasswordError(false);
    setEmailError(false);
    setSignupError("");
  };

  const resetEmailPassword = () => {
    setLoginData({
      ...loginData,
      email: "",
      password: "",
      passwordConfirm: "",
    });
    emailRef.current.focus();
  };

  // Validate the email and password before sending request to Firebase.
  // If there is an email or password error, returns true and displays error message, else returns false
  const hasEmailOrPasswordErrors = () => {
    const { email, password, passwordConfirm } = loginData;
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // First check for invalid email
    if (!email.toLowerCase().match(regex)) {
      setSignupError("Invalid email!");
      setEmailError(true);
      resetEmailPassword();
      return true;
    }
    setEmailError(false);
    if (password !== passwordConfirm || password.length < 6) {
      setSignupError("Passwords must match and be at least 6 characters");
      setPasswordError(true);
      resetEmailPassword();
      return true;
    }
    return false;
  };

  function signUp() {
    if (hasEmailOrPasswordErrors()) {
    } else {
      const { firstName, lastName, email, password, passwordConfirm } =
        loginData;
      // First save to Firebase Auth
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          // Then save user details in firestore
          const docId = auth.currentUser.uid;
          setDoc(doc(db, "users", docId), {
            firstName,
            lastName,
            email,
          });
          console.log(result);
        })
        .catch((error) => {
          setSignupError(error);
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <WhiteLogo />
      <TextInput
        label="First Name"
        onChangeText={(name) => setLoginData({ ...loginData, firstName: name })}
        value={loginData.firstName}
        style={styles.textInput}
        ref={firstNameRef}
      />
      <TextInput
        label="Last Name"
        onChangeText={(name) => setLoginData({ ...loginData, lastName: name })}
        value={loginData.lastName}
        style={styles.textInput}
      />
      <TextInput
        label="Email"
        onChangeText={(email) => setLoginData({ ...loginData, email: email })}
        value={loginData.email}
        style={styles.textInput}
        error={emailError}
        ref={emailRef}
      />
      <TextInput
        label="Password"
        onChangeText={(pw) => setLoginData({ ...loginData, password: pw })}
        value={loginData.password}
        style={styles.textInput}
        secureTextEntry={true}
        ref={passwordRef}
        error={passwordError}
      />
      <TextInput
        label="Confirm Password"
        onChangeText={(pw) =>
          setLoginData({ ...loginData, passwordConfirm: pw })
        }
        value={loginData.passwordConfirm}
        style={styles.textInput}
        secureTextEntry={true}
        ref={passwordConfirmRef}
        error={passwordError}
      />

      <Button onPress={() => signUp()} mode="contained" style={styles.button}>
        Sign-up
      </Button>
      <Button
        onPress={() => resetAll()}
        style={styles.button}
        textColor={colors.primary}
      >
        Reset
      </Button>
      {signupError && (
        <Text variant="labelMedium" style={styles.errorText}>
          {signupError}
        </Text>
      )}
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
    fontSize: 14,
    margin: 5,
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
  },
});
