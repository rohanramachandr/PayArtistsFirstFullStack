import React from "react";
import { Link } from 'react-router-dom';

import { motion } from "framer-motion";
import { Avatar, Grid, Typography } from "@material-ui/core";







const MusicArt = ({ data, setPlayerState }) => {

  // const [artContainerStyle, setArtContainerStyle] = useState({
  //   background: `url(${circleSvg}) no-repeat`,
  //   padding: "18px",
  //   position: "relative",
  //   // transition: "transform 100ms",
  //   // transform: "translateY(0)"
  // });

  const artContainerStyle = {

    padding: "5px 18px",
    position: "relative",
    zIndex: "1"
  };







  // if we find the channel name is before the song title we will remove it
  //using the regex
  const shortTitle = data => {
    // this regex is to remove channel name from song title
    const re = new RegExp(data.title + " - | : ", "g");

    return data.title.replace(re, "");
  };



  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "40px" }}

    >
      <motion.div
        className="box"
        drag
        dragElastic={true}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        style={artContainerStyle}

      >
        {/* <FavoriteTwoTone className={"songHeart left"} style={heartStyle} />
        <FavoriteTwoTone className={"songHeart right"} style={heartStyle} /> */}
        <Avatar
          variant="square"
          style={{
            width: "40vh",
            height: "40vh",
            boxShadow: "#0000008c 1px 3px 8px"
          }}
          alt="music thumbnail"
          src={data.thumbnail}

        />
      </motion.div>
      <br />
      <Link className="playingBarLink" to={`/album/${data._album}`} onClick={() => setPlayerState('minimized')}><Typography style={{ width: "fit-content" }} color="primary" variant="h5" className="musicArtTitle" align="center">
        {shortTitle(data)}
      </Typography></Link>

      <Link className="playingBarLink" to={`/${data.artistUsername}`} onClick={() => setPlayerState('minimized')}><Typography style={{ width: "fit-content" }} color="primary" variant="subtitle1">
        {data.artistName}
      </Typography></Link>
      <br />
    </Grid>
  );
};

export default MusicArt;