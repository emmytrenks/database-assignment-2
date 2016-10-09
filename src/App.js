import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Create from './Create'
import Indians from './Indians'

export default class extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Create />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Indians />
          </div>
        </div>
      </div>
    )
  }
}
