import React, { useContext } from 'react';

import { Box, Modal, Fade, Typography, Backdrop, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import Stepper from './WizardForm';
import { DashboardContext } from '../../DashboardContext'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    width: '95%',
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

function AddAlbumModal() {
    const { addAlbumOpen, setAddAlbumOpen } = useContext(DashboardContext);
    // const [formState, setFormState] = useState("notSubmitted");//notSubmitted  or creating or finished or error
    // const [formData, setFormData] = useState({ artistUsername: "", artistName: "" });
    // const [artistUsername, setArtistUsername] = useState("");
    // const [errors, setErrors] = useState({ artistUsername: [], artistName: [] });
    // const [errorFlag, setErrorFlag] = useState(true);

    const handleClose = () => {
        setAddAlbumOpen(false);
    };

 
    return (


        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={addAlbumOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            color="primary"
        >
            <Fade in={addAlbumOpen}>
                <Box sx={style}><IconButton aria-label="delete" style={closeIconStyle} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                
                    
                <Typography id="transition-modal-title" variant="h6" style={{ textAlign: "center" }} >
                            Create An Album
                        </Typography>
                       
                            <Stepper />
                     
                       

                  



                </Box>
            </Fade>
        </Modal>

    );
}

export default AddAlbumModal;