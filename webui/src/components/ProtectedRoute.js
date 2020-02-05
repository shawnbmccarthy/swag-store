import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, stitchClient, ...rest }) => (
  <Route
    {...rest}
    render={routeProps =>
      stitchClient.auth.isLoggedIn ? (
        <Component stitchClient={stitchClient} {...routeProps} {...rest} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: routeProps.location } }}
        />
      )
    }
  />
)

export default ProtectedRoute
