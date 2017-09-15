require('./config/config.js')
const express = require('express')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var webpackConfig = require('./webpack.config.js')
var { deleteTable, tableData, insertTable, findTable, createTable } = require('./db.js')

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

app.use(bodyParser.json())
app.use(express.static(__dirname))

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
