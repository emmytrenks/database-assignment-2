import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import origin from 'origin-url'
import { getJSON } from './fetch'
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

  grab(order = 'asc', attr = 'jersey') {
    getJSON(`${origin}/api/indians/${order}/${attr}`).then(indians => {
      this.setState({ indians })
    }).catch(err => {
      console.log('Error fetching indians:', err)
    })
  }

  sortAsc(e, attr) {
    e.preventDefault()
    e.target.blur()
    this.grab('asc', attr)
  }

  sortDesc(e, attr) {
    e.preventDefault()
    e.target.blur()
    this.grab('desc', attr)
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
            <Indians
              indians={indians}
              sortAsc={this.sortAsc.bind(this)}
              sortDesc={this.sortDesc.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
