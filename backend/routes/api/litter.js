const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Litter } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//  C R E A T E   L I T T E R
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { name,
        imageHeader,
        description,
        address
    } = req.body;

    console.log('REQ.BODY', req.body);

    const userId = req.user.id;
    console.log('USERID', userId);
    try {
        const litter = await Litter.create(
            {
                name,
                imageHeader,
                description,
                address,
                userId
            });

        console.log('LITTER-LITTER', litter);
        return res.json({ litter });
    } catch (e) {
        console.log(e);
    }
}));

module.exports = router;
