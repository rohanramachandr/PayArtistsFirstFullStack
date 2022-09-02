import React from "react";
import {

  Grid,

} from "@material-ui/core/";

import {
  ExpandMore,

} from "@material-ui/icons/";
import VolumeController from "./VolumeController";





const TopBar = ({ song, player, setPlayerState, history }) => {
//   const { snackbarMsg } = useContext(GlobalContext);

 



  const minimizePlayer = () => {
   // history.goBack()
    setPlayerState("minimized");
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      direction="row"
      style={{
        padding: " 0 10px",
        marginTop: "10px",
        position: "absolute",
        top: "0"
      }}
    >
      <VolumeController player={player} />
    

 

      <ExpandMore
        onClick={minimizePlayer}
        color="primary"
        fontSize="large"
        style={{ transform: "translateY(-7px)" }}
      />
    </Grid>
  );
};

export default TopBar;