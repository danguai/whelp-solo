import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readLitter, deleteLitter } from '../../store/litter';

import Puppies from '../Puppies';
// import * as sessionActions from '../../store/session';

import './LitterPage.css';
import './score.css';

const LitterPage = () => {
    const { litterId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [active, setActive] = useState('false');

    const litter = useSelector(state => state.litter?.litter);
    const sessionUser = useSelector(state => state.session.user);
    const puppies = useSelector(state => state.puppies?.puppiesList);

    useEffect(() => {
        dispatch(readLitter(litterId));
    }, [dispatch]);

    const handleToggle = () => {
        setActive(!active);
    };

    const removeLitter = async (litterId) => {
        await dispatch(deleteLitter(litterId));
        history.push('/');
    };

    if (!litter) return null;

    const litterOwner = litter.userId === sessionUser?.id;

    return (
        <div>
            <div>
                <Link to={`/`}
                    className='back__to__litter__button'>
                    <button className='button__litters all__buttons' >
                        Back to All Litters
                    </button>
                </Link>
            </div>
            <div className='litter__name'>
                {litter.name}
            </div>
            {!litterOwner &&
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
                            className={active ? 'three__paw__score__gray' : 'three__paw__score__orange'}
                            src={require('../../images/Paw-Score.png')}
                            onClick={handleToggle}
                        />
                    </div>
                    <div>
                        <img
                            className={active ? 'four__paw__score__gray' : 'four__paw__score__orange__red'}
                            src={require('../../images/Paw-Score.png')}
                            onClick={handleToggle}
                        />
                    </div>
                    <div>
                        <img
                            className={active ? 'five__paw__score__gray' : 'five__paw__score__red'}
                            src={require('../../images/Paw-Score.png')}
                            onClick={handleToggle}
                        />
                    </div>
                </div>
            }
            <div>
                {litterOwner && <Link to='/litter-edit'
                    className='edit__litter__button'>
                    <button className='button__edit__litter'>
                        Edit Litter
                    </button>
                </Link>}
                {litterOwner && <button
                    className='delete__litter__button button__edit__litter'
                    onClick={() => removeLitter(litterId)}
                    type='submit'
                >
                    Delete Litter
                </button>}
            </div>
            {/* <div>
                {litterOwner && <Link to={`/litter/${litter.id}/new-puppy`}
                    className='new__puppy__button'>
                    <button className='button__litters all__buttons' >
                        New Pup
                    </button>
                </Link>}
            </div> */}
            {/* <div>
                <Link to='/reviews'
                    className='edit__litter__button'>
                    <button>
                        Reviews
                    </button>
                </Link>
            </div> */}
            <div className='gradient'>
                <img
                    className='litter__bg__image'
                    src={litter.imageHeader}
                />
            </div>
            <div className='new__puppies__container'>
                <div className='new__puppies__title'>
                    Pups
                </div>
                <div className='bottom__margin__puppies'>
                    <Puppies />
                </div>
            </div>

        </div>
    )
};

export default LitterPage;
