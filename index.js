const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')

const mysql = require('mysql')
const sql = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  database: 'eat37'
})

const FIELDS = ['jersey', 'first_name', 'last_name', 'position', 'height', 'weight', 'batting_hand', 'throwing_hand', 'dob']

// This end-point creates a new indian.
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

// This end-point updates an indian.
app.post('/api/indians/update', bodyParser.json(), (req, res) => {
  let { body } = req
  body = body || { }
  for (const f of FIELDS) if (!body.hasOwnProperty(f)) {
    res.status(400)
    res.json({ error: `You did not provide a field: ${f}.` })
    return
  }

  sql.query('update indians set ' + FIELDS.slice(1).map(f => {
    return `${f} = ?`
  }).join(', ') + ' where jersey = ?', [...FIELDS.slice(1).map(v => body[v]), body.jersey], (err, result) => {
    if (err) {
      res.status(500)
      res.json({ error: 'Failed to perform query' })
    } else {
      res.status(200)
      res.json({ status: 'OK' })
    }
  })
})

// This end-point sorts indians by an attribute ascending.
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

// This end-point sorts indians by an attribute descending.
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

// This end-point searches indians by an attribute.
app.post('/api/indians/search/:attr', bodyParser.json(), (req, res) => {
  const body = req.body || { }
  const search = body.search || ''
  if (!search) {
    res.status(400)
    res.json({ error: 'You cannot search for something empty.' })
    return
  }

  sql.query('select * from indians where ?? like ?', [req.params.attr, `%${search}%`], (err, rows) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching indians!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(rows)
    }
  })
})

// This end-point deletes an indian by their primary key.
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

const root = __dirname + '/build'
app.use(express.static(root))
app.use(fallback('index.html', { root }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Listening to port', PORT, '...')
})
