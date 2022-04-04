import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readOneLitter } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './LitterPage.css';

const LitterPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);

    useEffect(() => {
        dispatch(readOneLitter(id));
    }, [dispatch]);


    if (!litter) return null;

    return (
        <div>
            <div>
                {litter.name}
            </div>
            <div>
                <img className='litter__bg__image' src={litter.imageHeader} />
            </div>
        </div>
    )
};

export default LitterPage;
