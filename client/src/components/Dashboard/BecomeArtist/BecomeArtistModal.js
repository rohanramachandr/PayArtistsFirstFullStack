import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Box, Modal, Fade, Typography, Backdrop, TextField, Button, Grid, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { DashboardContext } from '../DashboardContext';
import * as actions from '../../../actions';

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

const progressStyle = {
    width: '50%',
    height: '50%',

};

const closeIconStyle = {
    position: 'absolute',
    top: "5px",
    right: "5px"

};

function BecomeArtistModal({ createArtist, fetchUser, fetchUserArtistUsername }) {
    const { becomeArtistOpen, setBecomeArtistOpen } = useContext(DashboardContext);
    const [formState, setFormState] = useState("notSubmitted");//notSubmitted  or creating or finished or error
    const [formData, setFormData] = useState({ artistUsername: "", artistName: "" });
    const [artistUsername, setArtistUsername] = useState("");
    const [errors, setErrors] = useState({ artistUsername: [], artistName: [] });
    const [errorFlag, setErrorFlag] = useState(true);

    const handleClose = () => {
        setBecomeArtistOpen(false);


    };

    useEffect(() => {
        if (becomeArtistOpen) {
            setFormState('notSubmitted');
        }

    }, [becomeArtistOpen])



    useEffect(() => {

        setErrors({ artistUsername: [], artistName: [] });
        setErrorFlag(true);


        const timeoutID = setTimeout(async () => {
            console.log("formData", formData);

            let tempErrors = { artistUsername: [], artistName: [] };
            if (formData.artistUsername.trim().length === 0) {
                tempErrors.artistUsername.push("Username is required")
            }
            if (formData.artistUsername.trim().length < 5) {
                tempErrors.artistUsername.push("Username must be at least 5 characters")
            }
            if (formData.artistUsername.trim().length > 20) {
                tempErrors.artistUsername.push("Username must be less than 20 characters")
            }
            if (/\s/.test(formData.artistUsername)) {
                tempErrors.artistUsername.push("Username must not contain any whitespace")
            }
            if (formData.artistUsername.trim().length !== 0) {
                const res = await axios.get(`/api/artists/username/isvalid/${formData.artistUsername}`);
                console.log("response", res);
                if (!res.data) {
                    tempErrors.artistUsername.push("This username is already taken");
                }
            }
            if (formData.artistName.trim().length > 30) {
                tempErrors.artistName.push("Artist name must be less than 30 characters")
            }
            if (formData.artistName.trim().length === 0) {
                tempErrors.artistName.push("Artist name is required")
            }


            //TODO check if username is unique
            if (tempErrors.artistUsername.length !== 0 || tempErrors.artistName.length !== 0) {
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


    const renderContent = () => {
        switch (formState) {


            case 'loading':
                return (
                    <>
                        <CircularProgress style={progressStyle} />
                        <Typography id="transition-modal-title" variant="h6" style={{ marginTop: '30px' }} >
                            Creating your artist profile
                        </Typography>
                    </>


                );

            case 'error':
                return (
                    <>
                        <Typography id="transition-modal-title" variant="h6">
                            Sorry!
                        </Typography>

                        <Typography id="transition-modal-description" variant="body1" style={{ padding: '20px 0' }}>
                            We could not create your profile
                        </Typography>
                        <Typography id="transition-modal-description" variant="body1">
                            Please try again later
                        </Typography>

                        <Button variant="contained" color="primary" onClick={() => {
                            handleClose();

                        }} style={{ marginTop: '20px' }}>Return To Dashboard</Button>
                    </>


                );

            case 'finished':
                return (
                    <>
                        <Typography id="transition-modal-title" variant="h6" >
                            Congrats!
                        </Typography>

                        <Typography id="transition-modal-description" variant="body1" style={{ padding: '20px 0' }} >
                            We created your artist profile!
                        </Typography>
                       
                        <Link className="playingBarLink" to={`/${formData.artistUsername}`} onClick={() => handleClose()}>
                            <Button variant="contained" color="primary" xs={12}  style={{ marginTop: '20px' }}>Go to my profile</Button>
                        </Link>
                        
                    </>


                );



            default:
                return (
                    <>

                        <Typography id="transition-modal-title" variant="h6" >
                            Set Up An Artist Profile
                        </Typography>
                        <Typography id="transition-modal-description" variant="body1" >
                            Create a unique artist username
                        </Typography>
                        <TextField id="standard-basic" label="Artist Username" variant="standard" value={formData.artistUsername} color='primary' helperText={errors.artistUsername.length !== 0 && formData.artistUsername !== "" ? errors.artistUsername[0] : "ex. thebeatles"} required error={errors.artistUsername.length !== 0 && formData.artistUsername !== ""} style={textFieldStyle} onChange={(e) => {
                            setFormData({ ...formData, artistUsername: e.target.value });
                        }} />
                        <TextField id="standard-basic" label="Artist Name" variant="standard" value={formData.artistName} color='primary' helperText={errors.artistName.length !== 0 && formData.artistName !== "" ? errors.artistName[0] : "ex. The Beatles"} required error={errors.artistName.length !== 0 && formData.artistName !== ""} style={textFieldStyle} onChange={(e) => {
                            setFormData({ ...formData, artistName: e.target.value });
                        }} />
                        <Button variant="contained" color="primary" disabled={errorFlag} onClick={async () => {
                            setFormState('loading');

                            try {
                                await createArtist(formData.artistName, formData.artistUsername)
                                setFormState('finished');
                                await fetchUser();
                                await fetchUserArtistUsername();
                            }
                            catch (err) {
                                setFormState('error');
                            }


                        }

                        }>Create Artist Profile</Button>


                    </>

                );

        }
    };




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
                <Box sx={style}><IconButton aria-label="delete" style={closeIconStyle} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{ marginTop: "15px" }}
                    >
                        {renderContent()}

                    </Grid>



                </Box>
            </Fade>
        </Modal>

    );
}

export default connect(null, actions)(BecomeArtistModal);