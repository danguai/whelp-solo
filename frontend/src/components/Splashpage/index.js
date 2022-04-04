import React from 'react';
import { useSelector } from 'react-redux';

import Litters from '../Litters';

import './Splashpage.css';


const Splashpage = () => {

    const litters = useSelector(state => state.litter?.littersList);

    console.log('LITTERS', litters);

    return (
        <div>
            <div className='bg__image__container'>
                <div className='logo__search__content'>
                    <a href='/'>
                        <img className='whelp__logo' src={require('../../images/whelp-logo.png')} />
                    </a>
                    <div className='splashpage__searchbar__container'>
                        <form id="search__form__splashpage">
                            <input className='searchbar__splashpage' type="search" />
                            <button className='magnifier__search__button__splashpage all__buttons' >
                                <img className='magnifier' src={require('../../images/magnifier.png')} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                New Litters
                <Litters />
            </div>
        </div>
    )
};

export default Splashpage;
