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
import { Link } from "react-router-dom";
import states from "../Data/states";
import { useAuth } from "../Context/AuthContext";


const roles = [
  { value: "", label: "" },
  { value: "Trainer", label: "Trainer" },
  { value: "Owner", label: "Owner" },
];

const SignupScreen = () => {
  //Set the user's Role
  const [role, setRole] = React.useState('');
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  //Set the user's State
  const [state, setState] = React.useState('');
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
  const { signup, auth, logout} = useAuth()
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
 
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
    roleRef.current.value = "";
    setError(false);
    emailRef.current.focus();
  };

  //SIGNUP BUTTON

  async function handleSubmit(e) {
    e.preventDefault();
    if (pwRef.current.value !== confirmPwRef.current.value) {
      setError("Passwords do not match!");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const user = await signup(
        emailRef.current.value,
        pwRef.current.value
      );
      console.log(user)
    } catch (error) {
      setError(error.message);
      setLoading(false)
    }
    setLoading(false);
  }

  //Return the HTML
  return (
    <>
      <Container maxWidth="sm">
        <Grid direction="column" container>
          <Button
            component={Link}
            to="/"
            sx={{ ml: 0, my: 2, width: '150px' }}
            variant="outlined"
            size="small"
          >
            Back to Home
          </Button>
          <Typography
            align="center"
            sx={{
              color: "primary.dark",
              fontWeight: 400,
              my: 4,
              typography: { xs: "h4", sm: "h3", md: "h3", lg: "h2" },
            }}
          >
            Sign-up
          </Typography>
          {auth.currentUser && <Typography>{auth.currentUser.email}</Typography>}

          <Box component="form" noValidate autoComplete="off">
            <Grid container direction="column">
              <Grid
                item container
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
                item container
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
                item container
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
              <Grid item container direction="row" sx={{ width: "100%", my: 1 }}>
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
                item container
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
                item container
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
              <Grid container direction="row" sx={{ my: 4 }} alignItems="center">
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
    </>
  );
};
export default SignupScreen;
