import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";


import * as sessionActions from '../../store/session';

import './ProfileButton.css';

const ProfileButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    const fullName = `${sessionUser.firstName} ${sessionUser.lastName.slice(0, 1)}.`;

    const userProfile = (
        sessionUser.imageProfile ?
            <img
                src={'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'}
            /> :
            <img
                src={require('../../images/user_template.png')}
            />
    );

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => setShowMenu(false);

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div>
            <button
                className="user__profile__button"
                onClick={openMenu}
            >
                <div className="user__button">
                    {userProfile}
                </div>
                <div className="arrow__down">
                    <img className='arrow__down__image' src={require('../../images/arrow-down.png')} />
                </div>
            </button>
            {showMenu && (
                <div className="dropdown__menu">
                    <ul className='dropdown__menu__options'>
                        <div className="user__image__dropdown">
                            {userProfile}
                        </div>
                        <div className="user__info">
                            <li>{fullName}</li>
                            {/* <li>
                                <Link to='/litters'>
                                    Your Litters
                                </Link>
                            </li> */}
                            <li>
                                <button
                                    className="logout__button"
                                    onClick={logout}
                                >
                                    Log Out
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
            )}
        </div>
    )
};

export default ProfileButton;
