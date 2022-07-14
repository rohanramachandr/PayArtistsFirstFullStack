import React, { useState} from 'react';


export const DashboardContext = React.createContext();

export const DashboardContextProvider = ({children}) => {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [becomeArtistOpen, setBecomeArtistOpen] = useState(false);
    const [uploadMusicOpen, setUploadMusicOpen] = useState(false);
    const [userArtistUsername, setUserArtistUsername] = useState("");


    return (
        <DashboardContext.Provider value={{menuOpen, setMenuOpen, becomeArtistOpen, setBecomeArtistOpen, uploadMusicOpen, setUploadMusicOpen, userArtistUsername, setUserArtistUsername}}>
            {children}
        </DashboardContext.Provider>

    );
};







