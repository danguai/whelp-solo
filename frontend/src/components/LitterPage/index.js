import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readLitter } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './LitterPage.css';
import './score.css';

const LitterPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [active, setActive] = useState('false');

    // const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);

    useEffect(() => {
        dispatch(readLitter(id));
    }, [dispatch]);

    let countScore = 0;

    const handleToggle = () => {

        setActive(!active);
    };

    if (!litter) return null;

    return (
        <div>
            <div className='litter__name'>
                {litter.name}
            </div>
            <div className='paws__score'>
                <div>
                    <img
                        className={active ? 'one__paw__score__gray' : 'one__paw__score__yellow'}
                        src={require('../../images/Paw-Score.png')}
                        onClick={handleToggle}
                    />
                </div>
                <div>
                    <img
                        className={active ? 'two__paw__score__gray' : 'two__paw__score__yellow__orange'}
                        src={require('../../images/Paw-Score.png')}
                        onClick={handleToggle}
                    />
                </div>
                <div>
                    <img
                        className='three__paw__score__gray'
                        src={require('../../images/Paw-Score.png')}
                    />
                </div>
                <div>
                    <img
                        className='four__paw__score__gray'
                        src={require('../../images/Paw-Score.png')}
                    />
                </div>
                <div>
                    <img
                        className='five__paw__score__gray'
                        src={require('../../images/Paw-Score.png')}
                    />
                </div>
            </div>
            <div className='gradient'>
                <img
                    className='litter__bg__image'
                    src={litter.imageHeader}
                />
            </div>
            <div>
                Pups
            </div>
        </div>
    )
};

export default LitterPage;
