const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});




/*
//   T E S T E R S   U S E R   A U T H   M I D D L E W A R E   R O U T E S
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
    const user = await User.findOne({
        where: { username: 'TheBreeder' }
    });
    setTokenCookie(res, user);
    return res.json({ user });
}));

router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
});

router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
});
*/

module.exports = router;
