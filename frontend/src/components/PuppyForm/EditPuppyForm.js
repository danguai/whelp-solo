import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { updatePuppy } from '../../store/puppies';
// import * as sessionActions from '../../store/session';

import './PuppyForm.css';

const EditPuppyForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);
    const puppy = useSelector(state => state.puppies)

    // console.log('SESSION USER', session);
    console.log('LITTER ID', litter);
    console.log('PUPPIES: ', puppy);

    const [name, setName] = useState(puppy.name);
    const [description, setDescription] = useState(puppy.description);
    const [day, setDay] = useState(puppy.day);
    const [month, setMonth] = useState(puppy.month);
    const [year, setYear] = useState(puppy.year);

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedPuppy = {
            ...puppy,
            name,
            description,
            year,
            month,
            day,
            // litterId
        };

        const updatedPuppy = await dispatch(updatePuppy(editedPuppy));
        // history.push(`/litter/${litterId}/puppies/${updatedPuppy.id}`);

    };

    // if (!litterId) return null;

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


export default EditPuppyForm;
