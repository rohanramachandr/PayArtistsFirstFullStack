import React, { useContext, useState, useEffect } from 'react';
import { Box, Modal, Fade, Typography, Backdrop, TextField, Button, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { DashboardContext } from '../DashboardContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 350,
    '@media screen and (max-width: 500px)': {
        width: '95%'
    },
    bgcolor: 'background.paper',
    border: '2px solid black',
    boxShadow: 24,
    p: 4
};

const textFieldStyle = {
    width: '100%',
    margin: '5% 10%'

};



const closeIconStyle = {
    position: 'absolute',
    top: "5px",
    right: "5px"

};

export default function BecomeArtistModal() {
    const { becomeArtistOpen, setBecomeArtistOpen } = useContext(DashboardContext);
    const [artistUsername, setArtistUsername] = useState("");
    const [errors, setErrors] = useState([]);

    
    const handleClose = () => setBecomeArtistOpen(false);


    useEffect(() => {

     
        const delayDebounceFn = setTimeout(async () => {
            console.log("artistUsername", artistUsername);
         
            let tempErrors = [];
            if (artistUsername.length < 5) {
                tempErrors.push("Username must be at least 5 characters")
            }
            if (artistUsername.length > 20) {
                tempErrors.push("Username must be less than 20 characters")
            }
            if (/\s/.test(artistUsername)) {
                tempErrors.push("Username must not contain any whitespace")
            }
            const res = await axios.get(`/api/artists/username/isvalid/${artistUsername}`);
            console.log("response", res);
            if (!res.data) {
                 tempErrors.push("This username is already taken");
            }
            //TODO check if username is unique
            setErrors(tempErrors);
            // Send Axios request here
          }, 1500)
      
          return () => clearTimeout(delayDebounceFn);

    }, [artistUsername]);




    return (


        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={becomeArtistOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            color="primary"
        >
            <Fade in={becomeArtistOpen}>
                <Box sx={style}>
                    <IconButton aria-label="delete" style={closeIconStyle} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{marginTop: "15px"}}
                    >
                        <Typography id="transition-modal-title" variant="h6" >
                            Set Up An Artist Profile
                        </Typography>
                        <Typography id="transition-modal-description" variant="body1" >
                            Create a unique artist username
                        </Typography>
                        <Typography id="transition-modal-description" variant="body2"  >
                            ex. thebeatles
                        </Typography>
                        <TextField id="standard-basic" label="Artist Username" variant="standard" color='primary' helperText={errors.length !==0 && artistUsername !== "" ? errors[0] : null} required  error={errors.length !==0 && artistUsername !== ""} style={textFieldStyle} onChange={(e) => {
                            setArtistUsername(e.target.value);
                        }}/>
                        <Button variant="contained" color="primary" >Create Artist Profile</Button>

                    </Grid>



                </Box>
            </Fade>
        </Modal>

    );
}