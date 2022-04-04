import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readAllLitter } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './LitterAll.css';

const LitterAll = () => {
    const dispatch = useDispatch();

    const allLitter = useSelector(state => state.litter?.litterList);

    console.log('ALL LITTER', allLitter);

    useEffect(() => {
        dispatch(readAllLitter());
    }, [dispatch]);


    return (
        <div>
            Litter All Page
            <ul>
                {allLitter.map(litter =>
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

export default LitterAll;
