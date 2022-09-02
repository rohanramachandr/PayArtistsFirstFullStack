import React, {useContext} from 'react';
import { DashboardContext } from '../DashboardContext';
import {
    InputBase,
    IconButton,
    Popper,
    CircularProgress,
    Grid,
} from '@material-ui/core';
import './SearchBox.css';
import { ArrowBack } from '@material-ui/icons';

const SearchBox = () => {

    const {searchState, setSearchState} = useContext(DashboardContext);


    return (

        <>
            <IconButton
                onClick={() => setSearchState('closed')}
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

            <Popper
                className="searchPopper"
                open={true}
                anchorEl={document.getElementById('navbar')}
                popperOptions={{
                    modifiers: {
                        preventOverflow: {
                            padding: 0,
                        },
                    },
                }}
                placement="bottom"
            >
                {/* {popperResult} */}
            </Popper>
        </>

    );

};

export default SearchBox;