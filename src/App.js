import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Indians from './Indians'
import Create from './Create'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { indians: [] }
  }

  componentDidMount() {
    this.grab()
  }

  grab() {
    fetch('/api/indians').then(res => res.json()).then(indians => {
      this.setState({ indians })
    }).catch(err => {
      console.log('Error fetching indians:', err)
    })
  }

  render() {
    const { indians } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Create onCreate={() => this.grab()} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Indians indians={indians} />
          </div>
        </div>
      </div>
    )
  }
}
