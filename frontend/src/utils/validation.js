//   L I T T E R   V A L I D A T O R S
export const validateLitterName = (name) => {
    if (!name) return `Please provide a Litter's Name.`;

    if (name.length > 50) return `Litter's Name should be less than 50 characters`;
    return '';
};

export const validateImageHeader = (imageHeader) => {
    if (!imageHeader) return `Please provide an image.`;
    return '';
};

export const validateLitterDescription = (description) => {
    if (!description) return `Please provide a Litter's Description.`;
    return '';
};

export const validateAddress = (address) => {
    if (!address) return 'Please provide an Address.';

    if (address.length > 255) return 'Address should be less than 255 characters';
    return '';
};

export const validateCity = (city) => {
    if (!city) return 'Please provide a City.';

    if (city.length > 85) return 'City should be less than 85 characters';
    return '';
};

export const validateState = (state) => {
    if (!state) return 'Please provide a State.';

    if (state.length > 60) return 'State should be less than 60 characters';
    return '';
};

export const validateZipcode = (zipcode) => {
    if (!zipcode) return 'Please provide a Zipcode.';

    if (zipcode < 0) return `Zipcode can't be a negative numbers.`;

    if (zipcode.length !== 5) return 'Zipcode must have a length of 5 numbers.';

};

//   P U P P I E S   V A L I D A T O R S
export const validatePuppyName = (name) => {
    if (!name) return `Please provide a Puppy's Name.`;

    if (name.length > 50) return `Puppy's Name should be less than 50 characters`;
    return '';
};

export const validatePuppyDescription = (description) => {
    if (!description) return `Please provide a Puppy's Description.`;
    return '';
};

export const validateMonth = (month) => {
    if (!month) return `Please provide the month of Birth.`;

    // if (!isNumeric(month)) return `Month must be numbers.`;

    if (month < 1 || month > 12) return 'Please provide a valid month.';
    return '';
};

export const validateDay = (day) => {
    if (!day) return `Please provide the day of Birth.`;

    // if (!isNumeric(day)) return `Please provide a valid day.`;

    if (day < 1 || day > 30) return 'Please provide a valid day.';  // NEED TO FIX THIS LOGIC

    return '';
};

export const validateYear = (year) => {
    if (!year) return `Please provide the year of Birth.`;

    if (year < 2015) return `Please provide a Year between 2015 & 2022`;

    if (year > 2022) return `You can't find a puppy in the future!`;
    return '';
};

//   R E V I E W S   V A L I D A T O R S

export const validateScore = (rating) => {
    if (rating < 1 || rating > 5) return false;
    return true;
};
