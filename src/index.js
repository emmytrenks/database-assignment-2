import React from 'react'
import { render } from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import NoMatch from './NoMatch'
import Home from './components/Home'
import SalaryChange from './components/SalaryChange'
import TeamMoney from './components/TeamMoney'

import 'bootstrap/dist/css/bootstrap.css'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="salarychange" component={SalaryChange} />
      <Route path="teammoney" component={TeamMoney} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('root'))
