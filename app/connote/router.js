
var express = require('express');
var router = express.Router();
const { index, detailConnote, createConnote, editConnote, deleteConnote } = require('./controller');

router.get('/', index);
router.post('/', createConnote);
router.get('/detail/:id', detailConnote);
router.put('/edit/:id', editConnote);
router.delete('/delete/:id', deleteConnote);


module.exports = router;
