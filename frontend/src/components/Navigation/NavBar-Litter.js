import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../store/session';

import ProfileButton from './ProfileButton';

import './Navigation.css';

const NavigationLitter = ({ isLoaded }) => {
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
                        className='button__demo all__buttons'
                        onClick={demoUserOnClick}>
                        Demo
                    </button>
                    <li className='buttons__space'>
                        <Link to='/login'>
                            <button className='button__login all__buttons'>
                                Log In
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/signup'>
                            <button className='button__signup all__buttons'>
                                Sign Up
                            </button>
                        </Link>
                    </li>
                </ul>

            </>
        )
    }

    return (
        <div className="navigation__bar__litter">
            <div>
                <a href='/'>
                    <img className='whelp__logo__white' src={require('../../images/whelp-logo.png')} />
                </a>
            </div>
            <div className='nav__bar__searchbar'>
                {/* <form id="search__form__navbar">
                    <input className='searchbar__navbar' type="search" />
                    <button className='magnifier__search__button__navbar all__buttons' >
                        <img className='magnifier' src={require('../../images/magnifier.png')} />
                    </button>
                </form> */}
            </div>
            <div className='menu__top__left'>
                <a href='/reviews'
                    className='review__navbar nav__bar__buttons'>
                    Write a Review
                </a>
                <a href='/litter'
                    className='business__navbar nav__bar__buttons'>
                    Create New Litter
                </a>
                <div className='buttons__sessions nav__bar__buttons'>
                    {sessionLinks}
                </div>
            </div>
        </div>
    )
};

export default NavigationLitter;
