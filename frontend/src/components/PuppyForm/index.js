import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { createPuppy } from '../../store/puppies';
// import * as sessionActions from '../../store/session';

import './PuppyForm.css';

const PuppyForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litterId = useSelector(state => state.litter?.litter.id);

    // console.log('SESSION USER', session);
    // console.log('LITTER ID', litterId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPuppy = {
            name,
            description,
            year,
            month,
            day,
            litterId
        };

        try {

            const createdPuppy = await dispatch(createPuppy(newPuppy));

            console.log('CREATED PUPPY', createdPuppy);

            history.push(`/litter/${litterId}`);
        } catch (e) {
            console.log('IS IT HERE?', e);
        }
    };

    if (!litterId) return null;

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
                            placeholder='Description'
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Month'
                            type="text"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Day'
                            type="text"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Year'
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className='red__button signup__button'
                        type="submit"
                    >
                        New Puppy
                    </button>
                </form>
            </div>
        </div>
    )
};


export default PuppyForm;
