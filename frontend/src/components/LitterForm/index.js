import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { createLitter, updateLitter } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './Litter.css';

const Litter = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);

    const [name, setName] = useState('');
    const [imageHeader, setImageHeader] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newLitter = {
            name,
            imageHeader,
            description,
            address,
        };

        await dispatch(createLitter(newLitter));
        history.push(`/litter/${litter.id}`);

    };


    return (
        <div>
            <div className='create__litter__containter'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            placeholder='Name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Image'
                            type="text"
                            value={imageHeader}
                            onChange={(e) => setImageHeader(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Description'
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Address'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className='red__button signup__button'
                        type="submit"
                    >
                        New Litter
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Litter;
