import React from "react";
import Layout from "../../Components/Layout/Layout";
import { Box } from "@mui/material";
import ProProfileTabs from "../../Components/userProfile/ProProfileTabs";


function ProProfileScreen() {
  return (
    <Layout>
      {/* <PageTitle>My Profile</PageTitle> */}
      <Box sx={{width: '100%'}}>
          <ProProfileTabs/>
      </Box>
    </Layout>
  );
}

export default ProProfileScreen;
