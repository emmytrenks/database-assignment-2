import React, { Component } from 'react'
import moment from 'moment'
import origin from 'origin-url'
import { getJSON } from './fetch'

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

  onDelete(e, jersey) {
    e.preventDefault()
    e.target.blur()

    getJSON(`${origin}/api/indians/delete/${jersey}`).then(res => {
      console.log(res)
      alert('Indian deleted successfully!')
    }).catch(e => {
      alert('Failed to delete indian.')
    })

    this.props.refresh()
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

  render() {
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
            <th>Date of Birth {this.renderArrows('dob')}</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{this.props.indians.map(indian => this.renderRow(indian))}</tbody>
      </table>
    )
  }
}
