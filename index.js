const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mysql = require('mysql')
const sql = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  database: 'eat37'
})

const FIELDS = ['first_name', 'last_name', 'jersey', 'position', 'height', 'weight', 'batting_hand', 'throwing_hand', 'dob']

app.post('/api/indians', bodyParser.json(), (req, res) => {
  let { body } = req
  body = body || { }
  for (const f of FIELDS) if (!body.hasOwnProperty(f)) {
    res.status(400)
    res.json({ error: `You did not provide a field: ${f}.` })
    return
  }

  sql.query('insert into indians ' +
    `(${FIELDS.join(', ')}) ` +
    'values (?, ?, ?, ?, ?, ?, ?, ?, ?)', FIELDS.map(v => body[v]), (err, result) => {
    if (err) {
      res.status(500)
      res.json({ error: 'Failed to perform query' })
    } else {
      res.status(200)
      res.json({ status: 'OK' })
    }
  })
})

app.get('/api/indians/asc/:attr', (req, res) => {
  sql.query('select * from indians order by ?? asc', [req.params.attr], (err, rows) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching indians!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(rows)
    }
  })
})

app.get('/api/indians/desc/:attr', (req, res) => {
  sql.query('select * from indians order by ?? desc', [req.params.attr], (err, rows) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching indians!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(rows)
    }
  })
})

app.get('/api/indians/delete/:jersey', (req, res) => {
  sql.query('delete from indians where jersey = ?', [req.params.jersey], (err, result) => {
    if (err) {
      res.status(500)
      res.json({ error: 'Failed to perform query' })
    } else {
      res.status(200)
      res.json({ status: 'OK' })
    }
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Listening to port', PORT, '...')
})
