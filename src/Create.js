import React, { Component } from 'react'
import origin from 'origin-url'
import { postJSON } from './fetch'

const FIELDS = [
  { field: 'jersey', name: 'Jersey', type: 'number' },
  { field: 'first_name', name: 'First Name', type: 'text' },
  { field: 'last_name', name: 'Last Name', type: 'text' },
  { field: 'position', name: 'Position', type: 'text' },
  { field: 'height', name: 'Height', type: 'number' },
  { field: 'weight', name: 'Weight', type: 'number' },
  { field: 'batting_hand', name: 'Batting Hand', type: 'text' },
  { field: 'throwing_hand', name: 'Throwing Hand', type: 'text' },
  { field: 'dob', name: 'Date of Birth', type: 'date' }
]

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
    postJSON(`${origin}/api/indians`, obj).then(res => {
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
    if (creating) {
      const form = (
        <div className="text-center">
          <form className="form-horizontal">
            {FIELDS.map(v => {
              return (
                <div key={v.field} className="form-group">
                  <label htmlFor={v.field} className="col-sm-2 control-label">{v.name}</label>
                  <div className="col-sm-10">
                    <input type={v.type} className="form-control" id={v.field} placeholder="" />
                  </div>
                </div>
              )
            })}
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="button"
                  onClick={e => this.onSubmit(e)}
                  className="btn btn-success">Create</button>
                &nbsp;
                <button
                  type="button"
                  onClick={e => this.onCancel(e)}
                  className="btn btn-warning">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )
      return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-body">
                {form}
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <button
          type="button"
          onClick={e => this.onCreate(e)}
          className="btn btn-primary">Create New Player</button>
      </div>
    )
  }
}
