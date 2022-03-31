import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../store/session';

import ProfileButton from './ProfileButton';

import './Navigation.css';

const NavigationRed = () => {


    return (
        <div className="navigation__bar__red">
            <a href='/' className='whelp__logo'>
                <img className='whelp__logo__white' src={require('../../images/whelp-logo-white.png')} />
            </a>
        </div>
    )
};

export default NavigationRed;
