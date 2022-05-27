import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@material-ui/core';
import './ImageCard.css'

const ImageCard = ({ imgSrc, deletePhoto }) => {
    console.log("imgSrc", imgSrc)
    const darkBackground = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgSrc})`;
    console.log("darkBackground", darkBackground);

    const renderContent = () => {

        if (imgSrc) {
            return (
                <div className="imageCard" style={{ backgroundImage: darkBackground }}>
                    <Tooltip className="close" title="Delete Photo">
                        <CloseIcon style={{ color: "#fff" }} onClick={() => deletePhoto()} />
                    </Tooltip>



                </div>

            );
        }


        return <div className="imageCard"></div>;

    };


    return (
        <>
            {renderContent()}
        </>


    );

};

export default ImageCard;