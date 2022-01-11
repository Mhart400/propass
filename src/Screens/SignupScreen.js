import * as React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import states from "../Data/states";
import { useAuth } from "../Context/AuthContext";
import { collection, addDoc, updateDoc, serverTimestamp, doc } from "firebase/firestore"; 
import { db } from "../firebase-config";
import Layout from "../Components/Layout/Layout";
import PageLoading from "../Components/PageLoading";
import PageTitle from "../Components/Layout/PageTitle";

const roles = [
  { value: "Pro", label: "Pro" },
  { value: "Owner", label: "Owner" },
];

const SignupScreen = () => {
  //Set the user's Role
  const [role, setRole] = React.useState("");
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  //Set the user's State
  const [state, setState] = React.useState("");
  const handleState = (event) => {
    setState(event.target.value);
  };

  //Refs for the Fields
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const pwRef = React.useRef();
  const confirmPwRef = React.useRef();
  const addressRef = React.useRef();
  const cityRef = React.useRef();
  const stateRef = React.useRef();
  const zipRef = React.useRef();
  const roleRef = React.useRef();

  //AUTH, Error, Loading
  const { signup, logout, getProfile } = useAuth();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  //Navigate
  const navigate = useNavigate();

  //Logout

  //RESET BUTTON
  const handleReset = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    pwRef.current.value = "";
    confirmPwRef.current.value = "";
    addressRef.current.value = "";
    cityRef.current.value = "";
    stateRef.current.value = "";
    zipRef.current.value = "";
    roleRef.current.value = "Pro";
    setError(false);
    emailRef.current.focus();
  };

  //SIGNUP BUTTON

  async function handleSubmit(e) {
    e.preventDefault();
    if (pwRef.current.value !== confirmPwRef.current.value) {
      setError("Passwords do not match!");
      return;
    } else if (firstNameRef === '' | lastNameRef === '') {
      setError("First Name and Last Name cannot be blank!");
      return;
    }
    try {
      setError("");
      setLoading(true);
      //Create User via Email & Password
      const user = await signup(emailRef.current.value, pwRef.current.value);
      

      // Add User data to Firestore
      const docRef = await addDoc(collection(db, "Users"), {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: user.user.email,
        isOwner: roleRef.current.value === 'Owner' ? true : false,
        isPro: roleRef.current.value === 'Pro' ? true : false,
        timestamp: serverTimestamp()
      });

      //Update with userId
      await updateDoc(doc(db, "Users", docRef.id), {id: docRef.id})


      // Set User Profile in Auth Context
      const userProfile = await getProfile(user.user.email)

      //Navigate to Home Screen Based on Role
      if (userProfile["isOwner"] === true) {
        navigate("/owner/dashboard");
      } else {
        navigate("/pro/dashboard");
      }

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  }

  const output = (
<Container maxWidth="sm">
        <Grid direction="column" container>
          <Button
            component={Link}
            to="/"
            sx={{ ml: 0, my: 2, width: "150px" }}
            variant="outlined"
            size="small"
          >
            Back to Home
          </Button>
          <PageTitle>Sign-up</PageTitle>

          <Box component="form" noValidate autoComplete="off">
            <Grid container direction="column">
              <Grid
                item
                container
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 1, width: "25ch" } }}
              >
                <TextField
                  required
                  variant="standard"
                  id="email"
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                  //   defaultValue="Rich"
                />
                <TextField
                  required
                  variant="standard"
                  id="password"
                  label="Password"
                  type="password"
                  inputRef={pwRef}
                  //   defaultValue="Rowland"
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 1, width: "25ch" } }}
              >
                <TextField
                  required
                  variant="standard"
                  id="confirm_pw"
                  label="Confirm Password"
                  type="password"
                  inputRef={confirmPwRef}
                  //   defaultValue="Rowland"
                />
                {error && <Alert severity="error">{error}</Alert>}
              </Grid>
              <Grid
                item
                container
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 1, width: "25ch" } }}
              >
                <TextField
                  required
                  variant="standard"
                  id="first"
                  label="First Name"
                  inputRef={firstNameRef}
                  //   defaultValue="Rich"
                />
                <TextField
                  required
                  variant="standard"
                  id="last"
                  label="Last Name"
                  inputRef={lastNameRef}
                  //   defaultValue="Rowland"
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                sx={{ width: "100%", my: 1 }}
              >
                <TextField
                  required
                  variant="standard"
                  id="address"
                  label="Address"
                  fullWidth
                  inputRef={addressRef}
                  //   defaultValue="Hello World"
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 1, width: "15ch" } }}
              >
                <TextField
                  required
                  variant="standard"
                  id="city"
                  label="City"
                  inputRef={cityRef}
                  //   defaultValue="Hello World"
                />
                <TextField
                  required
                  select
                  variant="standard"
                  id="state"
                  label="State"
                  value={state}
                  inputRef={stateRef}
                  onChange={handleState}
                  SelectProps={{ MenuProps: { sx: { maxHeight: "300px" } } }}
                  //   defaultValue="Hello World"
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  variant="standard"
                  id="zip"
                  label="Zip"
                  inputRef={zipRef}
                  //   defaultValue="Hello World"
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 3, width: "25ch" } }}
              >
                <TextField
                  required
                  select
                  value={role}
                  onChange={handleRole}
                  variant="standard"
                  id="roleSelect"
                  label="I am a..."
                  inputRef={roleRef}
                  //   defaultValue="Hello World"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ my: 2 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Sign-up
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ my: 1 }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                sx={{ my: 4 }}
                alignItems="center"
              >
                <Typography display="inline" sx={{ mr: 1 }}>
                  Already Have an Account?
                </Typography>
                <Button
                  color="primary"
                  size="small"
                  component={Link}
                  to="/login"
                >
                  Log-in
                </Button>
              </Grid>
              <Button onClick={logout}>Log Out</Button>
            </Grid>
          </Box>
        </Grid>
      </Container>
  )

  
  return (
    <>
    {loading && <PageLoading/>}
    <Layout>
      {output}
    </Layout>
    </>  
  );
};
export default SignupScreen;
