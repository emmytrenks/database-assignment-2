import React, { Component } from 'react'
import numeral from 'numeral'
import origin from 'origin-url'
import { getJSON } from '../fetch'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: []
    }
  }

  async componentDidMount() {
    const teams = await getJSON(`${origin}/api/teams`)
    this.setState({ teams })
  }

  render() {
    const { teams } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{teams.map(t => <tr key={t.team}><td>{t.team}</td><td>{numeral(t.total).format('$0.00a')}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
