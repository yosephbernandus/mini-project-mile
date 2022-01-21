
var express = require('express');
var router = express.Router();
const { index, detailKoli, createKoli, editKoli, deleteKoli } = require('./controller');

router.get('/', index);
router.post('/', createKoli);
router.get('/detail/:id', detailKoli);
router.put('/edit/:id', editKoli);
router.delete('/delete/:id', deleteKoli);


module.exports = router;
