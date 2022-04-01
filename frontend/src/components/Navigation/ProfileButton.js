import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';

import './ProfileButton.css';

const ProfileButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    console.log(sessionUser);

    // const fullName = `${sessionUser.firstName} ${sessionUser.lastName.slice(0, 1)}.`;

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
                className="user__menu__box"
                onClick={openMenu}
            >
                Profile Button
            </button>
            {showMenu && (
                <ul className='dropdown__menu__options'>
                    <li>{sessionUser.firstName}</li>
                    <li>
                        <button onClick={logout}>
                            Log Out
                        </button>
                    </li>
                </ul>
            )}
        </div>
    )
};

export default ProfileButton;
