import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import loadingArtwork from "../../../images/loadingArtwork.jpg";
import {
  BsShuffle as Shuffle,
  BsFillSkipStartFill as Prev,
  BsFillSkipEndFill as Next,
  BsPlayCircle as Play,
  BsArrowRepeat as Repeat,
  BsPauseCircle as Pause,
  BsVolumeUpFill as Volume,
  BsVolumeMuteFill as Mute,
} from "react-icons/bs";
import "./NowPlayingBar.css";
import * as actions from "../../../actions/index";
import axios from 'axios';

const NowPlayingBar = ({
  playlist,
  currentSong,
  fetchPlaylist,
  fetchSongDetails,
  updateSongPlays,
  clickIndex,
  setPlaylistIndex,
  setClickIndex
}) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [mute, setMute] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [shuffleIndex, setShuffleIndex] = useState(null);
  const [originalIndex, setOriginalIndex] = useState(0);
 
  const [curTime, setCurTime] = useState("0.00");
  const [remTime, setRemTime] = useState("0.00");
  const nowPlayingBarContainerRef = useRef(null);
  const volumeBarRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressRef = useRef(null);
  const volumeProgressRef = useRef(null);
  const audioRef = useRef(new Audio());

  
  const playSong = useCallback((trackId = null) => {
    setPause(false);
    if (audioRef.current.currentTime === 0) {
        if (trackId !== null) {
          console.log("updating plays", trackId);
          updateSongPlays(trackId);
        }
     
      }
    
    audioRef.current.play();

  }, [updateSongPlays]);

  const pauseSong = () => {
    setPause(true)
    audioRef.current.pause();

  };

  // const s = useCallback(() => {
  //   setOpen(true)
  // }, [])

  

  const setTrack = useCallback(async (trackId, newPlaylist, play) => {

    setCurrentIndex(newPlaylist.findIndex(element => String(element) === String(trackId)));
    const res = await axios.get(`/api/song/details/${trackId}`);
    console.log(res.data);
    setCurrentlyPlaying(res.data);

    audioRef.current.pause();
    audioRef.current.load();

    if (play) {
      playSong(res.data._id);
    }
    
  

    // if (play) {
    //   playSong();
    // }
    

  }, [playSong]);







  useEffect(() => {

    const timeFromOffset = (mouse, ref) => {
      var percent = (mouse.offsetX / ref.current.offsetWidth) * 100;

      var seconds = audioRef.current.duration * (percent / 100);
      setTime(seconds);
    };

    var mouseDown = false;
    updateVolumeProgressBar();
    //prevents unwanted highlighting when changing volume and progress
    nowPlayingBarContainerRef.current.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });
    nowPlayingBarContainerRef.current.addEventListener("touchstart", (e) => {
      e.preventDefault();
    });
    nowPlayingBarContainerRef.current.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
    nowPlayingBarContainerRef.current.addEventListener("mousemove", (e) => {
      e.preventDefault();
    });

    progressBarRef.current.addEventListener("mousedown", () => {
      mouseDown = true;
    });

    progressBarRef.current.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        //set time of song depending on position of mouse
        timeFromOffset(e, progressBarRef);
      }
    });

    progressBarRef.current.addEventListener("mouseup", (e) => {
      //set time of song depending on position of mouse

      timeFromOffset(e, progressBarRef);
    });

    volumeBarRef.current.addEventListener("mousedown", () => {
      mouseDown = true;
    });

    volumeBarRef.current.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        var percentage = e.offsetX / volumeBarRef.current.offsetWidth;
        if (percentage >= 0 && percentage <= 1) {
          audioRef.current.volume = percentage;
        }
      }
    });

    volumeBarRef.current.addEventListener("mouseup", (e) => {
      var percentage = e.offsetX / volumeBarRef.current.offsetWidth;
      if (percentage >= 0 && percentage <= 1) {
        audioRef.current.volume = percentage;
      }
    });



    document.addEventListener("mouseup", () => {
      mouseDown = false;
    });
  }, []);


  useEffect(() => {

    if (playlist.length > 0 && clickIndex !== null){
      setTrack(playlist[clickIndex], playlist, true);
    }

    

  }, [clickIndex, playlist, setTrack]);


  // useEffect(() => {

  //   if (currentlyPlaying !== null){
  //    if (audioRef.current.currentTime === 0) {
  //     console.log("updating plays", currentlyPlaying);
  //       updateSongPlays(currentlyPlaying._id);
  //   }
  //   }

    

  // }, [currentlyPlaying]);


  // useEffect(() => {
  //   console.log("In use effect clickIndex");
   
  //   // setCurrentlyPlaying(null);
  //   if (clickIndex !== null) {
  //     console.log("SEtting current index in useeffect clickINdex: ", clickIndex);
  //     setCurrentIndex(clickIndex);
   
  //   } 

  // }, [clickIndex, setCurrentIndex]);
  

  // useEffect(() => {

  
      
  //   setCurrentPlaylist(playlist);
      
      
      
    

  // }, [playlist, setCurrentPlaylist]);

  // useEffect(() => {

  //  audioRef.current.pause();
    
  //   setCurrentlyPlaying(currentSong);
  //   audioRef.current.pause();
  //   audioRef.current.load();
 
    
  // }, [currentSong, setCurrentlyPlaying]);


  // useEffect(() => {
  //   const pauseSong = () => {

  //     audioRef.current.pause();
  //   };
  
  //   const playSong = () => {
 
  //     if (audioRef.current.currentTime === 0) {
        
  //       updateSongPlays(currentSong._id);
  //     }




  //       audioRef.current.play()

      
     
  
      
  //   };
  //   if (currentlyPlaying) {

  //     pause ? pauseSong() : playSong();
  //   }

  // }, [pause, currentlyPlaying, currentSong, updateSongPlays]);

  // useEffect(() => {
  //   const setTrack = async (index, newPlaylist, play) => {
  //     console.log("playing song at index", index);
  //     await fetchSongDetails(newPlaylist[index]);
  //     setPause(false);
  //     setPlaylistIndex(playlist.findIndex(element => String(element) === String(newPlaylist[index])));
     


      
      
  
  
  //   };
  //   setOriginalIndex(currentIndex);
    
  //   if (currentPlaylist && currentPlaylist.length > 0) {
  //     if (!pause) {
  //       setPause(true);
       
  //     }
  //     else {
  //       setTrack(currentIndex, currentPlaylist, false);
  //     }
      
      
  //   } 

  // }, [currentPlaylist, currentIndex, fetchPlaylist, fetchSongDetails, playlist, setPlaylistIndex]);

  // // useEffect(() => {
  // //   setPlaylistIndex(currentIndex);

  // // }, [currentIndex, setPlaylistIndex])

 


  // useEffect(() => {
  // if (shuffle && shuffleIndex === null) {
       
  //       var playlistWithoutCurrentSongId = [...playlist];
  //       var currentSongId = playlistWithoutCurrentSongId.splice(currentIndex, 1);
  //       var newShuffledPlaylist = shuffleArray(playlistWithoutCurrentSongId);
  //       newShuffledPlaylist = [currentSongId, ...newShuffledPlaylist];
  //       setShuffleIndex(0);
  //       setShuffledPlaylist(newShuffledPlaylist);

  //     }
  // }, [shuffle, currentIndex, playlist, shuffleIndex]);


  // useEffect(() => {

   
  //   if(!shuffle && shuffleIndex !== null) {
    
  //     setOriginalIndex(playlist.findIndex(element => String(element) === String(shuffledPlaylist[shuffleIndex])));
  //     setShuffledPlaylist([]);
  //     setShuffleIndex(null);



  //   }

  // }, [shuffle, shuffledPlaylist, shuffleIndex, playlist]);

  const updateTime = () => {
    if (audioRef.current.duration) {
      updateTimeProgressBar();
    }
  }

  const setTime = (seconds) => {
    audioRef.current.currentTime = seconds;
  };






  // const playSong = () => {
  //   setPause(false);
  //   if (audioRef.current.currentTime === 0) {
  //     updateSongPlays(currentSong._id);
  //   }

  

  //   audioRef.current.play();
  // };

  const updateTimeProgressBar = () => {
    setCurTime(formatTime(audioRef.current.currentTime));
    setRemTime(
      formatTime(audioRef.current.duration - audioRef.current.currentTime)
    );

    var progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    progressRef.current.style.width = progress + "%";
  };

  const updateVolumeProgressBar = () => {
    var volume = audioRef.current.volume * 100;
    volumeProgressRef.current.style.width = volume + "%";
  };



  const prevSong = () => {
  
    if (originalIndex === 0 || shuffleIndex === 0) {
      setTime(0)
      return;
    }
    if (audioRef.current.currentTime >= 3) {
      setTime(0);
      return;
    }
    else {
     
      if (shuffle) {



        setCurrentIndex(shuffleIndex - 1);
        setShuffleIndex(shuffleIndex - 1);
        setCurrentPlaylist(shuffledPlaylist);

      }
      else {

        setCurrentIndex(originalIndex - 1);
        setOriginalIndex(originalIndex - 1);
        setCurrentPlaylist(playlist);



      }
    }
  };


  const nextSong = () => {
    var nextIndex;
    if (currentIndex === playlist.length - 1){
      nextIndex = 0;
    }
    else {
      nextIndex = currentIndex + 1;
    }

    var trackToPlay = playlist[nextIndex];
    setCurrentIndex(nextIndex);
    setTrack(trackToPlay, playlist, true);

  };
  // const nextSong = () => {

  //   if (repeat) {
  //     setTime(0);
  //     playSong();
  //     return;
  //   }



  //   if (shuffle) {

  //     if (shuffleIndex === currentPlaylist.length - 1) {
  //       setShuffleIndex(0);
  //       // setCurrentIndex(0);
  //       setClickIndex(0)
  //       setCurrentPlaylist(shuffledPlaylist);
  //     }
  //     else {

  //       // setCurrentIndex(shuffleIndex + 1);
  //       setClickIndex(shuffleIndex + 1);
  //       setShuffleIndex(shuffleIndex + 1);
  //       setCurrentPlaylist(shuffledPlaylist);

  //     }



  //   }
  //   else {
  //     if (originalIndex === currentPlaylist.length - 1) {
  //       setOriginalIndex(0);
  //       // setCurrentIndex(0);
  //       setClickIndex(0);
  //       setCurrentPlaylist(playlist);
  //     }
  //     else {
  //       // setCurrentIndex(originalIndex + 1);
  //       setClickIndex(originalIndex + 1);
  //       setOriginalIndex(originalIndex + 1);
  //       setCurrentPlaylist(playlist);

  //     }

  //   }




  // };



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

  const renderRepeatButtons = () => {
    if (!repeat) {
      return (
        <button className="controlButton repeat" title="Repeat Button" onClick={() => setRepeat(true)}>
          <Repeat color="#ec148c" size={30} alt="Repeat" />
        </button>

      )
    }

    return (
      <button className="controlButton repeat" title="Repeat Button" onClick={() => setRepeat(false)}>
        <Repeat color="#fff" size={30} alt="Repeat" />
      </button>
    )
  };

  const renderShuffleButtons = () => {
    if (!shuffle) {
      return (
        <button
          className="controlButton shuffle"
          title="Shuffle Button"
          onClick={() => setShuffle(true)}
        >
          <Shuffle color="#ec148c" size={30} alt="Shuffle" />
        </button>

      );
    }

    return (
      <button
        className="controlButton shuffle"
        title="Shuffle Button"
        onClick={() => setShuffle(false)}
      >
        <Shuffle color="#fff" size={30} alt="Shuffle" />
      </button>
    );



  };


  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;

  }

  const renderVolumeButtons = () => {
    if (mute) {

      return (
        <button className="controlButton volume" title="Volume button" onClick={
          () => {
            setMute(false);
            audioRef.current.muted = false;
          }
        }>
          <Mute color="#fff" size={30} alt="Volume" />
        </button>
      )

    }

    return (
      <button className="controlButton volume" title="Volume button" onClick={
        () => {
          setMute(true);
          audioRef.current.muted = true;
        }
      }>
        <Volume color="#ec148c" size={30} alt="Volume" />
      </button>
    )


  }

  const renderPlayOrPause = () => {
    if (!pause) {
      return (
        <button
          className="controlButton pause"
          title="Pause Button"
          onClick={() => {
            pauseSong();
          }}
        >
          <Pause color="#ec148c" size={45} alt="Pause" />
        </button>
      );
    }

    return (
      <button
        className="controlButton play"
        title="Play Button"
        onClick={() => {
          playSong(currentlyPlaying._id);
        }}
      >
        <Play color="#ec148c" size={45} alt="Play" />
      </button>
    );
  };

  return (
    <>
      <div ref={nowPlayingBarContainerRef} id="nowPlayingBarContainer">
        <div id="nowPlayingBar">
          <div id="nowPlayingLeft">
            <div className="content">
              <span className="albumLink">
                <img
                  className="albumArtwork"
                  alt="Album Art"
                  src={
                    currentlyPlaying
                      ? currentlyPlaying.artworkPath
                      : loadingArtwork
                  }
                />
              </span>

              <div className="trackInfo">
                <span className="trackName">
                  <span>
                    {currentlyPlaying ? currentlyPlaying.songTitle : "Unknown"}
                  </span>
                </span>
                <span className="artistName">
                  <span>
                    {currentlyPlaying ? currentlyPlaying.artistName : "Unknown"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div id="nowPlayingCenter">
            <div className="content playerControls">
              <div className="buttons">
                {renderShuffleButtons()}

                <button
                  className="controlButton previous"
                  title="Previous Button"
                  onClick={() => prevSong()}
                >
                  <Prev color="#ec148c" size={30} alt="Previous" />
                </button>

                {renderPlayOrPause()}

                <button
                  className="controlButton next"
                  title="Next Button"
                  onClick={() => nextSong()}
                >
                  <Next color="#ec148c" size={30} alt="Next" />
                </button>

                {renderRepeatButtons()}
              </div>

              <div className="playbackBar">
                <span className="progressTime current">{curTime}</span>
                <div ref={progressBarRef} className="progressBar">
                  <div className="progressBarBg">
                    <div ref={progressRef} className="progress"></div>
                  </div>
                </div>
                <span className="progressTime remaining">{remTime}</span>
              </div>
            </div>
          </div>
          <div id="nowPlayingRight">
            <div className="volumeBar">
              {renderVolumeButtons()}

              <div ref={volumeBarRef} className="progressBar">
                <div className="progressBarBg">
                  <div ref={volumeProgressRef} className="progress"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} onEnded={() => nextSong()} onVolumeChange={() => updateVolumeProgressBar()} onTimeUpdate={() => updateTime()}>
        <source
          src={currentlyPlaying ? currentlyPlaying.songPath : ""}
          type="audio/mpeg"
        />
      </audio>
    </>
  );
};

function mapStateToProps({ song }) {
  return { playlist: song.playlist, currentSong: song.songDetails, index: song.index, clickIndex: song.clickIndex };
}

export default connect(mapStateToProps, actions)(NowPlayingBar);
