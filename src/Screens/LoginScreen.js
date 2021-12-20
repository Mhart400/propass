import React from "react";
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";


const LoginScreen = () => {
  const { login } = useAuth();
  // const userProfie = useProfile()
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const emailRef = React.useRef();
  const pwRef = React.useRef();

  const handleReset = () => {
    emailRef.current.value = "";
    pwRef.current.value = "";
    emailRef.current.focus();
    setError(false);
  };

  async function submitLogin(e) {
    e.preventDefault();
    if (pwRef.current.value === "") {
      setError("Password blank!");
      return;
    }
    try {
      setError("");
      setLoading(true);

      // 1) Login and 2) setProfile in Auth Context
      const {user, userProfile} = await login(emailRef.current.value, pwRef.current.value);

      //Navigate based on user role
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitLogin(e);
    }
  };

  return (
    <Layout>
      <Container maxWidth="xs">
        <Grid container direction="column">
          <Button
            component={Link}
            to="/"
            sx={{ ml: 0, my: 2 }}
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
            Log-in
          </Typography>
          <Box component="form">
            <TextField
              label="Email"
              type="email"
              id="email_login"
              variant="standard"
              fullWidth
              sx={{ my: 1 }}
              inputRef={emailRef}
              onKeyDown={handleKeyDown}
            />
            <TextField
              label="Password"
              type="password"
              id="pw_login"
              variant="standard"
              fullWidth
              sx={{ my: 1 }}
              inputRef={pwRef}
              onKeyDown={handleKeyDown}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={submitLogin}
              sx={{ mt: 3, mb: 1 }}
            >
              Log-in
            </Button>
            <Button fullWidth onClick={handleReset} sx={{ mb: 3 }}>
              Reset
            </Button>
          </Box>
          {error && <Alert type="error">{error}</Alert>}
        </Grid>
        <Grid container direction="row" sx={{ my: 4 }} alignItems="center">
          <Typography display="inline" sx={{ mr: 1 }}>
            Don't have an Account?
          </Typography>
          <Button color="primary" size="small" component={Link} to="/signup">
            Sign-up
          </Button>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LoginScreen;
