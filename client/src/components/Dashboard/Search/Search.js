import React, {useEffect, useContext} from "react";
import { DashboardContext } from "../DashboardContext";
import { useLocation } from 'react-router-dom';

const Search = () => {


    const { setSearchState} = useContext(DashboardContext);
    const location = useLocation()
  const prevPath = location?.state?.prevPath;

    useEffect(() => {
      
            setSearchState({state:'clicked', prevPath: prevPath});

        return () => {

            setSearchState({state:'closed', prevPath: null});

        };

    }, [setSearchState], prevPath);



    return (
        <h1>Search Page</h1>
    );
};

export default Search;