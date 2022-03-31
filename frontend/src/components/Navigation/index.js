import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    console.log('SESSION USER:', sessionUser);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                {isLoaded && <ProfileButton user={sessionUser} />}
            </>
        )
    } else {
        sessionLinks = (
            <>
                {/* <button>
                    Demo User
                </button> */}
                <button>
                    Log In
                </button>
                <button>
                    Sign Up
                </button>
            </>
        )
    }

    return (
        <div>
            <nav>
                <div>
                    {sessionLinks}
                </div>
            </nav>
        </div>
    )
};

export default Navigation;
