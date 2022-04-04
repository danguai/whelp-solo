import React from 'react';

import LitterAll from '../LitterAll';

import './Splashpage.css';

const Splashpage = () => {
    return (
        <div>
            <div className='bg__image__container'>
                <div className='logo__search__content'>
                    <a href='/'>
                        <img className='whelp__logo' src={require('../../images/whelp-logo.png')} />
                    </a>
                    <div className='splashpage__searchbar'>
                        <form id="search__form">
                            <input className='searchbar' type="search" />
                            <button className='magnifier__search__button all__buttons' >
                                <img className='magnifier' src={require('../../images/magnifier.png')} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                Whelpers
                {/* <LitterAll /> */}
            </div>
        </div>
    )
};

export default Splashpage;
