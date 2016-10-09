import React, { Component } from 'react'
import moment from 'moment'
import origin from 'origin-url'
import { getJSON, postJSON } from './fetch'
import PlayerForm from './PlayerForm'
import PlayerFields from './PlayerFields'

function formatDate(str) {
  return moment(str).format('ll')
}

function handToString(str) {
  if (str === 'R') return 'Right'
  else if (str === 'L') return 'Left'
  else if (str === 'S') return 'Switch'
  return `${str} (unknown)`
}

function positionToString(str) {
  if (str === 'O') return 'Outfield'
  else if (str === 'I') return 'Infield'
  else if (str === 'C') return 'Catcher'
  else if (str === 'P') return 'Pitcher'
  return `${str} (unknown)`
}

export default class extends Component {
  static propTypes = {
    indians: React.PropTypes.array.isRequired,
    sortAsc: React.PropTypes.func.isRequired,
    sortDesc: React.PropTypes.func.isRequired,
    refresh: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      editing: null
    }
  }

  onEdit(e, obj) {
    e.preventDefault()
    e.target.blur()
    this.setState({ editing: obj })
  }

  onDelete(e, jersey) {
    e.preventDefault()
    e.target.blur()

    getJSON(`${origin}/api/indians/delete/${jersey}`).then(res => {
      this.props.refresh()
      alert('Indian deleted successfully!')
    }).catch(e => {
      alert('Failed to delete indian.')
    })
  }

  renderRow(indian) {
    const {
      jersey,
      first_name,
      last_name,
      position,
      height,
      weight,
      batting_hand,
      throwing_hand,
      dob
    } = indian
    return (
      <tr key={jersey}>
        <th scope="row">{`#${jersey}`}</th>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{positionToString(position)}</td>
        <td>{`${height} inches`}</td>
        <td>{`${weight} lbs`}</td>
        <td>{handToString(batting_hand)}</td>
        <td>{handToString(throwing_hand)}</td>
        <td>{formatDate(dob)}</td>
        <td>
          <button
            onClick={e => this.onEdit(e, indian)}
            className="btn btn-xs btn-primary">Edit</button>
          &nbsp;
          <button
            onClick={e => this.onDelete(e, jersey)}
            className="btn btn-xs btn-danger">Delete</button>
        </td>
      </tr>
    )
  }

  renderArrows(attr) {
    return (
      <span>
        <span onClick={e => this.props.sortAsc(e, attr)} className="glyphicon glyphicon-chevron-up" />
        <span onClick={e => this.props.sortDesc(e, attr)} className="glyphicon glyphicon-chevron-down" />
      </span>
    )
  }

  onSubmit(e) {
    e.target.blur()
    const obj = { }
    for (const f of PlayerFields) obj[f.field] = document.getElementById(f.field).value
    postJSON(`${origin}/api/indians/update`, obj).then(res => {
      this.setState({ editing: null })
      alert('Successfully updated!')
      this.props.refresh()
    }).catch(e => {
      alert(`Failed to update ... please check your form for validity.`)
    })
  }

  onCancel(e) {
    e.target.blur()
    this.setState({ editing: null })
  }

  render() {
    const { editing } = this.state
    if (editing) {
      editing.dob = moment(editing.dob).format('YYYY-MM-DD')
      const { jersey } = editing
      return (
        <div className="text-center">
          <h3>Editing #{jersey}</h3>
          <PlayerForm
            submitText={'Update'}
            defaults={editing}
            locked={true}
            onSubmit={this.onSubmit.bind(this)}
            onCancel={this.onCancel.bind(this)} />
        </div>
      )
    }
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Jersey {this.renderArrows('jersey')}</th>
            <th>First Name {this.renderArrows('first_name')}</th>
            <th>Last Name {this.renderArrows('last_name')}</th>
            <th>Position {this.renderArrows('position')}</th>
            <th>Height {this.renderArrows('height')}</th>
            <th>Weight {this.renderArrows('weight')}</th>
            <th>Batting Hand {this.renderArrows('batting_hand')}</th>
            <th>Throwing Hand {this.renderArrows('throwing_hand')}</th>
            <th>Birthday {this.renderArrows('dob')}</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{this.props.indians.map(indian => this.renderRow(indian))}</tbody>
      </table>
    )
  }
}
