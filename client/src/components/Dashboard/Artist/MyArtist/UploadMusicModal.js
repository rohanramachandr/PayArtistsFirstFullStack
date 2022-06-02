import React, { useContext, useEffect, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Modal, Fade, Typography, Backdrop, IconButton, Grid, TextField, Avatar, Button, FormLabel, Divider } from '@material-ui/core';

import CloseIcon from '@mui/icons-material/Close';

import { DashboardContext } from '../../DashboardContext';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '95%',
    width: '95%',
    bgcolor: 'background.paper',
    border: '2px solid black',
    boxShadow: 24,
    p: 4
};

// const textFieldStyle = {
//     width: '100%',
//     margin: '5% 10%'

// };

// const progressStyle = {
//     width: '50%',
//     height: '50%',

// };

const closeIconStyle = {
    position: 'absolute',
    top: "5px",
    right: "5px"

};

function UploadMusicModal({ artistUsername }) {
    const { uploadMusicOpen, setUploadMusicOpen } = useContext(DashboardContext);
    // const [formState, setFormState] = useState("notSubmitted");//notSubmitted  or creating or finished or error
    // const [formData, setFormData] = useState({ artistUsername: "", artistName: "" });
    // const [artistUsername, setArtistUsername] = useState("");
    // const [errors, setErrors] = useState({ artistUsername: [], artistName: [] });
    // const [errorFlag, setErrorFlag] = useState(true);
    const [artistInfo, setArtistInfo] = useState({ artistName: "" });
    const [formData, setFormData] = useState({ albumName: "", albumArtwork: null, albumArtworkUrl: null });


    useEffect(() => {

        async function getArtistData() {
            const { data: { artistName } } = await axios.get(`/api/artists/${artistUsername}`);
            console.log("got artist name", artistName)
            setArtistInfo({ artistName });
        }

        getArtistData();

    }, [artistUsername])

    const handleClose = () => {
        setUploadMusicOpen(false);
    };

    const deleteAlbumArtwork = () => {
        setFormData({ ...formData, albumArtwork: null, albumArtworkUrl: null })
    };


    const onImageFileChange = (event) => {
        setFormData({ ...formData, albumArtwork: event.target.files[0], albumArtworkUrl: URL.createObjectURL(event.target.files[0]) })
    };




    return (


        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={uploadMusicOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            color="primary"
        >
            <Fade in={uploadMusicOpen}>
                <Box sx={style}><IconButton aria-label="delete" style={closeIconStyle} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>


                    <Typography id="transition-modal-title" variant="h6" style={{ textAlign: "center" }} >
                        Upload Music
                    </Typography>
                    <form onSubmit={() => alert("saved")}><Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        style={{ marginTop: "15px" }}
                    >


                        <Grid item>
                            <TextField label="Number Of Songs" variant="filled" color='primary' type="number" required />
                        </Grid>
                        <Grid item>
                            <TextField variant="filled" label="Artist Name" value={artistInfo.artistName} color='primary' type="text" disabled />
                        </Grid>
                        <Grid item>
                            <TextField variant="filled" label="Artist Username" value={artistUsername} color='primary' type="text" disabled />
                        </Grid>
                        <Grid item>
                                <Divider light={false} style={{width: "230px"}}/>
                        </Grid>
                        <Grid item>
                            <FormLabel>
                                Album Artwork
                            </FormLabel>
                        </Grid>
                        {<Grid item >
                            <Avatar label="Album Artwork" src={formData.albumArtworkUrl} variant="square" style={{
                                width: "215px",
                                height: "215px",  
                                border: `${formData.albumArtworkUrl ? '2px solid #ec148c' : 'none'}`,
                                borderRadius: '12px'
                            
                            }} ><FileUploadIcon  sx={{ fontSize: 80 }} /></Avatar>
                        </Grid>}

                        <Grid item>
                            {formData.albumArtwork ?
                                <Button variant="contained" color="primary" onClick={() => deleteAlbumArtwork()}>Delete Photo</Button>

                                :

                                <Button
                                    variant="contained"
                                    component="label"
                                    color="primary"

                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(event) => onImageFileChange(event)}
                                    />
                                </Button>

                            }
                        </Grid>



                    </Grid>
                    </form>








                </Box>
            </Fade>
        </Modal>

    );
};



export default UploadMusicModal;