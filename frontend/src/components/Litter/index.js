import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

// import * as sessionActions from '../../store/session';

import './Litter.css';

const Litter = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter);

    console.log('SESSION USER:', sessionUser);
    console.log('FE LITTER:', litter);

    const [name, setName] = useState('');
    const [imageHeader, setImageHeader] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState([]);

    return (
        <div>
            <form>
            </form>>
        </div>
    )
};

export default Litter;
