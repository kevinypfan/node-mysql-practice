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

con.connect();
app.get('/tabledata/:table', (req, res) => {
  con.query(`SELECT * FROM ${req.params.table}`, function (err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
})

app.post('/insertdata', (req, res) => {
  console.log(req.body);
  con.query(`INSERT INTO ${req.body.tableName} (mon, tue, wed, thu, fri) VALUES ?`, [req.body.values], function (err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
})

app.get('/tablename',(req, res) => {
  con.query(`SHOW TABLES IN nodedata`, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
})

app.post('/createtable', (req, res) => {
  var tableName = req.body.tableName;
  con.query(`CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, mon VARCHAR(255), tue VARCHAR(255), wed VARCHAR(255), thu VARCHAR(255), fri VARCHAR(255))`, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send(tableName)
  });
})

app.use(fallback('index.html', { root: __dirname }))

app.listen(3000, () => {
  console.log('start up port 3000');
})
