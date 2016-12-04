import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import origin from 'origin-url'
import { getJSON, postJSON } from '../fetch'
import Players from './Players'
import Create from './Create'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    this.grab()
  }

  grab(order = 'asc', attr = 'id') {
    this.lastOrder = order
    this.lastAttr = attr

    getJSON(`${origin}/api/players/${order}/${attr}`).then(players => {
      this.setState({ players })
    }).catch(err => {
      console.log('Error fetching players:', err)
    })
  }

  search(search = '') {
    postJSON(`${origin}/api/players/search`, { search }).then(players => {
      this.setState({ players })
    }).catch(err => {
      console.log('Error fetching players:', err)
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

  refresh() {
    this.grab(this.lastOrder, this.lastAttr)
  }

  onSearch(e) {
    e.preventDefault()
    e.target.blur()
    const str = document.getElementById('searchString').value
    if (str) this.search(str)
    else this.refresh()
  }

  render() {
    const { players } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Create onCreate={() => this.grab()} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form className="form-inline">
              <div className="form-group">
                <label htmlFor="searchString">Search</label>
                &nbsp;
                <input type="search" className="form-control" id="searchString" placeholder="Search for ..." />
              </div>
              &nbsp;
              <button onClick={e => this.onSearch(e)} type="submit" className="btn btn-default">Search</button>
            </form>
            <Players
              players={players}
              sortAsc={this.sortAsc.bind(this)}
              sortDesc={this.sortDesc.bind(this)}
              refresh={this.refresh.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
