var express = require('express');
var router = express.Router();
const { index, detailCustomer, createCustomer, editCustomer, deleteCustomer } = require('./controller');

router.get('/', index);
router.post('/', createCustomer);
router.get('/detail/:id', detailCustomer);
router.put('/edit/:id', editCustomer);
router.delete('/delete/:id', deleteCustomer);


module.exports = router;
