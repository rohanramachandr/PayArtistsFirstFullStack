import React, { Fragment, useContext, useEffect, useState, useRef, useCallback } from 'react';
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Modal, Fade, Typography, Backdrop, IconButton, Grid, TextField, Avatar, Button, FormLabel, Divider, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { DashboardContext } from '../../DashboardContext';
import logo from '../../../../images/logo.png';
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

const graphicStyle = {
    width: '200px',
    height: '200px'
   
  
   


};


function UploadMusicModal({ artistUsername, artistName, uploadMusic, artistId }) {
    const { uploadMusicOpen, setUploadMusicOpen } = useContext(DashboardContext);
    // const [formState, setFormState] = useState("notSubmitted");//notSubmitted  or creating or finished or error
    // const [formData, setFormData] = useState({ artistUsername: "", artistName: "" });
    // const [artistUsername, setArtistUsername] = useState("");
    // const [errors, setErrors] = useState({ artistUsername: [], artistName: [] });
    // const [errorFlag, setErrorFlag] = useState(true);


    const [formState, setFormState] = useState("finished"); //initial, uploading, error, finished
    const [formData, setFormData] = useState({ general: { artistId: "", artistUsername, artistName: "", albumName: "", genre: null, numberOfTracks: 1, albumArtwork: null, albumArtworkUrl: null }, tracks: [{ title: "", audioFile: null, cover: null, hasLyrics: null, price: 0, duration: null, mediaType: null }] });
    const [genreLabels, setGenreLabels] = useState([]);


    const [currentMusicFile, setCurrentMusicFile] = useState({ index: null, file: null, mediaType: null });
    const audioPlayer = useRef(null);


    const [errors, setErrors] = useState({ albumName: [], numberOfTracks: [], genre: [], albumArtwork: [], tracks: [{ title: [], audioFile: [], cover: [], hasLyrics: [], price: [] }] });//array for each active step








    useEffect(() => {
        setFormData(formData => { return { ...formData, general: { ...formData.general, artistName } } });

    }, [artistName]);

    useEffect(() => {
        setFormData(formData => { return { ...formData, general: { ...formData.general, artistId } } });

    }, [artistId]);



    useEffect(() => {


        const getGenreLabels = async () => {
            const { data } = await axios.get("/api/genre/labels");
            console.log("genre labels", data)
            setGenreLabels([...data]);
        };

        getGenreLabels();



    }, []);




    const updateTracks = useCallback(() => {

        var i = 0;
        if (!isNaN(formData.general.numberOfTracks) && formData.general.numberOfTracks > 0) {
            let newTracks = [...formData.tracks];
            console.log("newTrakcs", newTracks.slice())
            let newErrorTracks = [...errors.tracks];
            if (formData.general.numberOfTracks > formData.tracks.length) {
                const numNewTracks = formData.general.numberOfTracks - formData.tracks.length;
                for (i = 0; i < numNewTracks; i++) {
                    newTracks.push({ title: "", audioFile: null, cover: null, hasLyrics: null, price: 0, duration: null, mediaType: null });
                    newErrorTracks.push({ title: [], audioFile: [], cover: [], hasLyrics: [], price: [] });

                }
            }
            else {
                const numRemovedTracks = formData.tracks.length - formData.general.numberOfTracks;
                for (i = 0; i < numRemovedTracks; i++) {
                    newTracks.pop();
                    newErrorTracks.pop();

                }


            }

            setFormData(formData => { return { ...formData, tracks: [...newTracks] } });
            setErrors(errors => { return { ...errors, tracks: [...newErrorTracks] } })

        }

    }, [formData, errors.tracks]);


    useEffect(() => {
        console.log("calling update tracks");
        updateTracks();

    }, [formData.general.numberOfTracks]);

    useEffect(() => {
        if (audioPlayer.current) {

            audioPlayer.current.load();
        }


    }, [currentMusicFile]);


    const submitForm = () => {
        let tempErrors = { albumName: [], numberOfTracks: [], genre: [], albumArtwork: [], tracks: [] };

        if (formData.general.albumName.trim().length === 0) {
            tempErrors.albumName.push("Album name is required");
        }

        if (formData.general.albumName.trim().length >= 40) {
            tempErrors.albumName.push("Album name must be less than 40 characters");
        }
        if (!formData.general.genre) {
            tempErrors.genre.push("Genre is required");
        }
        if (isNaN(formData.general.numberOfTracks)) {
            tempErrors.numberOfTracks.push("Number of tracks is required");
        }
        if (!isNaN(formData.general.numberOfTracks) && (formData.general.numberOfTracks <= 0 || formData.general.numberOfTracks > 40)) {
            tempErrors.numberOfTracks.push("Number of tracks must be greater than 0 and less than 40");
        }
        if (!formData.general.albumArtwork) {
            tempErrors.albumArtwork.push("Album artwork is required");
        }
        let numTrackErrors = 0;
        formData.tracks.forEach((track, index) => {
            let trackError = { title: [], audioFile: [], cover: [], hasLyrics: [], price: [] };
            if (track.title === "") {
                trackError.title.push(`Track ${index + 1} must have a title`);
            }
            if (!track.audioFile) {
                trackError.audioFile.push(`Track ${index + 1} must have an audio file`);
            }
            if (track.cover === null) {
                trackError.cover.push(`This field is required`);
            }
            if (track.hasLyrics === null) {
                trackError.hasLyrics.push(`This field is required`);
            }
            if (isNaN(track.price)) {
                trackError.price.push(`Track price must be a number`);
            }
            if (!isNaN(track.price) && track.price < 0) {
                trackError.price.push(`Track price cannot be negative`);
            }

            if (trackError.title.length || trackError.audioFile.length || trackError.cover.length || trackError.hasLyrics.length || trackError.price.length) {
                numTrackErrors++;
                tempErrors.tracks.push({ ...trackError });
            }
            else {
                tempErrors.tracks.push({ title: [], audioFile: [], cover: [], hasLyrics: [], price: [] });
            }
        });

        console.log("formData", formData);
        if (tempErrors.albumName.length || tempErrors.genre.length || tempErrors.numberOfTracks.length || tempErrors.albumArtwork.length || numTrackErrors) {
            console.log("tempErrors", tempErrors);
            setErrors({ ...tempErrors });

            return;
        }

        //post request
        uploadMusic(formData);


    };

    const handleClose = () => {
        setUploadMusicOpen(false);
    };

    const deleteAlbumArtwork = () => {
        setFormData({ ...formData, general: { ...formData.general, albumArtwork: null, albumArtworkUrl: null } })
    };
    const deleteAudioFile = (index) => {
        var copyTracks = formData.tracks.slice();
        copyTracks[index].audioFile = null;
        copyTracks[index].duration = null;
        copyTracks[index].mediaType = null;
        setFormData({ ...formData, tracks: [...copyTracks] })
    };


    const onImageFileChange = (event) => {
        setFormData({ ...formData, general: { ...formData.general, albumArtwork: event.target.files[0], albumArtworkUrl: URL.createObjectURL(event.target.files[0]) } })
    };



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
        setFormData({ ...formData, tracks: [...copyTracks] });

    }
    const onAudioFileChange = (event, index) => {


        var copyTracks = formData.tracks.slice();
        copyTracks[index].audioFile = event.target.files[0];
        const fileType = event.target.files[0].name.split('.').pop();
        var mediaType = "";
        //TODO add more complex upload checking
        if (fileType === 'wav') {
            mediaType = 'audio/wav';

        }
        else {
            mediaType = 'audio/mpeg';
        }
        copyTracks[index].mediaType = mediaType;
        setCurrentMusicFile({ index, file: URL.createObjectURL(event.target.files[0]), mediaType });





        setFormData({ ...formData, tracks: [...copyTracks] })
    };

    const findGenreIdFromLabel = (name) => {
        var id = ""
        genreLabels.forEach(genre => {
            if (genre.label === name) {
                id = genre.id
            }
        });

        return id;
    }



    const mapTrackForms = () => {



        return formData.tracks.map((track, index) => {

            return (
                <Fragment key={index}>
                    <Grid item className="gridItem">
                        <Divider light={false} />
                    </Grid>

                    <Grid item className="gridItem">
                        <Typography variant="h6" >
                            {`Track ${index + 1}`}
                        </Typography>

                    </Grid>
                    <Grid item className="gridItem">

                        <TextField label="Track Title" variant="filled" color='primary' type="text" value={formData.tracks[index].title} required fullWidth onChange={(e) => {
                            var copyTracks = formData.tracks.slice();
                            copyTracks[index].title = e.currentTarget.value;
                            setFormData({ ...formData, tracks: [...copyTracks] });

                        }
                        }
                            error={errors.tracks[index].title.length > 0}
                            helperText={errors.tracks[index].title.length > 0 ? errors.tracks[index].title[0] : null}
                        />

                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Typography variant="subtitle1" gutterBottom={true}></Typography> */}
                        <TextField
                            label="Price USD $/Stream"
                            variant="filled"
                            type='number'
                            placeholder="$"
                            value={formData.tracks[index].price}
                            inputProps={{
                                step: ".01"
                            }}
                            fullWidth
                            onChange={(e) => {
                                var copyTracks = formData.tracks.slice();
                                copyTracks[index].price = parseFloat(e.currentTarget.value);
                                setFormData({ ...formData, tracks: [...copyTracks] });

                            }
                            }
                            error={errors.tracks[index].price.length > 0}
                            helperText={errors.tracks[index].price.length > 0 ? errors.tracks[index].price[0] : null}
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
                        <FormHelperText style={{ ...inputLabelStyle, color: formData.tracks[index].audioFile ? "rgba(0, 0, 0, 0.54)" : "red" }}>{formData.tracks[index].audioFile ? formData.tracks[index].audioFile.name : errors.tracks[index].audioFile.length > 0 ? errors.tracks[index].audioFile[0] : ""}</FormHelperText>
                    </Grid>

                    <Grid item className="gridItem">
                        <FormControl error={errors.tracks[index].hasLyrics.length > 0}>
                            <FormLabel>Is this track an instrumental?</FormLabel>
                            <FormHelperText>{errors.tracks[index].hasLyrics.length > 0 ? errors.tracks[index].hasLyrics[0] : null}</FormHelperText>
                            <RadioGroup
                                value={track.hasLyrics}
                                onChange={(e) => {
                                    var copyTracks = formData.tracks.slice();
                                    copyTracks[index].hasLyrics = e.currentTarget.value === 'true';
                                    setFormData({ ...formData, tracks: [...copyTracks] });

                                }}

                            >
                                <FormControlLabel value={false} control={<Radio />} label="Yes, this track does not contain lyrics" />
                                <FormControlLabel value={true} control={<Radio />} label="Nope, this song contains lyrics" />

                            </RadioGroup>

                        </FormControl>

                    </Grid>
                    <Grid item className="gridItem">
                        <FormControl error={errors.tracks[index].cover.length > 0}>
                            <FormLabel>Is this track a cover song?</FormLabel>
                            <FormHelperText>{errors.tracks[index].cover.length > 0 ? errors.tracks[index].cover[0] : null}</FormHelperText>
                            <RadioGroup
                                value={track.cover}
                                onChange={(e) => {
                                    var copyTracks = formData.tracks.slice();
                                    copyTracks[index].cover = e.currentTarget.value === 'true';
                                    setFormData({ ...formData, tracks: [...copyTracks] });

                                }}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Yes, another artist wrote this song" />
                                <FormControlLabel value={false} control={<Radio />} label="Nope, I wrote this song" />

                            </RadioGroup>
                        </FormControl>

                    </Grid>
                </Fragment>


            );

        });


    };


    const renderContent = () => {
        switch (formState) {


            case 'uploading':
                return (

                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={8}

                        className="formContainer"
                    >
                        <Grid item className="gridItem">
                            <Typography id="transition-modal-title" variant="h5" style={{ textAlign: "center" }} >
                                Uploading Your Music
                            </Typography>
                        </Grid>

                        <Grid item>
                           <CircularProgress style={graphicStyle}/> 
                        </Grid>


                        <Grid item className="gridItem" style={{ textAlign: "center" }}>
                        <Typography id="transition-modal-title" variant="h7" style={{ textAlign: "center" }} >
                               This will take a few moments
                            </Typography>
                        </Grid>

                       


                    </Grid>














                );

        

            case 'finished':
                return (


                    <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={8}

                    className="formContainer"
                >
                    <Grid item className="gridItem">
                        <Typography id="transition-modal-title" variant="h5" style={{ textAlign: "center" }} >
                            Upload Successful!
                        </Typography>
                    </Grid>

                    <Grid item>
                        <img src={logo} style={graphicStyle}/>

                        
                    </Grid>


                    <Grid item >

<Button variant="contained" color="primary">Return To Dashboard</Button>



</Grid>

                   


                </Grid>


                );



            default:
                return (
                    <Grid container
                        direction="column"
                        justifyContent="center"

                        spacing={2}

                        className="formContainer"
                    >



                        <Grid item className="gridItem">
                            <Typography id="transition-modal-title" variant="h5" style={{ textAlign: "center" }} >
                                Upload Music
                            </Typography>
                        </Grid>
                        <Grid item className="gridItem">
                            <Typography variant="h6" >
                                General Info
                            </Typography>

                        </Grid>
                        <Grid item className="gridItem">
                            <TextField variant="filled" label="Artist Name" value={artistName} color='primary' type="text" disabled fullWidth

                            />
                        </Grid>
                        <Grid item className="gridItem">
                            <TextField variant="filled" label="Artist Username" value={artistUsername} color='primary' type="text" disabled fullWidth />
                        </Grid>
                        <Grid item className="gridItem">
                            <TextField label="Album/Single Name" variant="filled" color='primary' type="text" required value={formData.general.albumName} error={errors.albumName.length > 0} helperText={errors.albumName.length > 0 ? errors.albumName[0] : null} onChange={(e) => {
                                setFormData({ ...formData, general: { ...formData.general, albumName: e.currentTarget.value } });
                            }}

                                fullWidth />
                        </Grid>
                        <Grid item className="gridItem">
                            <TextField label="Number Of Tracks" variant="filled" color='primary' type="number" defaultValue={1} error={errors.numberOfTracks.length > 0} helperText={errors.numberOfTracks.length > 0 ? errors.numberOfTracks[0] : null} required onChange={(e) => {
                                setFormData({ ...formData, general: { ...formData.general, numberOfTracks: parseInt(e.currentTarget.value) } });
                            }} fullWidth />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            {/* <Typography variant="subtitle1" gutterBottom={true}></Typography> */}

                            <Autocomplete
                                disablePortal

                                options={genreLabels}
                                fullWidth
                                blurOnSelect

                                onInputChange={(e, value) => {
                                    console.log("auto complete event", e, value)
                                    setFormData({ ...formData, general: { ...formData.general, genre: findGenreIdFromLabel(`${value}`) } });
                                }}

                                renderInput={(params) => <TextField {...params} label="Genre" variant="filled" color='primary' type="text" error={errors.genre.length > 0} helperText={errors.genre.length > 0 ? errors.genre[0] : null} />}

                            />
                        </Grid>
                        <Grid item className="gridItem">
                            <Divider light={false} />
                        </Grid>
                        <Grid item className="gridItem">

                            <Typography variant="h6" >
                                Album Artwork
                            </Typography>
                        </Grid>

                        {<Grid item className="gridItem">
                            <Avatar label="Album Artwork" src={formData.general.albumArtworkUrl} variant="square" style={{
                                width: "215px",
                                height: "215px",
                                border: `${formData.general.albumArtworkUrl ? '2px solid #ec148c' : 'none'}`,
                                borderRadius: '12px'

                            }} ><FileUploadIcon sx={{ fontSize: 80 }} /></Avatar>
                        </Grid>}

                        <Grid item className="gridItem">
                            {formData.general.albumArtwork ?
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
                            <FormHelperText style={{ ...inputLabelStyle, color: formData.general.albumArtwork ? "rgba(0, 0, 0, 0.54)" : "red" }}>{formData.general.albumArtwork ? formData.general.albumArtwork.name : errors.albumArtwork.length > 0 ? errors.albumArtwork[0] : ""}</FormHelperText>
                        </Grid>

                        {mapTrackForms()}

                        <Grid item className="gridItem">
                            <Divider light={false} />
                        </Grid>

                        <Grid item style={{ alignSelf: 'center' }}>

                            <Button variant="contained" color="primary" onClick={() => submitForm()}>Upload Music</Button>



                        </Grid>


                    </Grid>

                );

        }
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




                    {renderContent()}













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


export default connect(null, actions)(UploadMusicModal);
