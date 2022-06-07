import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Modal, Fade, Typography, Backdrop, IconButton, Grid, TextField, Avatar, Button, FormLabel, Divider, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { DashboardContext } from '../../DashboardContext';
import './UploadMusicModal.css'

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



const closeIconStyle = {
    position: 'absolute',
    top: "5px",
    right: "5px"

};

const inputLabelStyle = {
    marginTop: '-11px',
    textAlign: 'left'
}

function UploadMusicModal({ artistUsername, artistName }) {
    const { uploadMusicOpen, setUploadMusicOpen } = useContext(DashboardContext);
    // const [formState, setFormState] = useState("notSubmitted");//notSubmitted  or creating or finished or error
    // const [formData, setFormData] = useState({ artistUsername: "", artistName: "" });
    // const [artistUsername, setArtistUsername] = useState("");
    // const [errors, setErrors] = useState({ artistUsername: [], artistName: [] });
    // const [errorFlag, setErrorFlag] = useState(true);

    const [formData, setFormData] = useState({ albumName: "", numberOfTracks: 1, albumArtwork: null, albumArtworkUrl: null, tracks: [{ title: null, audioFile: null, cover: null, isSongwriter: null, price: 0, duration: null }] });
    const [genreLabels, setGenreLabels] = useState([]);
    const curTracksRef = useRef(formData.tracks);
    const [currentMusicFile, setCurrentMusicFile] = useState({index: null, file: null, mediaType: null});
    const audioPlayer = useRef(null);
    const player = audioPlayer.current;

    // audio.onloadedmetadata = () => {
    //     // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
    //     var duration = audio.duration;

    //     // example 12.3234 seconds
    //     console.log("The duration of the song is of: " + duration + " seconds");
    //     // Alternatively, just display the integer value with
    //     // parseInt(duration)
    //     // 12 seconds
    // };

    useEffect(() => {


        const getGenreLabels = async () => {
            const { data } = await axios.get("/api/genre/labels");
            setGenreLabels([...data]);
        };

        getGenreLabels();



    }, []);


    useEffect(() => {
        console.log("formData number of tracks", typeof (formData.numberOfTracks), formData.numberOfTracks)
        var i = 0;
        if (!isNaN(formData.numberOfTracks) && formData.numberOfTracks > 0) {
            let newTracks = [...curTracksRef.current];
            if (formData.numberOfTracks > curTracksRef.current.length) {
                const numNewTracks = formData.numberOfTracks - curTracksRef.current.length;
                for (i = 0; i < numNewTracks; i++) {
                    newTracks.push({ title: null, audioFile: null, cover: null, isSongwriter: null });

                }
            }
            else {
                const numRemovedTracks = curTracksRef.current.length - formData.numberOfTracks;
                for (i = 0; i < numRemovedTracks; i++) {
                    newTracks.pop();

                }


            }

            setFormData(formData => { return { ...formData, tracks: [...newTracks] } });

        }

    }, [formData.numberOfTracks]);

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

    useEffect(() => {
        if (audioPlayer.current) {
             audioPlayer.current.pause();
            audioPlayer.current.load();
        }
       

    }, [currentMusicFile])

    const formatTime = (seconds) => {
        var time = Math.round(seconds);
        var minutes = Math.floor(time / 60);
        seconds = time - minutes * 60;

        var extraZero = "";

        if (seconds < 10) {
            extraZero = "0";
        }
        return minutes + ":" + extraZero + seconds;
    };

    const updateDuration = () => {
        var copyTracks = formData.tracks.slice();
        copyTracks[currentMusicFile.index].duration = formatTime(audioPlayer.current.duration);
        setFormData({ ...formData, tracks: [...copyTracks] })

    }
    const onAudioFileChange = (event, index) => {


        var copyTracks = formData.tracks.slice();
        copyTracks[index].audioFile = event.target.files[0];
        //audio.src = event.target.files[0];
        //console.log("file music type",event.target.files[0].name.split('.').pop());
        const fileType = event.target.files[0].name.split('.').pop();
        var mediaType = "";
        if (fileType === 'wav') {
            mediaType = 'audio/wav';

        }
        else {
            mediaType = 'audio/mpeg';
        }

        setCurrentMusicFile({index, file: URL.createObjectURL(event.target.files[0]), mediaType});
        
        

    

        setFormData({ ...formData, tracks: [...copyTracks] })
    };

    const mapTrackForms = () => {



        return formData.tracks.map((track, index) => {

            return (
                <Fragment key={index}>
                    <Grid item className="gridItem">
                        <Divider light={false} />
                    </Grid>

                    <Grid item className="gridItem">
                        <FormLabel>
                            {`Track ${index + 1}`}
                        </FormLabel>
                    </Grid>
                    <Grid item className="gridItem">

                        <TextField label="Track Title" variant="filled" color='primary' type="text" required fullWidth />

                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Typography variant="subtitle1" gutterBottom={true}></Typography> */}
                        <TextField
                            label="Price USD $/Stream"
                            variant="filled"
                            type='number'
                            placeholder="$"
                            defaultValue={0.00}
                            inputProps={{
                                step: ".01"
                            }}
                            fullWidth
                        // onChange={(event, value)=> setValue(value)}
                        />
                    </Grid>
                    <Grid item className="gridItem">

                        {formData.tracks[index].audioFile ?
                            <Button variant="outlined" color="default" onClick={() => deleteAudioFile(index)}>Delete Audio File</Button>

                            :

                            <>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    color="primary"

                                >
                                    Upload Audio File
                                    <input
                                        type="file"
                                        accept=".wav,.mp3"
                                        hidden
                                        onChange={(event) => onAudioFileChange(event, index)}
                                    />
                                </Button>

                            </>

                        }


                    </Grid>

                    <Grid item className="gridItem">
                        <FormHelperText style={inputLabelStyle}>{formData.tracks[index].audioFile ? formData.tracks[index].audioFile.name : ""}</FormHelperText>
                    </Grid>

                    <Grid item className="gridItem">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Is this track an instrumental?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel value={false} control={<Radio />} label="Nope, this song contains lyrics" />
                                <FormControlLabel value={true} control={<Radio />} label="Yes, this track does not contain lyrics" />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                    <Grid item className="gridItem">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Is this track a cover song?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel value={true} control={<Radio />} label="Nope, I wrote this song" />
                                <FormControlLabel value={false} control={<Radio />} label="Yes, another artist wrote this song" />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                </Fragment>


            );

        });


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



                    <form onSubmit={() => alert("saved")}>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            
                            spacing={2}

                            className="formContainer"
                        >

                            <Grid item className="gridItem">
                                <Typography id="transition-modal-title" variant="h6" style={{ textAlign: "center" }} >
                                    Upload Music
                                </Typography>
                            </Grid>
                            <Grid item className="gridItem">
                                <FormLabel>
                                    General Info
                                </FormLabel>
                            </Grid>
                            <Grid item className="gridItem">
                                <TextField variant="filled" label="Artist Name" value={artistName} color='primary' type="text" disabled fullWidth />
                            </Grid>
                            <Grid item className="gridItem">
                                <TextField variant="filled" label="Artist Username" value={artistUsername} color='primary' type="text" disabled fullWidth />
                            </Grid>
                            <Grid item className="gridItem">
                                <TextField label="Album/Single Name" variant="filled" color='primary' type="text" required value={formData.albumName} onChange={(e) => {
                                    setFormData({ ...formData, albumName: e.currentTarget.value });
                                }} fullWidth />
                            </Grid>
                            <Grid item className="gridItem">
                                <TextField label="Number Of Tracks" variant="filled" color='primary' type="number" defaultValue={1} required onChange={(e) => {
                                    setFormData({ ...formData, numberOfTracks: parseInt(e.currentTarget.value) });
                                }} fullWidth />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                {/* <Typography variant="subtitle1" gutterBottom={true}></Typography> */}

                                <Autocomplete
                                    disablePortal

                                    options={genreLabels}
                                    fullWidth
                                    blurOnSelect
                                    renderInput={(params) => <TextField {...params} label="Genre" variant="filled" color='primary' type="text" />}
                                />
                            </Grid>
                            <Grid item className="gridItem">
                                <Divider light={false} />
                            </Grid>
                            <Grid item className="gridItem">
                                <FormLabel>
                                    Album Artwork
                                </FormLabel>
                            </Grid>

                            {<Grid item className="gridItem">
                                <Avatar label="Album Artwork" src={formData.albumArtworkUrl} variant="square" style={{
                                    width: "215px",
                                    height: "215px",
                                    border: `${formData.albumArtworkUrl ? '2px solid #ec148c' : 'none'}`,
                                    borderRadius: '12px'

                                }} ><FileUploadIcon sx={{ fontSize: 80 }} /></Avatar>
                            </Grid>}

                            <Grid item className="gridItem">
                                {formData.albumArtwork ?
                                    <Button variant="outlined" color="default" onClick={() => deleteAlbumArtwork()} >Delete Photo</Button>

                                    :

                                    <Button
                                        variant="outlined"
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
                            <Grid item className="gridItem">
                                <FormHelperText style={inputLabelStyle}>{formData.albumArtwork ? formData.albumArtwork.name : ""}</FormHelperText>
                            </Grid>

                            {mapTrackForms()}

                            <Grid item className="gridItem">
                                <Divider light={false}  />
                            </Grid>

                            <Grid item style={{ alignSelf: 'center' }}>

                                <Button variant="contained" color="primary" onClick={() => console.log(formData)}>Upload Music</Button>



                            </Grid>




                        </Grid>


                    </form>







                    <audio
                    
                   onLoadedMetadata={() => updateDuration()}
                    ref={audioPlayer}
                    
                >
<source
          src={currentMusicFile.file}
          type={currentMusicFile.mediaType}
        />

                </audio>
                </Box>
            </Fade>
      
        </Modal>

    );
};



export default UploadMusicModal;