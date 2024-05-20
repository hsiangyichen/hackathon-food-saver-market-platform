const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 1688;
const routes = require('./routes/index');
const storeRouter = require('./routes/Store/index');
const db = require('./src/db');
// sendFile will go here
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.get('/storePage/:kind', async function (req, res) {
  console.log(req.params.kind, "----")
  const data = await db.getStore(req.params.kind)
  console.log(data)
  res.render('Custom/store', {
    kind: req.params.kind,
    data: data
  });
});
app.post('/productPage', async function (req, res) {
  console.log(req.body)
  var data=null
  if ('address' in req.body) {
    data = await db.getProduct('address',req.body.address)
  } else {
    data = await db.getProduct('name',req.body.name)
  }

  console.log(data)
  res.render('Custom/product', {
    data: data
  });
});
app.get('/managePage', function (req, res) {
  res.render('Store/product');
});
app.post('/getSearch', async function (req, res) {
  const data = await db.getSearch(req.body.name)
  console.log(data)
  res.send(data)
});
app.get("/testet", (req, res) => {
  res.render('testet');
});
// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views')); //注意path要require一下
app.set('view engine', 'html');
app.use('/', routes);
app.use('/store', storeRouter);
app.listen(port);
console.log('Server started at http://localhost:' + port);