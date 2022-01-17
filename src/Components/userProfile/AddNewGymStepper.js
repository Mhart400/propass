import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OwnerStudioInformation_AddNew from "../Forms/OwnerStudioInformation_AddNew";
import OwnerStudioHours_AddNew from "../Forms/OwnerStudioHours_AddNew";
import AddStudioPhotos from "../ImageGallery/AddStudioPhotos";
import PageLoading from "../PageLoading";
import useFirestore from "../../hooks/useFirestore";
import { useAuth } from "../../Context/AuthContext";
import useStorage_studios from "../../hooks/useStorage_studios";
import {useSnackbar} from 'notistack'

const steps = ["Name & Address", "Operating Hours", "Photos"];

export default function HorizontalLinearStepper({ closeModal }) {
  const { userProfile } = useAuth();
  const { uploadStudioDoc } = useStorage_studios();
  const { addStudio, deleteStudioDocs, addStudioDoc, saveStudioData_Nested } =
    useFirestore();
  const { enqueueSnackbar, closeSnackbar} = useSnackbar()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [saveEnabled, setSaveEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [studioInfo, setStudioInfo] = React.useState({
    name: "-",
    description: "-",
    rate: '',
    address: "-",
    city: "-",
    state: "MA",
    zip: "-",
    phone: "-",
  });

  const collectStudioInfo = (info) => {
    setStudioInfo(info);
    handleNext();
  };

  const [studioHours, setStudioHours] = React.useState({
    0: { index: 0, day: "Monday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    1: {
      index: 1,
      day: "Tuesday",
      openTime: "06:00 AM",
      closeTime: "09:00 PM",
    },
    2: {
      index: 2,
      day: "Wednesday",
      openTime: "06:00 AM",
      closeTime: "09:00 PM",
    },
    3: {
      index: 3,
      day: "Thursday",
      openTime: "06:00 AM",
      closeTime: "09:00 PM",
    },
    4: { index: 4, day: "Friday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    5: {
      index: 5,
      day: "Saturday",
      openTime: "06:00 AM",
      closeTime: "09:00 PM",
    },
    6: { index: 6, day: "Sunday", openTime: "06:00 AM", closeTime: "09:00 PM" },
  });

  const collectStudioHours = (info) => {
    setStudioHours(info);
    console.log(info);
  };

  const [imageList, setImageList] = React.useState([]);
  const [mainImage, setMainImage] = React.useState({
    dataUrl: null,
    file: null,
  });

  React.useEffect(() => {
    if (mainImage.file !== null && activeStep === 2) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  }, [studioHours, studioInfo, mainImage, imageList, activeStep]);

  async function saveNewStudio() {
    setSaveEnabled(false);
    setLoading(true);
    console.log("SAVING!!!");

    //Add Studio info to Firestore
    const newId = await addStudio(studioInfo);

    // Add studio Hours to Firestore
    addStudioDoc(newId, "StudioHours", studioHours);

    //Add mainImage to both Storage and Firestore
    const url = await uploadStudioDoc(newId, "MainImage", mainImage["file"], true);

    // Add all images in imgeList to Storage & Firestore
    imageList.forEach(image => {
        console.log('Saving image to firestore!!!')
        uploadStudioDoc(newId, "StudioImages", image['file'], false);
    })

    enqueueSnackbar('New Studio Added', {variant: 'success'})

    closeModal();
  }

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {loading && <PageLoading />}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        <Box sx={{ minHeight: "500px" }}>
          {activeStep === 0 && (
            <Box sx={{ mt: 3 }}>
              <OwnerStudioInformation_AddNew
                values={studioInfo}
                collectStudioInfo={collectStudioInfo}
              />
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <OwnerStudioHours_AddNew
                values={studioHours}
                collectStudioHours={collectStudioHours}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <AddStudioPhotos
                mainImage={mainImage}
                setMainImage={setMainImage}
                imageList={imageList}
                setImageList={setImageList}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Button onClick={handleBack}>Back</Button>
              </Box>
            </Box>
          )}
        </Box>
      </React.Fragment>
      <Box>
        <Button variant="outlined" onClick={closeModal}>
          Cancel
        </Button>
        {saveEnabled === true && (
          <Button variant="contained" sx={{ m: 2 }} onClick={saveNewStudio}>
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
}
