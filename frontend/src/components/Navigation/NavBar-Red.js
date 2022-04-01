import React from 'react';

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
