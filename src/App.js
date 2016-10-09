import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import origin from 'origin-url'
import { getJSON, postJSON } from './fetch'
import Indians from './Indians'
import Create from './Create'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indians: [],
      searchAttr: 'first_name'
    }
  }

  componentDidMount() {
    this.grab()
  }

  grab(order = 'asc', attr = 'jersey') {
    this.lastOrder = order
    this.lastAttr = attr

    getJSON(`${origin}/api/indians/${order}/${attr}`).then(indians => {
      this.setState({ indians })
    }).catch(err => {
      console.log('Error fetching indians:', err)
    })
  }

  search(search = '') {
    const { searchAttr } = this.state
    postJSON(`${origin}/api/indians/search/${searchAttr}`, { search }).then(indians => {
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
            <form className="form-inline">
              <div className="form-group">
                <label htmlFor="searchString">Search</label>
                &nbsp;
                <input type="search" className="form-control" id="searchString" placeholder="Search for ..." />
              </div>
              &nbsp;
              <button onClick={e => this.onSearch(e)} type="submit" className="btn btn-default">Search</button>
            </form>
            <Indians
              indians={indians}
              sortAsc={this.sortAsc.bind(this)}
              sortDesc={this.sortDesc.bind(this)}
              refresh={this.refresh.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
