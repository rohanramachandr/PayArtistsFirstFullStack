import React, {useContext} from 'react';
import { DashboardContext } from '../DashboardContext';
import { useNavigate } from 'react-router-dom';
import {
    InputBase,
    IconButton,
} from '@material-ui/core';
import './SearchBox.css';
import { ArrowBack } from '@material-ui/icons';

const SearchBox = ({prevPath}) => {

    const navigate = useNavigate();

    
    const { searchTerm, setSearchTerm } = useContext(DashboardContext);


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
                    placeholder="Search by artist"
                    autoFocus
                    style={{ color: '#fff', paddingLeft: '16px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // on click we will show popper
                
                />
            </form>

            
        </>

    );

};

export default SearchBox;