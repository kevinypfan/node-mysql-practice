const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

con.connect();

const deleteTable = (table) => {
  return new Promise((resolve, reject) => {
    con.query(`DROP TABLE ${table}`, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result)
    });
  })
}

const tableData = (table) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM ${table}`, function (err, result) {
      if (err) {
        reject(err);
      }
    resolve(result)
    })
  })
}

const insertTable = (tableName, values) => {
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO ${tableName} (mon, tue, wed, thu, fri) VALUES ?`, [values], function (err, result) {
      if (err) {
        reject(err);
      }
    resolve(result)
    });
  })
}

const findTable = () => {
  return new Promise((resolve, reject) => {
    con.query(`SHOW TABLES IN ${process.env.DATABASE}`, function(err, result) {
      if (err) {
        reject(err);
      }
      console.log(result);
      var data = []
      result.map((r,i) => {
        let key = Object.keys(r)
        data.push({tables: result[i][key]})
      })
      resolve(data)
    });
  })
}

const createTable = (tableName) => {
  return new Promise((resolve, reject) => {
    con.query(`CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, mon VARCHAR(255), tue VARCHAR(255), wed VARCHAR(255), thu VARCHAR(255), fri VARCHAR(255))`, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(tableName)
    });
  })
}



module.exports = {
  deleteTable,
  tableData,
  insertTable,
  findTable,
  createTable
}
