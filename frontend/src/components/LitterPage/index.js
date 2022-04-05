import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readLitter, deleteLitter } from '../../store/litter';

import Puppies from '../Puppies';
// import * as sessionActions from '../../store/session';

import './LitterPage.css';
import './score.css';

const LitterPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [active, setActive] = useState('false');


    const litter = useSelector(state => state.litter?.litter);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(readLitter(id));
    }, [dispatch]);

    // let sumScore = 0;

    const handleToggle = () => {
        setActive(!active);
    };

    const removeLitter = () => {
        dispatch(deleteLitter(litter.id));
        history.push('/');
    };

    if (!litter) return null;

    const litterOwner = litter.userId === sessionUser?.id;

    const canWriteReview = sessionUser && !litterOwner;

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
            <div>
                {litterOwner && <Link to='/litter-edit'
                    className='edit__litter__button'>
                    <button>
                        Edit Litter
                    </button>
                </Link>}
                {litterOwner && <button
                    className='delete__litter__button'
                    onClick={removeLitter}
                    type='submit'
                >
                    Delete Litter
                </button>}
                {canWriteReview && <Link to='/reviews'
                    className='edit__litter__button'>
                    <button>
                        Leave a Review
                    </button>
                </Link>}
            </div>
            <div>
                {litterOwner && <Link to={`/litter/${litter.id}/new-puppy`}
                    className='new__puppy__button'>
                    <button>
                        New Pup
                    </button>
                </Link>}
            </div>
            <div className='gradient'>
                <img
                    className='litter__bg__image'
                    src={litter.imageHeader}
                />
            </div>
            <div>
                <div>
                    Pups
                </div>
                <div>
                    <Puppies />
                </div>
            </div>

        </div>
    )
};

export default LitterPage;
