import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { SkipNext, Close } from "@material-ui/icons";
import PlayPauseButton from "./PlayPauseButton";
import "./MiniMusicStyle.css";

const styles = {};

const MiniMuiscArt = ({ playPause, data, playNext, emptyPlayer }) => {
  // const getThumbnail = () => {
  //   // if the thumbnail is downloaded then get it from database or else use the url to fetch
  //   if (data.thumbnail) {
  //     return window.URL.createObjectURL(data.thumbnail);
  //   } else {
  //     return data.sdThumbnail;
  //   }
  // };

  return (
    <div className={"mainContainer"}>
      <div className={"overflow-hidden"}>
        <div className="details">
         
          <Link className="playingBarLink" to={`/dashboard/album/${data._album}`} onClick={(e) =>  e.stopPropagation()}><Typography variant="body1">{data.title}</Typography></Link>
          <Link className="playingBarLink" to={`/dashboard/artist/${data.artist}`} onClick={(e) =>  e.stopPropagation()}><Typography variant="body2">{data.artist}</Typography></Link>
          
        </div>
        <div className="buttons">
          <SkipNext onClick={playNext} />
          <Close onClick={emptyPlayer} />
        </div>
        <div className={"miniArtContainer"}>
          <div className={"mainArt"}>
            <img
              className={"miniArtImg"}
              src={data.thumbnail}
              alt="music art"
            />
            <PlayPauseButton
              player={playPause.player}
              minimized={playPause.minimized}
              audioState={playPause.audioState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMuiscArt;