import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, Grid, FormHelperText} from '@material-ui/core';
import ImageCard from './ImageCard';

const steps = ['Create Name', 'Upload Artwork', 'Upload Songs'];

const WizardForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formData, setFormData] = useState({ albumName: "", albumArtwork: null, albumArtworkUrl: null });
  const [errors, setErrors] = useState({ albumName: [] });
  const [errorFlag, setErrorFlag] = useState(true);




  useEffect(() => {

    setErrors({ albumName: [] });
    setErrorFlag(true);
    const timeoutID = setTimeout(async () => {
      console.log("formData", formData);

      let tempErrors = { albumName: [] };
      if (formData.albumName.trim().length === 0) {
        tempErrors.albumName.push("Album name cannot contain only whitespace")
      }

      if (formData.albumName.trim().length > 40) {
        tempErrors.albumName.push("Album name must be less than 40 characters")
      }

      if (tempErrors.albumName.length !== 0) {
        setErrorFlag(true);
      }
      else {
        setErrorFlag(false)
      }
      setErrors(tempErrors);
      // Send Axios request here
    }, 2000)


    return () => clearTimeout(timeoutID);

  }, [formData]);

  const deleteAlbumArtwork = () => {
    setFormData({...formData, albumArtwork: null, albumArtworkUrl: null})
  };


  const isStepOptional = (step) => {
    return false;

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

  const onImageFileChange = (event) => {
    setFormData({ ...formData, albumArtwork: event.target.files[0], albumArtworkUrl: URL.createObjectURL(event.target.files[0])})
  };

  const renderFormContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>

            <Grid item >
              <Typography id="transition-modal-description" variant="body1" style={{ width: '100%', textAlign: 'center' }}>
                Select Album Cover Artwork
              </Typography>
            </Grid>
             <Grid item >
                <ImageCard imgSrc={formData.albumArtworkUrl} deletePhoto={deleteAlbumArtwork}/>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                component="label"
                color="primary"
                helperText={"Helper text"}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => onImageFileChange(event)}
                />
              </Button>
            
              
            </Grid>
            <Grid item>
            {formData.albumArtwork && <FormHelperText style={{textAlign: 'center', paddingTop: 0}}>{formData.albumArtwork.name}</FormHelperText>}
            </Grid>

            
            




          </>

        );
      case 2:
        return (
          <>

            <Grid item >
              <Typography id="transition-modal-description" variant="body1" style={{ width: '100%', textAlign: 'center' }}>
                Upload Songs
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                component="label"
                helperText={"Helper text"}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => onImageFileChange(event)}
                />
              </Button>
            
              {formData.albumArtwork && <FormHelperText style={{textAlign: 'center'}}>{formData.albumArtwork.name}</FormHelperText>}
            </Grid>

            
            




          </>

        );


      default:
        return (
          <>

            <Grid item >
              <Typography id="transition-modal-description" variant="body1">
                Enter Album Name
              </Typography>
            </Grid>
            <Grid item style={{ width: '75%' }}>
              <TextField id="standard-basic" label="Album Name" variant="standard" color='primary' value={formData.albumName} helperText={errors.albumName.length !== 0 && formData.albumName !== "" ? errors.albumName[0] : "ex. The College Dropout"} error={errors.albumName.length !== 0 && formData.albumName !== ""} required style={{ width: '100%' }} onChange={(e) => {
                setFormData({ ...formData, albumName: e.target.value });
              }} />
            </Grid>




          </>

        );

    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} style={{ paddingRight: "0", paddingLeft: "0" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
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
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ marginTop: "15px" }}
          >
            {renderFormContent()}

          </Grid>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} disabled={errorFlag}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </>
  );
};

export default WizardForm;
