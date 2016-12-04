import React, { Component } from 'react'

export default class NoMatch extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>404</h1>
        <p className="lead">Whoops, looks like that page doesn't exist!</p>
      </div>
    )
  }
}
