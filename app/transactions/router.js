var express = require('express');
var router = express.Router();
const { index, detailTransaction, createTransaction, editTransaction, deleteTransaction } = require('./controller');

router.get('/', index);
router.post('/', createTransaction);
router.get('/detail/:id', detailTransaction);
router.put('/edit/:id', editTransaction);
router.patch('/edit/:id', editTransaction);
router.delete('/delete/:id', deleteTransaction);


module.exports = router;
