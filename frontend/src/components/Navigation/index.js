import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../store/session';

import ProfileButton from './ProfileButton';

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const demoUserOnClick = async () => {
        await dispatch(login({
            email: 'puppy@breeder.com',
            password: 'password'
        }));
        history.push('/');
    };

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
                <ul className='session__user'>
                    <button
                        onClick={demoUserOnClick}>
                        Demo User
                    </button>
                    <li>
                        <Link to='/login'>
                            <button>
                                Log In
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/signup'>
                            <button>
                                Sign Up
                            </button>
                        </Link>
                    </li>
                </ul>

            </>
        )
    }

    return (
        <div>
            <nav className="navigation__bar">
                <div className=''>
                    {sessionLinks}
                </div>
            </nav>
        </div>
    )
};

export default Navigation;
