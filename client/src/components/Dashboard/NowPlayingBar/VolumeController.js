import React, { useState } from "react";
import { Grid, Slider } from "@material-ui/core/";
import { VolumeUp } from "@material-ui/icons/";


const VolumeController = ({ player }) => {
  const [volume, setVolume] = useState(100);


  const volumeChange = (_e, newVal) => {
    setVolume(newVal);
    player.volume = newVal / 100;
  };


  return (

      <Grid container spacing={1} style={{ maxWidth: "320px" }}>
        <Grid item  xs={1}>
          <VolumeUp color="primary" />
        </Grid>
        <Grid item xs={3}>
          <Slider  value={volume} onChange={volumeChange} />
        </Grid>
      </Grid>
  );
};

export default VolumeController;