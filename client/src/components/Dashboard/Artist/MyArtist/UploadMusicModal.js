import React, { useContext, useEffect, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Modal, Fade, Typography, Backdrop, IconButton, Grid, TextField, Avatar, Button, FormLabel, Divider, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

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
    overflow: 'scroll',
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

const inputLabelStyle = {
    marginTop: '-11px',
    textAlign: 'center'
}

function UploadMusicModal({ artistUsername }) {
    const { uploadMusicOpen, setUploadMusicOpen } = useContext(DashboardContext);
    // const [formState, setFormState] = useState("notSubmitted");//notSubmitted  or creating or finished or error
    // const [formData, setFormData] = useState({ artistUsername: "", artistName: "" });
    // const [artistUsername, setArtistUsername] = useState("");
    // const [errors, setErrors] = useState({ artistUsername: [], artistName: [] });
    // const [errorFlag, setErrorFlag] = useState(true);
    const [artistInfo, setArtistInfo] = useState({ artistName: "" });
    const [formData, setFormData] = useState({ albumName: "", albumArtwork: null, albumArtworkUrl: null, tracks: [{ title: null, audioFile: null, cover: null, isSongwriter: null }] });


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
    const deleteAudioFile = (index) => {
        var copyTracks = formData.tracks.slice();
        copyTracks[index].audioFile = null;
        setFormData({ ...formData, tracks: [...copyTracks] })
    };


    const onImageFileChange = (event) => {
        setFormData({ ...formData, albumArtwork: event.target.files[0], albumArtworkUrl: URL.createObjectURL(event.target.files[0]) })
    };


    const onAudioFileChange = (event, index) => {
        var copyTracks = formData.tracks.slice();
        copyTracks[index].audioFile = event.target.files[0];
        setFormData({ ...formData, tracks: [...copyTracks] })
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
                            <TextField label="Album/Single Name" variant="filled" color='primary' type="text" required />
                        </Grid>
                        <Grid item>
                            <TextField label="Number Of Tracks" variant="filled" color='primary' type="number" required />
                        </Grid>
                        <Grid item>
                            <TextField variant="filled" label="Artist Name" value={artistInfo.artistName} color='primary' type="text" disabled />
                        </Grid>
                        <Grid item>
                            <TextField variant="filled" label="Artist Username" value={artistUsername} color='primary' type="text" disabled />
                        </Grid>
                        <Grid item>
                            <Divider light={false} style={{ width: "230px" }} />
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

                            }} ><FileUploadIcon sx={{ fontSize: 80 }} /></Avatar>
                        </Grid>}

                        <Grid item>
                            {formData.albumArtwork ?
                                <Button variant="contained" color="default" onClick={() => deleteAlbumArtwork()}>Delete Photo</Button>

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

                        <Grid item>
                            <Divider light={false} style={{ width: "230px" }} />
                        </Grid>

                        <Grid item>
                            <FormLabel>
                                Track 1
                            </FormLabel>
                        </Grid>
                        <Grid item>

                            <TextField label="Track 1 Title" variant="filled" color='primary' type="text" required />

                        </Grid>
                        <Grid item>

                            {formData.tracks[0].audioFile ?
                                <Button variant="contained" color="default" onClick={() => deleteAudioFile(0)}>Delete Audio File</Button>

                                :

                                <>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"

                                    >
                                        Upload Audio File
                                        <input
                                            type="file"
                                            accept=".wav,.mp3"
                                            hidden
                                            onChange={(event) => onAudioFileChange(event, 0)}
                                        />
                                    </Button>

                                </>

                            }


                        </Grid>

                        <Grid item>
                            <FormHelperText style={inputLabelStyle}>{formData.tracks[0].audioFile ? formData.tracks[0].audioFile.name : ""}</FormHelperText>
                        </Grid>
                       
                        <Grid item>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Is this track an instrumental?</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel value={false} control={<Radio />} label="Nope, this song contains lyrics" />
                                    <FormControlLabel value={true} control={<Radio />} label="Yes, this track does not contain lyrics" />                                    
                                </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Grid item>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Is this track a cover song?</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel value={true} control={<Radio />} label="Nope, I wrote this song" />
                                    <FormControlLabel value={false} control={<Radio />} label="Yes, another artist wrote this song" />                                    
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item>

                            <TextField label="Songwriter's Real Name" placeholder='First Middle Lastname' variant="filled" color='primary' type="text" required />

                        </Grid>



                    </Grid>
                    </form>








                </Box>
            </Fade>
        </Modal>

    );
};



export default UploadMusicModal;