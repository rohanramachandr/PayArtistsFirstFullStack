import React, { useState} from 'react';


export const DashboardContext = React.createContext();

export const DashboardContextProvider = ({children}) => {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [becomeArtistOpen, setBecomeArtistOpen] = useState(false);
    const [uploadMusicOpen, setUploadMusicOpen] = useState(false);


    return (
        <DashboardContext.Provider value={{menuOpen, setMenuOpen, becomeArtistOpen, setBecomeArtistOpen, uploadMusicOpen, setUploadMusicOpen}}>
            {children}
        </DashboardContext.Provider>

    );
};







