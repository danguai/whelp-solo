const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//  L O G I N   V A L I D A T O R
const validateLogin = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid password.'),
    handleValidationErrors
];

//   L O G I N
router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials are invalid.'];
        return next(err);
    }
    await setTokenCookie(res, user);

    return res.json({ user });
}));

//   L O G O U T
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

//   R E S T O R E   S E S S I O N
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else {
        return res.json({});
    }
});

module.exports = router;
