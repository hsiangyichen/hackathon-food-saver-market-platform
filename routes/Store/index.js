
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../../src/db');
var storeRouter = express.Router();
storeRouter.use(express.json());
/* GET home page. */
storeRouter.get('/:store/:name/', function (req, res) {
    res.render('Store/product',{storeTitle:req.params.store,nameTitle:req.params.name});
});
storeRouter.post('/manageProduct',async function (req, res) {
    const data=await db.getProduct('address',req.body.address)
    console.log(data)
    res.send(data);
});



module.exports = storeRouter;