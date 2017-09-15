require('./config/config.js')
const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')
var { deleteTable, tableData, insertTable, findTable, createTable } = require('./db.js')

var app = express();

app.use(bodyParser.json())
app.use(express.static(__dirname))




app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (req, res) => {
  res.status(403).write('my faild')
  res.end();
})

app.delete('/deleteTable/:table', (req, res) => {
  deleteTable(req.params.table)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.get('/tableData/:table', (req, res) => {
  tableData(req.params.table)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.post('/insertTable', (req, res) => {
  insertTable(req.body.tableName ,req.body.values)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.get('/findTable',(req, res) => {
  findTable()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.post('/createTable', (req, res) => {
  var tableName = req.body.tableName;
  createTable(tableName)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.use(fallback('index.html', { root: __dirname }))

app.listen(process.env.PORT, () => {
  console.log('start up port '+process.env.PORT);
})
