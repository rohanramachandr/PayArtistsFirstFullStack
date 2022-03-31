import React from 'react';
import { BsSearch as Search } from 'react-icons/bs';
import {Link} from 'react-router-dom';
import "./DashboardNav.css";

const DashboardNav = () => {
    return (
        <div id="navBarContainer">
            <nav className="navBar">
                <a href="/dashboard" className="logo">PayArtistsFirst</a>

                <div className="group">

                    <div className="navItem">

                        <a href="/search" className="navItemLink">Search

                            <Search id="searchIcon" size={20} alt="Shuffle" />
                        </a>

                    </div>

                </div>

                <div className="group">

                    <div className="navItem">

                        <Link to="/dashboard/browse" className="navItemLink">Browse</Link>

                    </div>

                    <div className="navItem">

                        <a href="/yourmusic" className="navItemLink">Your Music</a>

                    </div>

                    <div className="navItem">

                        <a href="/profile" className="navItemLink">Rohan Ramachandran</a>

                    </div>

                    <div className="navItem">

                        <a href="/api/logout" className="navItemLink">Log Out</a>

                    </div>

                </div>

            </nav>


        </div>
    )
};

export default DashboardNav;
