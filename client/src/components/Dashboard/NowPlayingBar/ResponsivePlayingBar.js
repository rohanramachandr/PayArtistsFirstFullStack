import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { useSwipeable } from 'react-swipeable';
import PlayPauseButton from './PlayPauseButton';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import MusicArt from './MusicArt';
import TimelineController from './TimelineController';
import TopBar from './TopBar';
import MiniMusicArt from './MiniMusicArt';
import axios from 'axios';
import { connect } from "react-redux";
import * as actions from "../../../actions/index";



// import { updatePlayingSong } from '../../external/saveSong';

// import '../../external/saveCountry';

import './ResponsivePlayBar.css';


// window.onbeforeunload = function() {
//   return 'You have unsaved changes!';
// }
// let relatedVideosVar;

const ResponsivePlayingBar = ({
    updateSongPlays,
    setCurrentSongID
   }) => {





    //
    const [audioState, setAudioState] = useState(null);
    // there will be 4 states
    // loading, loaded, playing, paused

    const [playerState, setPlayerState] = useState('notPlaying');
    // there will be 3 states
    // maximized, minimized, playlist, or 'notPlaying'

    const [minimized, setMinimized] = useState(true);
    //const [isRepeatOn, setIsRepeatOn] = useState(false);
    const isRepeatOn = false;

    

    const currentVideoSnippet = { audio: "", title: "", artist: "", id: "" };
    const [currentlyPlaying, setCurrentlyPlaying] = useState({ audio: "", title: "", artist: "", id: "", thumbnail: "", _id: "", _album: "", artistName: "", artistUsername: ""});
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const audioPlayer = useRef();
    const player = audioPlayer.current;
    const setupMediaSessions = (songInfo) => {
        if ('mediaSession' in navigator) {
            // console.log("navigator setupped");

            navigator.mediaSession.metadata = new window.MediaMetadata({
                // title: currentVideoSnippet.title,
                // artist: currentVideoSnippet.channelTitle,
                // artwork: [
                //   {
                //     src: currentVideoSnippet.sdThumbnail,
                //     sizes: '512x512',
                //     type: 'image/png',
                //   },
                // ],
                title: songInfo.title,
                artist: songInfo.artist,
                artwork: [
                    {
                        src: songInfo.thumbnail,
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            });
            navigator.mediaSession.setActionHandler('play', () => {
                /* Code excerpted. */
                playAudio(songInfo);
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                /* Code excerpted. */
                audioPlayer.current.pause();
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                playPrevious();
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                playNext();
            });
        }
    };

    const playAudio = (songInfo) => {
        audioPlayer.current
            .play()
            .then((_) => {
                // Automatic playback started!
                // Show playing UI.
                // console.log("audio played auto");
                setupMediaSessions(songInfo);
            })
            .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
                // console.log("playback prevented");
                setAudioState('paused');
            });
    };

    const getSongInfo = async ({ detail }) => {
        const { playlist, clickIndex } = detail;
        console.log("playlist and clickIndex", playlist, clickIndex)
        if (playerState === 'notPlaying') {
          setPlayerState('minimized');  
        }
        
        setAudioState('loading');
        setCurrentPlaylist(playlist);
        let res = await axios.get(`/api/song/details/${playlist[clickIndex]}`);
        const {artistUsername, artistName, artworkPath, songTitle, _album, _id} = res.data
        setCurrentSongID(_id);
        res = await axios.get(`/api/songs/stream/${playlist[clickIndex]}`)
        const signedUrl = res.data;
        const songInfo = {audio: signedUrl, title: songTitle, artistName, artistUsername, thumbnail: process.env.REACT_APP_ARTWORK_BUCKET_URL + artworkPath, _id, _album};
        
        setCurrentlyPlaying(songInfo);
        audioPlayer.current.src =  signedUrl;
        // audioPlayer.current.type = mediaType;
        playAudio(songInfo);

    
    };

    useEffect(() => {

      

        document.addEventListener('songClicked', getSongInfo);

        return () => {
            document.removeEventListener('songClicked', getSongInfo);
        }
        
        

    }, []);

    


    const playNext = async () => {
        if (currentPlaylist) {
            //setIsItFromPlaylist(true);
            console.log("currentPlaylist and id", currentPlaylist, currentlyPlaying._id)
            const currentIndex = currentPlaylist.findIndex(
                     (id) => id === currentlyPlaying._id
            );

            console.log("the current index is", currentIndex);

            const nextIndex = currentIndex === currentPlaylist.length - 1 ? 0 : currentIndex + 1; 

            await getSongInfo({detail:{playlist: currentPlaylist, clickIndex: nextIndex}})




        }
        // // also set this is from playlist
        // setIsItFromPlaylist(true);
        // // console.log("play next related videos", relatedVideos);
        // // find the index of playing song in the playlist
        // const currentIndex = relatedVideosVar.findIndex(
        //     (video) => video.id.videoId === currentVideoSnippet.id
        // );
        // // console.log("the current index is", currentIndex);

        // let video;
        // // console.log("hey we will play next song");
        // video = relatedVideosVar[currentIndex + 1]; //we will play the next song

        // setVideoSnippet(video);
    };

    const playPrevious = async () => {
        console.log("current playlist", currentPlaylist)
        if (currentPlaylist) {
            console.log("playing previous track")

            if (player.currentTime > 5) {
                player.currentTime = 0;
            }
            else {
                console.log("currentPlaylist and id", currentPlaylist, currentlyPlaying._id)
                const currentIndex = currentPlaylist.findIndex(
                         (id) => id === currentlyPlaying._id
                );
          
                if (currentIndex !== -1 && currentIndex !== 0) {
                    const prevIndex = currentIndex - 1; 
                    await getSongInfo({detail:{playlist: currentPlaylist, clickIndex: prevIndex}})
                } else {
                    player.currentTime = 0;
                }
            }
        }
    };


    // if (playerState === 'minimized') {
    //     playerStyle.transform = 'translateY(calc(100% - 106px))';
    //     playerStyle.zIndex = 0;
    //     // if theme is not dark then only apply the pink style



    //     //playerStyle.bottom = "48px";
    //     // calculate the top height and we are subtracting 148px becz
    //     // 48 is the value of menu bar and 100px is minimized height
    //     // make body overflow scroll 😝
    //     body.style.overflow = 'auto';
    // }

    // if (playerState === 'maximized') {
    //     // make body overflow hidden 🙈
    //     body.style.overflow = 'hidden';
    //     // if (themeSelectValue === 'Dark') {
    //      //playerStyle.background = '#333';
    //     // }
    // }

    // if (playerState === 'playlist') {
    //     playerStyle.transform = 'translateY(-418px)';
    // }

    const expandPlayer = () => {
        if (playerState === 'minimized') {
            setPlayerState('maximized');
            setMinimized(true);
            //   history.push({
            //     pathname: '/play',
            //     search: `?id=${currentVideoSnippet.id}`,
            //     state: { modal: true },
            //   });
        }
    };





    // this will be fired when song is ended
    const songEnded = () => {
        // if repeat is false we will play next else just set the time to 0
        if (!isRepeatOn) {
            playNext();
        } else {
            audioPlayer.current.currentTime = 0;
            playAudio();
        }
    };

    let initPosition = 0;
    const containerRef = useRef(null);

    const swipeHandlerMaximized = useSwipeable({
        onSwipedDown: (e) => {
            setPlayerState('minimized');
            //   history.goBack();
        },
        onSwiping: (e) => {
            // // console.log(e);
            // getting the event for touches to extract the position
            if (initPosition === 0) {
                initPosition = e.event.changedTouches[0].screenY;
            }

            const screenY = e.event.changedTouches[0].screenY;
            let positionDifference = Math.round(screenY - initPosition);
            if (positionDifference < 1) {
                positionDifference = 0;
            }

            const containerRefStyle = containerRef.current.style;
            containerRefStyle.transform = `translateY(${positionDifference}px)`;
            containerRefStyle.transition = 'none';
        },
        onSwiped: (e) => {
            initPosition = 0;
            containerRef.current.style = '';
            // we will make the initial position 0 again after user leaves the screen
        },
        onSwipedUp: (e) => {
            if (playerState === 'minimized') {
                setPlayerState('maximized');
            }
        },
        onSwipedRight: (e) => {
            const playTimeout = setTimeout(() => {
                clearTimeout(playTimeout);
                playNext();
            }, 250);
        },
        onSwipedLeft: (e) => {
            const playTimeout = setTimeout(() => {
                clearTimeout(playTimeout);
                playPrevious();
            }, 250);
        },
    });

    const swipeHandlerMin = useSwipeable({
        onSwipedUp: (e) => {
            expandPlayer();
        },
    });

    //   useEffect(() => {
    //     // if (location.pathname === '/play' && !currentVideoSnippet.id) {
    //     //   // console.log("history is in play fetching song");

    //     // //   fetchAndSetCurrentVideoSnippet(params.get('id')); // math will give the song id from
    //     // }
    //     // we will only change if its push  otherwise while changing song from playlist changes the state

    //     // Listen for changes to the current location.
    //     const unlisten = history.listen((location) => {
    //       // location is an object like window.location
    //       if (location.pathname === '/play') {
    //         // we will only change if its push  otherwise while changing song from playlist changes the state
    //         if (history.action !== 'REPLACE') {
    //           setPlayerState('maximized');
    //           // console.log("set player state to maximized");
    //         }
    //       } else {
    //         setPlayerState('minimized');
    //         // console.log("set player state to minimized");
    //       }
    //       // console.log(history);
    //     });
    //   }, [history]);

    // useEffect(() => {
    //     setPlayerState('maximized');

    // }, [])

    useEffect(() => {
        console.log(playerState);
    }, [playerState]);

    const returnMinMaxClass = () => {
        if (playerState === 'minimized') {
            return 'playerMinimized';
        } else if (playerState === 'playlist') {
            return 'playerPlaylist';
        }
        else if (playerState === 'notPlaying') {
             return "playerNotPlaying";
        }

        return "";//Maximized

       
    };

    const returnMaximizedPlayer = () => {

        if (playerState === 'maximized') {

            console.log("returning maximum player")
            return (
                <>
                    <Grid
                        container
                        direction="column"
                        className="main-player-inner"
                        style={{
                            height: ' calc(100vh - 46px)',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <TopBar
                            song={currentVideoSnippet}
                            player={player}
                            setPlayerState={setPlayerState}
                            history={null}
                        />
                        <div {...swipeHandlerMaximized} className="musicArtContainer">
                            <MusicArt
                                data={currentlyPlaying}
                                rating={"none"}
                                audioEl={player}
                                setPlayerState={setPlayerState}
                            />
                        </div>
                        <TimelineController audioState={audioState} player={player} />

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            style={{ maxWidth: '290px', height: '80px', margin: '0 auto', marginTop: '-60px' }}
                        >
                            <PreviousButton playPrevious={playPrevious} />
                            <PlayPauseButton player={player} audioState={audioState} />
                            <NextButton onPlayNext={playNext} />
                        </Grid>
                    </Grid>
                 
                </>
            );
        }
    };

    const returnMinimizedPlayer = () => {
        if (playerState === 'minimized') {
            return (
                <div {...swipeHandlerMin}>
                    <MiniMusicArt
                        // we are making an object for props we will pass it to play pause button through mini music art
                        playPause={{
                            player: player,
                            minimized: minimized,
                            audioState: audioState,
                        }}
                        playNext={(e) => {
                            e.stopPropagation();
                        
                            playNext();
                        }}
                        data={currentlyPlaying}
                        emptyPlayer={(e) => {
                            e.stopPropagation();
                            //setCurrentVideoSnippet([]);
                            setCurrentlyPlaying({ audio: "", title: "", artist: "", id: "", thumbnail: "", _id: "", artistName: "", artistUsername: "" });
                            setPlayerState('notPlaying')
                            audioPlayer.current.src=null;
                            setCurrentSongID("");
                        }}
                    />
                    <TimelineController
                        audioState={audioState}
                        player={player}
                        minimized={minimized}
                    />
                </div>
            );
        }
    };



    // if (!currentVideoSnippet.id) {
    //     return null;
    // }
    console.log("REndering playing bar");

    return (
        <div
            // drag="y"
            // dragConstraints={{ top: 0, bottom: 600 }}
            ref={containerRef}
            // style={playerStyle}
            onClick={expandPlayer}
            className={'mediaPlayerContainer ' + returnMinMaxClass()}
        >
            {returnMaximizedPlayer()}
            {returnMinimizedPlayer()}
            <audio
                    // onTimeUpdate={timeUpdate}
                    onLoadStart={() => {
                        setAudioState('loading');
                    }}
                    id="audio-element"
                    onLoadedData={() => updateSongPlays(currentlyPlaying.id)}
               
                    onPlay={() => setAudioState('playing')}
                    onPlaying={() => setAudioState('playing')}
                    onPause={() => setAudioState('paused')}
                    onEnded={songEnded}
                    autoPlay
                    ref={audioPlayer}
                  
                />
        </div>
    );



};

export default connect(null, actions)(ResponsivePlayingBar);