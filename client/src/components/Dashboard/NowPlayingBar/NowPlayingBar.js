import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import loadingArtwork from '../../../images/loadingArtwork.jpg';
import { BsShuffle as Shuffle, BsFillSkipStartFill as Prev, BsFillSkipEndFill as Next, BsPlayCircle as Play, BsArrowRepeat as Repeat, BsPauseCircle as Pause, BsVolumeUpFill as Volume, BsVolumeMuteFill as Mute } from 'react-icons/bs';
import './NowPlayingBar.css';
import * as actions from '../../../actions/index';

const NowPlayingBar = ({currentPlaylist, currentSong, fetchSongDetails, updateSongPlays}) => {

    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [curTime, setCurTime] = useState("0.00");
    const [remTime, setRemTime] = useState("0.00");

    const progressRef = useRef(null);
    const audioRef = useRef(new Audio());
    const pauseRef = useRef(null);
    const playRef = useRef(null);
    // console.log("NowPlayingBar playlist", currentPlaylist);
    // console.log("songDetails", currentSong);

    useEffect(() => {
        if (currentPlaylist.length > 0) {
            fetchSongDetails(currentPlaylist[0]._id);
            setTrack(currentPlaylist[0], currentPlaylist, false);
            pauseRef.current.style.display = "none";
        }
       
       
    }, [currentPlaylist, currentlyPlaying]);

    const pauseSong = () => {
        audioRef.current.pause();
        
        pauseRef.current.style.display = "none";
        playRef.current.style.display = "unset";

    }

    const  updateTimeProgressBar = () => {
        setCurTime(formatTime(audioRef.current.currentTime));
        setRemTime(formatTime(audioRef.current.duration - audioRef.current.currentTime));

        var progress = audioRef.current.currentTime / audioRef.current.duration * 100;
        progressRef.current.style.width = progress + "%";
    };

    audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current.duration) {
            updateTimeProgressBar();
        }

        
    });



    const playSong = () => {

        if (audioRef.current.currentTime === 0){
            console.log("updating plays");
            updateSongPlays(currentlyPlaying._id);
        }
        playRef.current.style.display = "none";
        pauseRef.current.style.display = "unset";
        console.log("playing track");
       
        audioRef.current.play();
    };

    const setTrack = (track, newPlaylist, play) => {
        if(track) {
          
            setCurrentlyPlaying(track);
            audioRef.current.pause();
            audioRef.current.load();

             if (play) {
                 playSong();
             }
        }
       

    };

    const formatTime = (seconds) => {
        var time = Math.round(seconds);
        var minutes = Math.floor(time / 60);
        seconds = time - (minutes * 60);

        var extraZero = "";

        if (seconds < 10) {
            extraZero = "0";

        }
        return minutes + ":" + extraZero + seconds;

    };




    return (
        <>


            <div id="nowPlayingBarContainer">
                <div id="nowPlayingBar">

                    <div id="nowPlayingLeft">
                        <div className="content">

                            <span className="albumLink">
                                <img className="albumArtwork" alt="Album Art" src={currentSong ? currentSong.artworkPath : loadingArtwork} />

                            </span>

                            <div className="trackInfo">

                                <span className="trackName">
                                    <span>{currentSong ? currentSong.songTitle : "Unknown"}</span>

                                </span>
                                <span className="artistName">
                                    <span>{currentSong ? currentSong.artistName : "Unknown"}</span>

                                </span>

                            </div>

                        </div>

                    </div>

                    <div id="nowPlayingCenter">
                        <div className="content playerControls">
                            <div className="buttons">
                                <button className="controlButton shuffle" title="Shuffle Button">
                                    <Shuffle color="#ec148c" size={30} alt="Shuffle" />
                                </button>

                                <button className="controlButton previous" title="Previous Button">
                                    <Prev color="#ec148c" size={30} alt="Previous" />
                                </button>

                                <button ref={playRef} className="controlButton play" title="Play Button" onClick={() => {  playSong() }}>
                                    <Play color="#ec148c" size={45} alt="Play" />
                                </button>

                                <button ref={pauseRef} className="controlButton pause" title="Pause Button"  style={{display: "none"}} onClick={() => { pauseSong();}}>
                                    <Pause color="#ec148c" size={45} alt="Pause" />
                                </button>

                                <button className="controlButton next" title="Next Button">
                                    <Next color="#ec148c" size={30} alt="Next" />
                                </button>

                                <button className="controlButton repeat" title="Repeat Button">
                                    <Repeat color="#ec148c" size={30} alt="Repeat" />
                                </button>
                            </div>

                            <div className="playbackBar">
                                <span className="progressTime current">{curTime}</span>
                                <div className="progressBar">
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
                            <button className="controlButton volume" title="Volume button">

                                <Volume color="#ec148c" size={30} alt="Volume" />
                            </button>

                            <div className="progressBar">
                                <div className="progressBarBg">
                                    <div className="progress"></div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
            <audio ref={audioRef}>
                <source src={currentlyPlaying ? currentlyPlaying.songPath : ""} type="audio/mpeg" />
            </audio>



        </>
    );
};

function mapStateToProps({ album, song }) {
    return { currentPlaylist: album.songs, currentSong: song.songDetails };
}

export default connect(mapStateToProps, actions)(NowPlayingBar);



