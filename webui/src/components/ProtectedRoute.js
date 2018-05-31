import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, stitchClient, ...rest }) => (
  <Route
    {...rest}
    render={routeProps =>
      stitchClient.isAuthenticated() ? (
        <Component stitchClient={stitchClient} {...routeProps} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: routeProps.location } }}
        />
      )
    }
  />
)

export default ProtectedRoute
