const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//  S I G N   U P   V A L I D A T O R
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('First Name should be between 4 and 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })
        .withMessage('Last Name should be between 4 and 50 characters long'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Password must be 3 characters or more.'),
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    // .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please confirm Password.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm Password doesn't match Password.");
            }
            return true;
        }),
    handleValidationErrors
];

//   S I G N   U P
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        imageProfile,
        password
    } = req.body;

    const user = await User.signup(
        {
            firstName,
            lastName,
            email,
            imageProfile,
            password
        }
    );

    await setTokenCookie(res, user);

    return res.json({ user });
}));

module.exports = router;
