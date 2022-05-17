import React, { useContext } from 'react';
import { Box, Modal, Fade, Typography, Backdrop, TextField, Button, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { DashboardContext } from '../DashboardContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 350,
    '@media screen and (max-width: 820px)': {
        width: '95%'
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
    const handleClose = () => setBecomeArtistOpen(false);

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
        >
            <Fade in={becomeArtistOpen}>
                <Box sx={style}>
                    <IconButton aria-label="delete" style={closeIconStyle} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{marginTop: "15px"}}
                    >
                        <Typography id="transition-modal-title" variant="h6" component="h2" fullWidth>
                            Set Up An Artist Profile
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 10 }} fullWidth>
                            Create a unique artist username
                        </Typography>
                        <TextField id="standard-basic" label="Artist Username" variant="standard" color='primary' helperText="This username is already taken" style={textFieldStyle} />
                        <Button variant="contained" color="primary" >Create Artist Profile</Button>

                    </Grid>



                </Box>
            </Fade>
        </Modal>

    );
}