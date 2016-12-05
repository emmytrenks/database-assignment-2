const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')

const url = require('url')
const params = url.parse(process.env.DATABASE_URL)
const auth = params.auth.split(':')

const pg = require('pg')
const pool = new pg.Pool({
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
})

const PLAYER_FIELDS = ['id', 'dob', 'first_name', 'last_name', 'weight', 'height', 'batting_hand', 'throwing_hand']
const SALARY_FIELDS = ['id', 'sal_year', 'team', 'salary']

// This end-point sorts players by an attribute ascending.
app.get('/api/players/asc/:attr', (req, res) => {
  pool.query(`select * from players natural join (select * from player_salaries where sal_year = \'2015\') as c order by ${req.params.attr} asc`, (err, result) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching players!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(result.rows)
    }
  })
})

// This end-point sorts players by an attribute descending.
app.get('/api/players/desc/:attr', (req, res) => {
  pool.query(`select * from players natural join (select * from player_salaries where sal_year = \'2015\') as c order by ${req.params.attr} desc`, (err, result) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching players!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(result.rows)
    }
  })
})

// This end-point searches players by attributes
app.post('/api/players/search', bodyParser.json(), (req, res) => {
  const body = req.body || { }
  const search = body.search || ''
  if (!search) {
    res.status(400)
    res.json({ error: 'You cannot search for something empty.' })
    return
  }

  pool.query('select * from players natural join (select * from player_salaries where sal_year = \'2015\') as c where id like $1 or first_name like $1 or last_name like $1 or team like $1', [`%${search}%`], (err, result) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching players!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(result.rows)
    }
  })
})

// This end-point deletes a player by their id
app.get('/api/players/delete/:id', (req, res) => {
  pool.query('delete from players where id = $1', [req.params.id], (err, result) => {
    if (err) {
      res.status(500)
      res.json({ error: 'Failed to perform query' })
    } else {
      res.status(200)
      res.json({ status: 'OK' })
    }
  })
})

// This end-point creates a new player.
app.post('/api/players', bodyParser.json(), (req, res) => {
  let { body } = req
  body = body || { }
  for (const f of PLAYER_FIELDS) if (!body.hasOwnProperty(f)) {
    res.status(400)
    res.json({ error: `You did not provide a player field: ${f}.` })
    return
  }
  for (const f of SALARY_FIELDS) if (!body.hasOwnProperty(f)) {
    res.status(400)
    res.json({ error: `You did not provide a salary field: ${f}.` })
    return
  }

  pool.query('insert into players ' +
    `(${PLAYER_FIELDS.join(', ')}) ` +
    `values (${Array(PLAYER_FIELDS.length).fill('?').map((v, i) => `$${i + 1}`).join(', ')})`, PLAYER_FIELDS.map(v => body[v]), (err, result) => {
    if (err) {
      res.status(500)
      res.json({ error: 'Failed to perform query' })
    } else {
      pool.query('insert into player_salaries ' +
        `(${SALARY_FIELDS.join(', ')}) ` +
        `values (${Array(SALARY_FIELDS.length).fill('?').map((v, i) => `$${i + 1}`).join(', ')})`, SALARY_FIELDS.map(v => body[v]), (err, result) => {
        if (err) {
          res.status(500)
          res.json({ error: 'Failed to perform query' })
        } else {
          res.status(200)
          res.json({ status: 'OK' })
        }
      })
    }
  })
})

// This end-point updates a player.
app.post('/api/players/update', bodyParser.json(), (req, res) => {
  let { body } = req
  body = body || { }
  for (const f of PLAYER_FIELDS) if (!body.hasOwnProperty(f)) {
    res.status(400)
    res.json({ error: `You did not provide a player field: ${f}.` })
    return
  }
  for (const f of SALARY_FIELDS) if (!body.hasOwnProperty(f)) {
    res.status(400)
    res.json({ error: `You did not provide a salary field: ${f}.` })
    return
  }

  pool.query('update players set ' + PLAYER_FIELDS.slice(1).map((f, i) => {
    return `${f} = $${i + 1}`
  }).join(', ') + ` where id = $${PLAYER_FIELDS.length}`, [...PLAYER_FIELDS.slice(1).map(v => body[v]), body.id], (err, result) => {
    if (err) {
      res.status(500)
      res.json({ error: 'Failed to perform query' })
    } else {
      pool.query('update player_salaries set ' + SALARY_FIELDS.slice(1).map((f, i) => {
        return `${f} = $${i + 1}`
      }).join(', ') + ` where id = $${SALARY_FIELDS.length}`, [...SALARY_FIELDS.slice(1).map(v => body[v]), body.id], (err, result) => {
        if (err) {
          res.status(500)
          res.json({ error: 'Failed to perform query' })
        } else {
          res.status(200)
          res.json({ status: 'OK' })
        }
      })
    }
  })
})

app.get('/api/teams', (req, res) => {
  pool.query(`select sum(salary) as total, team from player_salaries where sal_year = \'2015\' group by team order by total desc`, (err, result) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching teams!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(result.rows)
    }
  })
})

app.get('/api/salaries', (req, res) => {
  pool.query(
    `select id, first_name, last_name, change from players natural join (
      select id, (
        (
          select salary from player_salaries inner1 where inner1.id = uid.id and
            inner1.sal_year = (select max(sal_year) from player_salaries where id = uid.id)
        ) - (
          select salary from player_salaries inner2 where inner2.id = uid.id and
            inner2.sal_year = (select min(sal_year) from player_salaries where id = uid.id)
        )
      ) as change from player_salaries uid group by id
    ) as foobar order by change desc;`, (err, result) => {
    if (err) {
      res.status(500)//HTTP status code: server error
      res.json({ error: 'Error fetching teams!' })
    } else {
      res.status(200)//HTTP status code: success
      res.json(result.rows)
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
