import React from "react";
import Layout from "../../Components/Layout/Layout";
import { Box, Paper, Grid } from "@mui/material";
import OwnerProfileTabs from "../../Components/userProfile/OwnerProfileTabs";


function OwnerProfileScreen() {
  return (
    <Layout>
      {/* <PageTitle>My Profile</PageTitle> */}
      <Box sx={{width: '100%'}}>
          <OwnerProfileTabs/>
      </Box>
    </Layout>
  );
}

export default OwnerProfileScreen;
