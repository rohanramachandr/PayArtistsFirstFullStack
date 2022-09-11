import React, { useState} from 'react';


export const DashboardContext = React.createContext();

export const DashboardContextProvider = ({children}) => {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchState, setSearchState] = useState({state:'closed', prevPath: null});//closed searching clicked completed
    const [becomeArtistOpen, setBecomeArtistOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [uploadMusicOpen, setUploadMusicOpen] = useState(false);
    const [userArtistUsername, setUserArtistUsername] = useState("");


    return (
        <DashboardContext.Provider value={{menuOpen, setMenuOpen, becomeArtistOpen, setBecomeArtistOpen, uploadMusicOpen, setUploadMusicOpen, userArtistUsername, setUserArtistUsername, searchState, setSearchState, searchTerm, setSearchTerm}}>
            {children}
        </DashboardContext.Provider>

    );
};







