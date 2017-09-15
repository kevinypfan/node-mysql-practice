require('./config/config.js')
const mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var webpackConfig = require('./webpack.config.js')

var app = express();

var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
}))

app.use(webpackHotMiddleware(compiler))

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.use(bodyParser.json())
app.use(express.static(__dirname))

con.connect();

app.delete('/deleteTable/:table', (req, res) => {
  con.query(`DROP TABLE ${req.params.table}`, function (err, result) {
    if (err) {
      res.status(403).send(err);
    }
    res.send(result)
  });
})


app.post('/insertTable', (req, res) => {
  var body = req.body;
  con.query(`INSERT INTO ${body.tableName} (mon, tue, wed, thu, fri) VALUES ?`,[body.values],(err, result) => {
    if (err) {
      res.status(401).send(err)
    }
    res.send(result)
  })
})

app.post('/createTable', (req, res) => {
  var tableName = req.body.tableName
  con.query(`CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, mon VARCHAR(255), tue VARCHAR(255), wed VARCHAR(255), thu VARCHAR(255), fri VARCHAR(255) )`, (err, result) => {
    if (err) {
      res.status(401).send(err)
    }
    res.send(tableName)
  })
})

app.get('/tableData/:table', (req, res) => {
  var table = req.params.table
  con.query(`SELECT * FROM ${table}`, (err, result) => {
    if (err) {
      res.status(401).send(err)
    }
    res.send(result)
  })
})

app.get('/findTable', (req, res) => {
  con.query(`SHOW TABLES IN ${process.env.DATABASE}`, (err, result) => {
    if (err) {
      res.status(401).send(err);
    }
    var data = []
    result.map((r,i) => {
      let key = Object.keys(r)
      data.push({tables: result[i][key]})
    })
    res.send(data)
  })
})

app.get('/api', (req, res) => {
  res.send( [
    {title: "Creat Table", link:'/createTable'},
    {title: "Insert Table", link:'/insertTable'},
    {title: "Tables", link:'/tables'}
  ])
})

app.use(fallback('index.html', { root: __dirname }))

app.listen(process.env.PORT, () => {
  console.log('start up port '+process.env.PORT);
})
