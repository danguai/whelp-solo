const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Puppy } = require('../../db/models');


const router = express.Router({ mergeParams: true });


//  C R E A T E   P U P P Y
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const {
        name,
        description,
        year,
        month,
        day,
    } = req.body;

    const userId = req.user.id;
    const litterId = req.params.litterId;

    console.log('LITTER ID', litterId);
    try {
        const puppy = await Puppy.create(
            {
                name,
                description,
                year,
                month,
                day,
                userId,
                litterId
            });
        return res.json({ puppy });
    } catch (e) {
        console.log(e);
    }
}));

module.exports = router;
