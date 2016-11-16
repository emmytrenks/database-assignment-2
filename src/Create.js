import React, { Component } from 'react'
import origin from 'origin-url'
import { postJSON } from './fetch'
import PlayerForm from './PlayerForm'

import FIELDS from './PlayerFields'

export default class Create extends Component {
  static propTypes = {
    onCreate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      creating: false
    }
  }

  onCreate(e) {
    e.target.blur()
    this.setState({ creating: true })
  }

  onSubmit(e) {
    e.target.blur()
    const obj = { }
    for (const f of FIELDS) obj[f.field] = document.getElementById(f.field).value
    postJSON(`${origin}/api/players`, obj).then(res => {
      this.setState({ creating: false })
      alert('Successfully created!')
      this.props.onCreate()
    }).catch(e => {
      alert(`Failed to create ... please check your form for validity.`)
    })
  }

  onCancel(e) {
    e.target.blur()
    this.setState({ creating: false })
  }

  render() {
    const { creating } = this.state
    if (creating) return (<PlayerForm onSubmit={this.onSubmit.bind(this)} onCancel={this.onCancel.bind(this)} />)
    return (
      <div>
        <button
          type="button"
          onClick={e => this.onCreate(e)}
          className="btn btn-primary">Create New Player</button>
        <hr />
      </div>
    )
  }
}
