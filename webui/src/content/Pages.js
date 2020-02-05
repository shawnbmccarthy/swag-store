import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { ProductDeck } from '../components/Products'
import { GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk'

export const Home = ({ personalized_recs }) => (
  <div className="container page">
    <div className="row">
      <div className="img">
        <img className="img-fluid" src="/images/swag.jpg" alt="" />
      </div>
    </div>
    {personalized_recs.length > 0 && (
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col col-md-12">
          <h3>Recommended for you</h3>
          <ProductDeck products={personalized_recs} />
        </div>
      </div>
    )}
  </div>
)

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { redirectToReferrer: false }
  }

  async componentDidMount() {
    if(this.props.stitchClient.auth.hasRedirectResult()){
      await this.props.stitchClient.auth.handleRedirectResult().catch(console.error)
      console.log('processed redirect result')
    }
    if (this.props.stitchClient.auth.isLoggedIn) {
      this.setState({ redirectToReferrer: true })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    let authOpts = {}

    if (from.pathname === '/cart') {
      authOpts.redirectUrl = `${window.location.protocol}//${
        window.location.host
      }${from.pathname}`
    }

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className="container Login">
        <div className="row">
          <div className="card mx-auto">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <p className="card-text">Please login to continue.</p>
              <div
                onClick={() => {
                  const credential = new GoogleRedirectCredential()
                  this.props.stitchClient.auth.loginWithRedirect(credential)
                }}
                className="signin-button"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 48 48"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </g>
                </svg>
                <span className="signin-button-text">Sign in with Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
