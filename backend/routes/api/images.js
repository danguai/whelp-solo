const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Image } = require('../../db/models');

const router = express.Router({ mergeParams: true });

//  C R E A T E   P U P P Y

//  R E A D   I M A G E S
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    return res.json(images);
}));

module.exports = router;
