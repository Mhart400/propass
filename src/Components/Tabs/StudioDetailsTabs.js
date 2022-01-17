import React, { useState} from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import PropTypes from "prop-types";
import OwnerStudioHours_Edit from '../Forms/OwnerStudioHours_Edit'
import StudioInformation_Edit from "../Forms/StudioInformation_Edit";
import StudioPhotos_Edit from "../ImageGallery/StudioPhotos_Edit";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{maxWidth: '500px', width: '100%'}}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function StudioDetailsTabs({ studioInfo }) {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };



  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        pt: 2,
        
      }}
      key={studioInfo.id}
    >
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={true}
        aria-label="scrollable auto tabs example"

      >
        <Tab label="General Information" />
        <Tab label="Operating Hours" />
        <Tab label="Photos" />
      </Tabs>
      
        <TabPanel value={tabValue} index={0} >
          <StudioInformation_Edit studioInfo={studioInfo} />
        </TabPanel>

        <TabPanel value={tabValue} index={1} >
          <OwnerStudioHours_Edit studioId={studioInfo.id} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <StudioPhotos_Edit studioInfo={studioInfo}  />
        </TabPanel>
      
    </Box>
  );
}

export default StudioDetailsTabs;
