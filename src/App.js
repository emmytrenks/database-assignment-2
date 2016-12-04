import React, { Component } from 'react'
import Navigation from 'react-navbar-bootstrap'

const layout = [
  { link: '/', text: 'Home' },
  { link: '/salarychange', text: 'Salary Changes' },
  { link: '/teammoney', text: 'Highest Paid Teams' }
]

class App extends Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired
  }

  render() {
    const { location: { pathname } } = this.props
    return (
      <Navigation pathname={pathname} layout={layout}>
        {this.props.children}
      </Navigation>
    )
  }
}

export default App
