import React, { useState, useEffect, useRef } from 'react';
import { BsShuffle as Shuffle, BsFillSkipStartFill as Prev, BsFillSkipEndFill as Next, BsPlayCircle as Play, BsArrowRepeat as Repeat, BsPauseCircle as Pause, BsVolumeUpFill as Volume, BsVolumeMuteFill as Mute } from 'react-icons/bs';
import './NowPlayingBar.css';

const NowPlayingBar = (props) => {

    const [currentlyPlaying, setCurrentlyPlaying] = useState("");

    const audioRef = useRef();








    const playTrack = () => {

        console.log("playing track");
        audioRef.current.pause();
        audioRef.current.load()
        audioRef.current.play();
    };

    const setTrack = (trackId, newPlaylist, play) => {

    };










    return (
        <>


            <div id="nowPlayingBarContainer">
                <div id="nowPlayingBar">

                    <div id="nowPlayingLeft">
                        <div className="content">

                            <span className="albumLink">
                                <img className="albumArtwork" alt="Album Art" src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" />

                            </span>

                            <div className="trackInfo">

                                <span className="trackName">
                                    <span>Happy Birthday</span>

                                </span>
                                <span className="artistName">
                                    <span>John Mayer</span>

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

                                <button className="controlButton play" title="Play Button" onClick={() => { setCurrentlyPlaying("https://github.com/rohanramachandr/PAFAssets/blob/main/assets/music/bensound-betterdays.mp3?raw=true"); playTrack() }}>
                                    <Play color="#ec148c" size={45} alt="Play" />
                                </button>

                                <button className="controlButton pause" title="Pause Button" style={{ display: "none" }}>
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
                                <span className="progressTime current">0.00</span>
                                <div className="progressBar">
                                    <div className="progressBarBg">
                                        <div className="progress"></div>
                                    </div>
                                </div>
                                <span className="progressTime remaining">0.00</span>

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
                <source src={currentlyPlaying} type="audio/mpeg" />
            </audio>



        </>
    );
};


export default NowPlayingBar;
