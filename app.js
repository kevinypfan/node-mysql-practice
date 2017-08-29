const mysql = require('mysql');
const express = require('express')

var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yp037629701",
  database: "nodedata"
});

app.get('/allTable',(req, res) => {
  con.connect();
  con.query(`SHOW TABLES IN nodedata`, function(err, result) {
    if (err) throw err;
    console.log('The solution is: ', result);
    res.send(result)
  });
  con.end();
})

app.get('/database/:database', (req, res) => {
  con.connect();
  var database = req.params.database;
  con.query(`CREATE TABLE ${database} (id INT PRIMARY KEY, mon VARCHAR(255), tue VARCHAR(255), wed VARCHAR(255), thu VARCHAR(255), fri VARCHAR(255))`, function(err, result) {
    if (err) throw err;
    console.log('The solution is: ', result);
  });
  con.end();
})



app.listen(3000, () => {
  console.log('start up port 3000');
})
