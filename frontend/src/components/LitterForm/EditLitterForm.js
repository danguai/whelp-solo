import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { updateLitter } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './LitterForm.css';

const EditLitterForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);

    const [name, setName] = useState(litter.name);
    const [imageHeader, setImageHeader] = useState(litter.imageHeader);
    const [description, setDescription] = useState(litter.description);
    const [address, setAddress] = useState(litter.address);
    const [city, setCity] = useState(litter.city);
    const [state, setState] = useState(litter.state);
    const [zipcode, setZipcode] = useState(litter.zipcode);

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedLitter = {
            ...litter,
            name,
            imageHeader,
            description,
            address,
            city,
            state,
            zipcode
        };

        const updatedLitter = await dispatch(updateLitter(editedLitter));
        history.push(`/litter/${updatedLitter.id}`);

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
                    <div>
                        <input
                            placeholder='City'
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='State'
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder='Zipcode'
                            type="text"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className='red__button signup__button'
                        type="submit"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
};

export default EditLitterForm;
