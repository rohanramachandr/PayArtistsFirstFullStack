import React from "react";
import "./Artist.css";

const Artist = () => {

    console.log("aritst page");


    // const renderArtwork = () => {
    //     return album.album ? (
    //       <img src={album.album.artworkPath} alt="album art" />
    //     ) : null;
    //   };
    
    //   const renderAlbumTitle = () => {
    //     return album.album ? <h2>{album.album.albumTitle}</h2> : null;
    //   };
    
    //   const renderArtistName = () => {
    //     return album.artist ? <span>{`By ${album.artist}`}</span> : null;
    //   };
    
    //   const renderNumSongs = () => {
    //     return album.songs ? <span>{`${album.songs.length} songs`}</span> : null;
    //   };
    
    //   const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    
    
    //   const renderPlayingButtons = (albumSongs, index, order) => {
    //     if (equals(albumSongs, playlist) && playlistIndex === index) {
    //       return (
    //         <div className="playingIcon">
    //           <Volume color="#ec148c" size={20} alt="Volume" />
    //         </div>
    //       );
    
    
    //     }
    
    //     return (
    
    //       <>
    //         <div onClick={() => {
    //           if (!equals(albumSongs, playlist)) {
    //             setPlaylist(albumSongs);
    //           }
             
              
    //           setClickIndex([index]);
              
              
    //         }} className="playIcon">
    //           <BsFillPlayFill size={20} />
    //         </div>
    
    //         <span className="trackNumber">{order}</span>
    //       </>
    
    
    //     );
    
    //   };
    
    //   const renderSongs = () => {
    //     //TODO perhaps change to get artist name from song instead of album
    //     var listOfSongIds = [];
    //     album.songs.forEach((song) => { listOfSongIds.push(song._id) });
    //     return album.songs.map((song, index) => {
    //       return (
    //         <li className="tracklistRow" key={song._id}>
    //           <div className="trackCount">
    //             {renderPlayingButtons(listOfSongIds, index, song.albumOrder)}
    
    
    //           </div>
    //           <div className="trackInfo">
    //             <span className="trackName">{song.songTitle}</span>
    //             <span className="artistName">{album.artist}</span>
    //           </div>
    //           <div className="trackOptions">
    //             <div className="optionsIcon">
    //               <BsThreeDots size={20} />
    //             </div>
    //           </div>
    //           <div className="trackDuration">
    //             <span className="duration">{song.duration}</span>
    //           </div>
    //         </li>
    //       );
    //     });
    //   };

    return (

        <div id="mainViewContainer">
            <div id="mainContent">
                <div className="entityInfo">

                    <div className="centerSection">
                        <div className="artistInfo">
                            <h1 className="artistName">John Mayer</h1>

                            <div className="headerButtons">
                                <button className="button pink">PLAY</button>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="trackListContainer">
                    {/* renderSongs() */}
              <ul className="tracklist">{}</ul>
            </div>


            </div>



        </div>

    );

};

export default Artist;