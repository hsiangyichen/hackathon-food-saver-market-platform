'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../src/db');
const { request } = require('express');
var router = express.Router();
router.use(express.json());
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});
router.post('/signUp',async function (req, res) {
    console.log(req.body);
    const message = await db.addUser(req.body['name'], req.body['email'], req.body['password'],req.body['kind'],req.body['pic'])
    res.send(message);
});
router.post('/logIn', async function (req, res) {
    console.log(req.body);
    const message = await db.checkUserExist(req.body['email'], req.body['kind'], req.body['password'])
    res.send(message);
});



module.exports = router;