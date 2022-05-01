import React, { useState} from 'react';


export const DashboardContext = React.createContext();

export const DashboardContextProvider = ({children}) => {
    
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <DashboardContext.Provider value={{menuOpen, setMenuOpen}}>
            {children}
        </DashboardContext.Provider>

    );
};







