const express = require('express')
const app = express()

const mysql = require('mysql')
const sql = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  database: 'eat37'
})

app.get('/api/indians', (req, res) => {
  sql.query('select * from indians', (err, rows) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching indians!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(rows)
    }
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Listening to port', PORT, '...')
})
