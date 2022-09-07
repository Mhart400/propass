import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  withTheme,
  Avatar,
  IconButton,
  Button,
  Switch,
  Snackbar,
  Modal,
  Portal,
} from "react-native-paper";
import { fetchUser, updateUser } from "../../../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../../theme";

function ProfileScreen({ navigation, theme }) {
  const dispatch = useDispatch();

  const stateUserData = useSelector((state) => state.user.userData);

  const [formDisabled, setFormDisabled] = useState(true);
  const [profileData, setProfileData] = useState(stateUserData);

  // Toggle the form to be disabled/enabled for editing
  const toggleFormLock = () => {
    if (!formDisabled) {
      dispatch(updateUser(profileData));
      displaySnackbar();
      console.log(stateUserData);
    }
    setFormDisabled(!formDisabled);
    console.log(profileData);
    // HANDLE SAVING TO STATE HERE
  };

  // Switch for isOwner
  const toggleIsOwner = () => {
    setProfileData({ ...profileData, isOwner: !profileData.isOwner });
  };

  // Switch for isPro
  const toggleIsPro = () => {
    setProfileData({ ...profileData, isPro: !profileData.isPro });
  };

  //Snackbar control
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Display snackbar
  const displaySnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2500);
  };

  // Modal control to show help text
  const [displayHelpModal, setHelpDisplayModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const toggleModal = (role) => {
    if (role === "pro") {
      setModalText(helpMessages.pro);
      setHelpDisplayModal(!displayHelpModal);
    } else {
      setModalText(helpMessages.owner);
      setHelpDisplayModal(!displayHelpModal);
    }
  };

  const helpMessages = {
    owner:
      "As an Owner, you can add your studios and set rates. Pros will be able to rent your studio during available hours.",
    pro: "As a Pro, you can rent studio space to train your clients.",
  };

  return (
    <Portal.Host>
      <View style={styles.mainContainer}>
        {/* ====== Avatar Section ===== */}
        <View style={styles.avatarContainer}>
          <Avatar.Text size={100} label={"MH"} style={styles.avatarCircle} />
          <IconButton
            size={16}
            icon="pencil"
            style={styles.avatarEditButton}
            onPress={() => console.log("change picture")}
          />
          <Text
            variant="titleLarge"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            {profileData.firstName} {profileData.lastName}
          </Text>
        </View>

        {/* /* ===== CONTACT INFORMATION ===== */}
        <View style={styles.bottomContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.headingContainer}>
              <Text variant="titleLarge" style={styles.heading}>
                Contact Information
              </Text>
              <Button
                icon={formDisabled ? "pencil" : "content-save"}
                size={20}
                labelStyle={{ marginLeft: 20 }}
                textColor={formDisabled ? "black" : "white"}
                style={{ marginLeft: 40 }}
                onPress={() => toggleFormLock()}
                mode={!formDisabled && "contained"}
              >
                {formDisabled ? "Edit" : "Save"}
              </Button>
            </View>
            <TextInput
              style={styles.textInput}
              disabled={formDisabled}
              mode="outlined"
              label="FirstName"
              value={profileData.firstName}
              onChangeText={(text) =>
                setProfileData({ ...profileData, firstName: text })
              }
            />
            <TextInput
              style={styles.textInput}
              disabled={formDisabled}
              mode="outlined"
              label="LastName"
              value={profileData.lastName}
              onChangeText={(text) =>
                setProfileData({ ...profileData, lastName: text })
              }
            />
            <TextInput
              style={styles.textInput}
              disabled={formDisabled}
              mode="outlined"
              label="Email"
              value={profileData.email}
              onChangeText={(text) =>
                setProfileData({ ...profileData, email: text })
              }
            />
            <TextInput
              style={styles.textInput}
              disabled={formDisabled}
              mode="outlined"
              label="Phone Number"
              value={profileData.phone}
              onChangeText={(text) =>
                setProfileData({ ...profileData, phone: text })
              }
              keyboardType="decimal-pad"
              textContentType="telephoneNumber"
            />
            <View style={styles.headingContainer}>
              <Text
                style={
                  formDisabled
                    ? styles.toggleTextDisabled
                    : styles.toggleTextEnabled
                }
              >
                I'm an Owner
              </Text>
              <IconButton
                icon="help-circle"
                size={16}
                disabled={formDisabled}
                onPress={() => toggleModal("owner")}
              />
              <View style={styles.toggleBox}></View>
              <Switch
                value={profileData.isOwner}
                onValueChange={() => toggleIsOwner()}
                disabled={formDisabled}
              />
            </View>
            <View style={styles.headingContainer}>
              <Text
                style={
                  formDisabled
                    ? styles.toggleTextDisabled
                    : styles.toggleTextEnabled
                }
              >
                I'm a Pro
              </Text>
              <IconButton
                icon="help-circle"
                size={16}
                disabled={formDisabled}
                onPress={() => toggleModal("pro")}
              />
              <View style={styles.toggleBox}>
                <Switch
                  value={profileData.isPro}
                  onValueChange={() => toggleIsPro()}
                  disabled={formDisabled}
                />
              </View>
            </View>
          </View>
          <Snackbar
            visible={snackbarVisible}
            action={{
              label: "OK",
              onPress: () => {
                setSnackbarVisible(false);
              },
            }}
            onDismiss={() => setSnackbarVisible(false)}
          >
            Saved!
          </Snackbar>
        </View>
      </View>

      <Portal>
        <Modal
          visible={displayHelpModal}
          onDismiss={() => setHelpDisplayModal(false)}
          contentContainerStyle={{
            width: 350,
            height: 200,
            justifyContent: "center",
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 30,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text variant="bodyLarge">{modalText}</Text>
        </Modal>
      </Portal>
    </Portal.Host>
  );
}

export default withTheme(ProfileScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatarContainer: {
    backgroundColor: "#000",
    height: 180,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingBottom: 25,
  },
  infoContainer: {
    // flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  avatarCircle: {
    backgroundColor: theme.colors.primary,
  },
  avatarEditButton: {
    top: -30,
    right: -35,
    backgroundColor: "#fff",
    marginBottom: -20,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {},
  textInput: {
    width: "100%",
    marginVertical: 5,
    fontSize: 16,
  },
  toggleTextEnabled: {
    fontSize: 16,
    paddingLeft: 15,
    color: "black",
  },
  toggleTextDisabled: {
    fontSize: 16,
    paddingLeft: 15,
    color: "gray",
  },
  toggleBox: {
    flex: 1,
    alignItems: "flex-end",
  },
});
