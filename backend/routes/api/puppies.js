const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Puppy } = require('../../db/models');


const router = express.Router();


//  C R E A T E   P U P P Y
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { name,
        description,
        birthday
    } = req.body;

    const userId = req.user.id;
    const litterId = req.litter.id;

    try {
        const puppy = await Puppy.create(
            {
                name,
                description,
                birthday,
                userId,
                litterId
            });
        return res.json({ puppy });
    } catch (e) {
        console.log(e);
    }
}));

module.exports = router;
