import * as React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const roles = [
  { value: "Trainer", label: "Trainer" },
  { value: "Owner", label: "Owner" },
];

const SignupScreen = () => {
  const [role, setRole] = React.useState();
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid direction="column">
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
              typography: { xs: "h5", sm: "h4", md: "h3", lg: "h3" },
            }}
          >
            Sign-up
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <Grid container direction="column">
              <Grid
                item
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 2, width: "25ch" } }}
              >
                <TextField
                  required
                  variant="standard"
                  id="outlined-required"
                  label="First Name"
                  //   defaultValue="Rich"
                />
                <TextField
                  required
                  variant="standard"
                  id="outlined-disabled"
                  label="Last Name"
                  //   defaultValue="Rowland"
                />
              </Grid>
              <Grid item direction="row" sx={{ width: "100%", my: 2 }}>
                <TextField
                  required
                  variant="standard"
                  id="outlined-required"
                  label="Address"
                  fullWidth
                  //   defaultValue="Hello World"
                />
              </Grid>
              <Grid
                item
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 3, width: "15ch" } }}
              >
                <TextField
                  required
                  variant="standard"
                  id="outlined-required"
                  label="City"
                  //   defaultValue="Hello World"
                />
                <TextField
                  required
                  variant="standard"
                  id="outlined-disabled"
                  label="State"
                  //   defaultValue="Hello World"
                />
                <TextField
                  required
                  variant="standard"
                  id="outlined-disabled"
                  label="Zip"
                  //   defaultValue="Hello World"
                />
              </Grid>
              <Grid
                item
                direction="row"
                sx={{ "& .MuiTextField-root": { mr: 2, my: 3, width: "25ch" } }}
              >
                <TextField
                  required
                  select
                  value={role}
                  onChange={handleRole}
                  variant="standard"
                  id="outlined-required"
                  label="I am a..."
                  //   defaultValue="Hello World"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button fullWidth variant="contained" sx={{ my: 2 }}>
                  Sign-up
                </Button>
              </Grid>
              <Grid direction="row" sx={{ mt: 4 }} alignItems='center'>
                <Typography display="inline" sx={{mr: 1}}>
                  Already Have an Account?
                </Typography>
                <Button  color="primary" size='small'>
                  Sign-in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
};
export default SignupScreen;
