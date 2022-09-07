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
          onPress={() => navigation.navigate("EditProfile")}
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
          onPress={() => navigation.navigate("EditStudios")}
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
          onPress={() => navigation.navigate("EditTraining")}
          description="Update your training specialties, certifications, insurance, and availability to train"
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
          title="Password"
          onPress={() => navigation.navigate("EditPassword")}
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
      <Button
        icon="exit-to-app"
        mode="outlined"
        style={{ marginTop: 60, width: 250, alignSelf: "center" }}
        onPress={() => dispatch(logout())}
      >
        Logout
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
