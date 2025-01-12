const express = require('express');
const tourConrtol = require('../Controller/tourControlr');
const authController = require('../Controller/authController')

const router = express.Router();


router
    .route('/')
    .get(authController.protect, tourConrtol.getAllToure)
    .post(tourConrtol.createToure);

router
    .route('/:id')
    .get(tourConrtol.getTour)
    .patch(tourConrtol.updateToure)
    .delete(tourConrtol.deleteToure)

module.exports = router;
