import React, {useContext, useEffect} from 'react';
import { DashboardContext } from '../DashboardContext';
import { useNavigate } from 'react-router-dom';
import {
    InputBase,
    IconButton,
    Popper,
    CircularProgress,
    Grid,
} from '@material-ui/core';
import './SearchBox.css';
import { ArrowBack } from '@material-ui/icons';

const SearchBox = ({prevPath}) => {

    const navigate = useNavigate();
 


    return (

        <>
            <IconButton
                onClick={() => {prevPath ? navigate(prevPath) : navigate('/browse')}}
                color="inherit"
                aria-label="Menu"
            >
                <ArrowBack />
            </IconButton>
            <form style={{ width: '100%' }} >
                <InputBase
                    fullWidth
                    placeholder="Search by @artistUsername"
                    autoFocus
                    style={{ color: '#fff', paddingLeft: '16px' }}
                    // value={searchQuery}
                    // onChange={onChange}
                    // on click we will show popper
                    onClick={() => {
                        //  setSearchState('clicked');
                        //   setPopper(true);
                    }}
                />
            </form>

            
        </>

    );

};

export default SearchBox;