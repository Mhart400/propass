import React, { useState } from "react";
import { Grid, Divider, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import UserAvatar from "./UserAvatar";
import PersonalInformation from "../Forms/PersonalInformation";
import UpdateAvatar from "./UpdateAvatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProQualificationsForm from "../Forms/ProQualificationsForm";
import EducationForm from "../Forms/EducationForm";
import SpecialtiesForm from "../Forms/SpecialtiesForm";
import OwnerRequiredDocsForm from "../Forms/OwnerRequiredDocsForm";
import OwnerAccountInformation from "../Forms/OwnerAccountInformation";


import OwnerStudioList from "./OwnerStudioList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: {xs: 0.5, sm: 0.7, md: 1, lg: 2} }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function OwnerProfileTabs() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const output = (
    <>
      <Divider light fullWidth />
      <Grid container direction="row">
        <Grid
          container
          item
          direction="column"
          xs={0}
          sm={0}
          md={1}
          lg={2}
        ></Grid>
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={12}
          md={10}
          lg={8}
          sx={{ overflowX: "hidden" }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            // centered
            sx={{ width: "100%" }}
            variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile
          >
            <Tab label="General Info" {...a11yProps(0)} />
            <Tab label="My Studios" {...a11yProps(1)} />
            <Tab label="Documents" {...a11yProps(2)} />
            
            {/* <Tab label="Billing" {...a11yProps(3)} /> */}
          </Tabs>
        </Grid>
        <Grid
          container
          item
          direction="column"
          xs={0}
          sm={0}
          md={1}
          lg={2}
        ></Grid>
      </Grid>

      <Grid container direction="row">
        <Grid
          container
          item
          direction="column"
          xs={0}
          sm={0}
          md={2}
          lg={3}
        ></Grid>
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={12}
          md={8}
          lg={6}
          sx={{ overflowX: "hidden" }}
        >
          <Box sx={{ width: "100%" }}>
            <TabPanel value={tab} index={0}>
              <UpdateAvatar />
              <OwnerAccountInformation/>
              
              
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <OwnerStudioList />
              
              {/* <ProQualificationsForm /> */}
            </TabPanel>
           
            <TabPanel value={tab} index={2}>
              <OwnerRequiredDocsForm />
            </TabPanel>
          </Box>
        </Grid>
        <Grid
          container
          item
          direction="column"
          xs={0}
          sm={0}
          md={2}
          lg={3}
        ></Grid>
      </Grid>

      <Divider light fullWidth />
    </>
  );

  return <>{output}</>;
}

export default OwnerProfileTabs;
