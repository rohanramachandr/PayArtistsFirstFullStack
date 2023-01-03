import React, { useEffect, useContext, useState } from "react";
import { DashboardContext } from "../DashboardContext";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {
    ListItem,
    Typography,
    ListItemAvatar,
    Avatar,
    Divider,
    ListItemText,
} from '@material-ui/core';

const Search = () => {


    const { setSearchState, searchTerm } = useContext(DashboardContext);
    const [searchResults, setSearchResults] = useState([]);


    const location = useLocation()
    const prevPath = location?.state?.prevPath;

    useEffect(() => {

        setSearchState({ state: 'clicked', prevPath: prevPath });

        return () => {

            setSearchState({ state: 'closed', prevPath: null });

        };

    }, [setSearchState, prevPath]);


    useEffect(() => {

        const timeoutID = setTimeout(async () => {
            console.log("searchTerm", searchTerm);


            // Send Axios request here
            if (searchTerm !== "") {
                const res = await axios.get(`/api/search?term=${searchTerm}`);
                setSearchResults(res.data);

            }
            else {
                setSearchResults([]);
            }
        }, 2000);


        return () => clearTimeout(timeoutID);



    }, [searchTerm]);


    const renderResult = () => {

        return searchResults.map((result, index) => {

            const { artistName, artistUsername } = result;
            return (
                <div key={index}>

                    <ListItem
                        alignItems="flex-start"
                        button
                        component={Link}
                        to={`/${artistUsername}`}
                    >
                        <ListItemAvatar>
                            <Avatar

                                style={{ width: '60px', height: '60px', marginRight: '15px' }}
                                alt={artistName}
                                src={undefined}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={artistName}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="primary"
                                    >
                                        {`@${artistUsername}`}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    {index < searchResults.length - 1 && <Divider variant="inset" light middle style={{
                        border: '.1px solid #fff',


                    }} />}
                </div>


            );
        });

    };



    return (
        <>
            {renderResult()}
        </>
    );
};

export default Search;