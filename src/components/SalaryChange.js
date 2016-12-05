import React, { Component } from 'react'
import numeral from 'numeral'
import origin from 'origin-url'
import { getJSON } from '../fetch'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      salaries: []
    }
  }

  async componentDidMount() {
    const salaries = await getJSON(`${origin}/api/salaries`)
    this.setState({ salaries })
  }

  render() {
    const { salaries } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2>Salary Change from 2014 to 2015</h2>
          </div>
          <div className="col-md-6 col-md-offset-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Salary Change</th>
                </tr>
              </thead>
              <tbody>{salaries.filter(r => r.change !== 0).map(t => <tr key={t.id}>
                <td>{t.first_name}</td>
                <td>{t.last_name}</td>
                <td style={{
                  color: t.change > 0 ? 'green' : 'red'
                }}>{numeral(t.change).format('$0.00a')}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
