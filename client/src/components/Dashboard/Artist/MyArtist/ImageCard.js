import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, Avatar } from '@material-ui/core';
import './ImageCard.css'

const ImageCard = ({ imgSrc, deletePhoto }) => {
    console.log("imgSrc", imgSrc)
    const darkBackground = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgSrc})`;
    console.log("darkBackground", darkBackground);

    const renderContent = () => {

        if (imgSrc) {
            return (
                <div className="imageCard">
                    
                    <Avatar
     
          style={{
            width: "215px",
            height: "215px",
            boxShadow: "#0000008c 1px 3px 8px"
          }}
          alt="music thumbnail"
          src={imgSrc}
          
        />



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