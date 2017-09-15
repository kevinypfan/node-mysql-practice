require('./config/config.js')
const mysql = require('mysql');
const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')

var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.use(bodyParser.json())
app.use(express.static(__dirname))

con.connect();

app.get('/test', (req, res) => {
  res.status(403).send('my faild')
})

app.delete('/deleteTable/:table', (req, res) => {
  con.query(`DROP TABLE ${req.params.table}`, function (err, result) {
    if (err) {
      res.status(403).send(err);
    }
    res.send(result)
  });
})
//改
app.get('/tableData/:table', (req, res) => {
  con.query(`SELECT * FROM ${req.params.table}`, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result)
  });
})
//改
app.post('/insertTable', (req, res) => {
  console.log(req.body);
  con.query(`INSERT INTO ${req.body.tableName} (mon, tue, wed, thu, fri) VALUES ?`, [req.body.values], function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result)
  });
})
//改
app.get('/findTable',(req, res) => {
  con.query(`SHOW TABLES IN ${process.env.DATABASE}`, function(err, result) {
    if (err) {
      res.status(400).send(err);
    }
    var data = []
    result.map((r,i) => {
      let key = Object.keys(r)
      data.push({tables: result[i][key]})
    })
    res.send(data)
  });
})
//改
app.post('/createTable', (req, res) => {
  var tableName = req.body.tableName;
  con.query(`CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, mon VARCHAR(255), tue VARCHAR(255), wed VARCHAR(255), thu VARCHAR(255), fri VARCHAR(255))`, function(err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(tableName)
  });
})

app.use(fallback('index.html', { root: __dirname }))

app.listen(process.env.PORT, () => {
  console.log('start up port '+process.env.PORT);
})
