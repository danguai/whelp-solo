import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readLitters } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './Litters.css';

const Litters = () => {
    const dispatch = useDispatch();

    const litters = useSelector(state => state.litter?.littersList);

    console.log('LITTERS LIST', litters);

    useEffect(() => {
        dispatch(readLitters());
    }, [dispatch]);


    return (
        <div>
            Litters Page
            <ul>
                {litters.map(litter =>
                    <li
                        key={litter.id}>
                        <NavLink to={`/litter/${litter.id}`}>
                            <div>
                                {litter.name}
                            </div>
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Litters;
