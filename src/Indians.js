import React, { Component } from 'react'
import moment from 'moment'

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
  constructor(props) {
    super(props)
    this.state = {
      indians: []
    }
  }

  componentDidMount() {
    fetch('/api/indians').then(res => res.json()).then(indians => {
      this.setState({ indians })
    }).catch(err => {
      console.log('Error fetching indians:', err)
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
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Jersey</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Batting Hand</th>
            <th>Throwing Hand</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>{this.state.indians.map(indian => this.renderRow(indian))}</tbody>
      </table>
    )
  }
}
