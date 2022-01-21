var express = require('express');
var router = express.Router();
const { index, detailLocation, createLocation, editLocation, deleteLocation } = require('./controller');

router.get('/', index);
router.post('/', createLocation);
router.get('/detail/:id', detailLocation);
router.put('/edit/:id', editLocation);
router.delete('/delete/:id', deleteLocation);


module.exports = router;
