import { csrfFetch } from './csrf';

//  C O N S T A N T S

const CREATE_IMAGE = 'puppies/CREATE_IMAGE';
const READ_IMAGES = 'puppies/READ_IMAGES';
const UPDATE_IMAGE = 'puppies/UPDATE_IMAGE';
const DELETE_IMAGE = 'puppies/DELETE_IMAGE';


//  A C T I O N S

const readImagesAction = images => {
    return {
        type: READ_IMAGES,
        arrOfImages: images
    };
};

//  T H U N K S
//  R E A D   A L L   I M A G E S   T H U N K
export const readImages = (litterId, puppyId) => async dispatch => {
    const response = await csrfFetch(`/api/litter/${litterId}/puppies/${litterId}/images`);

    if (response.ok) {
        const images = await response.json();
        dispatch(readImagesAction(images));
    }
};


//  R E D U C E R S
const initialState = { imagesList: [] };

const imagesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_IMAGES:
            newState = Object.assign({}, state);
            newState.imagesList = action.arrOfImages;
            return newState;
        default:
            return state;
    }
};


export default imagesReducer;
