import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { BsShuffle as Shuffle, BsFillSkipStartFill as Prev, BsFillSkipEndFill as Next, BsPlayCircle as Play, BsArrowRepeat as Repeat, BsPauseCircle as Pause, BsVolumeUpFill as Volume, BsVolumeMuteFill as Mute } from 'react-icons/bs';
import './NowPlayingBar.css';
import { fetchSongDetails } from '../../../actions/index';

const NowPlayingBar = ({currentPlaylist, currentSong, fetchSongDetails}) => {

    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);


    const audioRef = useRef(null);
    const pauseRef = useRef(null);
    const playRef = useRef(null);
    console.log("NowPlayingBar playlist", currentPlaylist);
    console.log("songDetails", currentSong);

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








    const playSong = () => {
        playRef.current.style.display = "none";
        pauseRef.current.style.display = "unset";
        console.log("playing track");
       
        audioRef.current.play();
    };

    const setTrack = (track, newPlaylist, play) => {
        if(track) {
          
            setCurrentlyPlaying(track);
            audioRef.current.pause();
            audioRef.current.load()

             if (play) {
                 playSong();
             }
        }
       

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
                <source src={currentlyPlaying ? currentlyPlaying.songPath : ""} type="audio/mpeg" />
            </audio>



        </>
    );
};

function mapStateToProps({ album, song }) {
    return { currentPlaylist: album.songs, currentSong: song.songDetails };
}

export default connect(mapStateToProps, {fetchSongDetails})(NowPlayingBar);



