import React, { useState, useEffect, useRef } from "react";
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

const NowPlayingBar = ({
  currentPlaylist,
  currentSong,
  fetchPlaylist,
  fetchSongDetails,
  updateSongPlays,
}) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [mute, setMute] = useState(false);

  const [curTime, setCurTime] = useState("0.00");
  const [remTime, setRemTime] = useState("0.00");
  const nowPlayingBarContainerRef = useRef(null);
  const volumeBarRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressRef = useRef(null);
  const volumeProgressRef = useRef(null);
  const audioRef = useRef(new Audio());
  // const pauseRef = useRef(null);
  // const playRef = useRef(null);
  //  console.log("NowPlayingBar playlist", currentPlaylist);

  

  useEffect(() => {
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
    setCurrentlyPlaying(currentSong);
    audioRef.current.pause();
    audioRef.current.load();
    console.log("currentlyPlaying Use effect", currentlyPlaying);
    if (currentlyPlaying) {

      pause ? pauseSong() : playSong();
    }
  }, [currentSong]);

  useEffect(() => {
    console.log(currentPlaylist);
    console.log("songDetails", currentSong);

    if (currentPlaylist.length > 0) {
      setTrack(currentIndex, currentPlaylist, false);
    } else {
      fetchPlaylist();
    }
  }, [currentPlaylist, currentIndex]);

  const updateTime = () => {
    if (audioRef.current.duration) {
      updateTimeProgressBar();
    }
  }

  const setTime = (seconds) => {
    audioRef.current.currentTime = seconds;
  };

  const timeFromOffset = (mouse, ref) => {
    var percent = (mouse.offsetX / ref.current.offsetWidth) * 100;

    var seconds = audioRef.current.duration * (percent / 100);
    setTime(seconds);
  };

  const pauseSong = () => {
    setPause(true);
    audioRef.current.pause();
  };

  const playSong = () => {
    setPause(false);
    if (audioRef.current.currentTime === 0) {
      console.log("updating plays");
      updateSongPlays(currentSong._id);
    }

    console.log("playing track");

    audioRef.current.play();
  };

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
    if( audioRef.current.currentTime >= 3 || currentIndex === 0 ){
      setTime(0);
    }
    else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSong = () => {
    console.log("current Index next song", currentIndex);

    if (repeat) {
      setTime(0);
      playSong();
      return;
    }
    if (currentIndex === currentPlaylist.length - 1) {
      console.log("setting current index to 0 playlist length: " ,currentPlaylist.length);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }


  };

  const setTrack = async (index, newPlaylist, play) => {
    console.log("index", index);
    await fetchSongDetails(newPlaylist[index]);


  };

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

  const renderVolumeButtons = () => {
    if (mute){

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
          playSong();
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
                <button
                  className="controlButton shuffle"
                  title="Shuffle Button"
                >
                  <Shuffle color="#ec148c" size={30} alt="Shuffle" />
                </button>

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
  return { currentPlaylist: song.playlist, currentSong: song.songDetails };
}

export default connect(mapStateToProps, actions)(NowPlayingBar);
