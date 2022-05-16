import React, {useContext} from 'react';
import {Box, Modal, Fade, Typography, Backdrop, TextField, Button} from '@mui/material';
import { DashboardContext } from '../DashboardContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const submitButtonStyles = {
    backgroundColor: '#ec148c',
    position: "absolute",
    bottom: "10px",
    right: "10px",
    


};

export default function BecomeArtistModal() {
    const {becomeArtistOpen, setBecomeArtistOpen} = useContext(DashboardContext);
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
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Set Up An Artist Profile
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Please create a unique artist username
                    </Typography>
                    <TextField  id="standard-basic" label="Artist Username" variant="standard" color='primary' helperText="This username is already taken" />
                    <Button style={submitButtonStyles} variant="contained">Create Artist Profile</Button>
 
                </Box>
            </Fade>
        </Modal>

    );
}