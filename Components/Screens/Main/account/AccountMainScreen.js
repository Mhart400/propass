import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, List } from "react-native-paper";

// Redux
import { useDispatch } from "react-redux";
import { logout } from "../../../../Redux/authSlice";

export default function AccountScreen({ theme, navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View>
        <List.Item
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
          description="Edit profile image, email address and contact information"
          left={(props) => <List.Icon {...props} icon="face-man-profile" />}
          titleStyle={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
          style={{
            borderRadius: 20,
            backgroundColor: "#fff",
            marginVertical: 5,
            height: 80,
          }}
        />

        <List.Item
          title="Studios"
          onPress={() => navigation.navigate("Studios")}
          description="Add fitness studios you own, edit studio details and rates, mananage availability"
          left={(props) => <List.Icon {...props} icon="office-building-cog" />}
          titleStyle={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
          style={{
            borderRadius: 20,
            backgroundColor: "#fff",
            marginVertical: 5,
            height: 80,
          }}
        />
        <List.Item
          title="Training"
          onPress={() => navigation.navigate("Training")}
          description="Update your training specialties, certifications, insurance, availability"
          left={(props) => <List.Icon {...props} icon="weight-lifter" />}
          titleStyle={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
          style={{
            borderRadius: 20,
            backgroundColor: "#fff",
            marginVertical: 5,
            height: 80,
          }}
        />
        <List.Item
          title="Billing"
          onPress={() => navigation.navigate("Billing")}
          description="Manage billing information"
          left={(props) => <List.Icon {...props} icon="credit-card-outline" />}
          titleStyle={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
          style={{
            borderRadius: 20,
            backgroundColor: "#fff",
            marginVertical: 5,
            height: 80,
          }}
        />
        <List.Item
          title="Password"
          onPress={() => navigation.navigate("Password")}
          description="Update your password"
          left={(props) => <List.Icon {...props} icon="key" />}
          titleStyle={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
          style={{
            borderRadius: 20,
            backgroundColor: "#fff",
            marginVertical: 5,
            height: 80,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="exit-to-app"
          mode="contained"
          style={styles.logoutButton}
          textColor={"red"}
          labelStyle={{ fontSize: 18 }}
          onPress={() => dispatch(logout())}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logoutButton: {
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    marginBottom: 15,
  },
});
