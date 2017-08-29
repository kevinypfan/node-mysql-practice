const mysql = require('mysql');
const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')

var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yp037629701",
  database: "nodedata"
});

app.use(bodyParser.json())
app.use(express.static(__dirname))


app.get('/tabledata/:table', (req, res) => {
  con.connect();
  con.query(`SELECT * FROM ${req.params.table}`, function (err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
  con.end();
})

app.post('/insertdata', (req, res) => {
  var body = _.pick(req.body, ['values', 'table'])
  console.log(body);
  con.connect();
  con.query(`INSERT INTO ${body.table} (id, mon, tue, wed, thu, fri) VALUES ?`, [body.values], function (err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
  con.end();
})

app.get('/tablename',(req, res) => {
  con.connect();
  con.query(`SHOW TABLES IN nodedata`, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
  con.end();
})

app.get('/database/:database', (req, res) => {
  con.connect();
  var database = req.params.database;
  con.query(`CREATE TABLE ${database} (id INT PRIMARY KEY, mon VARCHAR(255), tue VARCHAR(255), wed VARCHAR(255), thu VARCHAR(255), fri VARCHAR(255))`, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
  con.end();
})

app.use(fallback('index.html', { root: __dirname }))

app.listen(3000, () => {
  console.log('start up port 3000');
})
