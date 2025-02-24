const mysql = require('mysql2')
const { HOST, USER, PASSWORD, DB_NAME } = process.env
const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB_NAME,
})

connection.connect(err => {
  if (err) throw err
  console.log('Connected to MySQL!')
})

module.exports = connection
