import React, { Component } from 'react'

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const userInfo = this.props.userInfo
    return (
      <div className="container page">
        <div className="row">
          <h2>Profile Page</h2>
          <h3>{userInfo.authData.first_name}</h3>
        </div>
      </div>
    )
  }
}
