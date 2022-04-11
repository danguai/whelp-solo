import React from 'react';

import Litters from '../Litters';

import './Splashpage.css';

const Splashpage = () => {

    return (
        <div>
            <div className='bg__image__container'>
                <div className='logo__search__content'>
                    <a href='/'>
                        <img className='whelp__logo' src={require('../../images/whelp-logo.png')} />
                    </a>
                    <div className='splashpage__searchbar__container'>
                        {/* <form id="search__form__splashpage">
                            <input className='searchbar__splashpage' type="search" />
                            <button className='magnifier__search__button__splashpage all__buttons' >
                                <img className='magnifier' src={require('../../images/magnifier.png')} />
                            </button>
                        </form> */}
                    </div>
                </div>
            </div>
            <div className='new__litters__container'>
                <div className='new__litters__title'>
                    New Litters
                </div>
                <div>
                    <Litters />
                </div>
            </div>

        </div>
    )
};

export default Splashpage;
