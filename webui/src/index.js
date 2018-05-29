import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { google, facebook, stitch } from './config'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { StitchClientFactory } from 'mongodb-stitch'

// const appId = 'swag-kopai';
const appId = stitch.appId

console.log('Configuration: ')
console.log('Stitch: ' + stitch.appId)
console.log('Google: ' + google.clientID)
console.log('Facebook: ' + facebook.clientID)

const mdbService = 'mongodb-atlas'

let stitchClientPromise = StitchClientFactory.create(appId)

stitchClientPromise.then(stitchClient => {
  let db = stitchClient.service('mongodb', mdbService).db('swag')
  let products = db.collection('products')
  let users = db.collection('users')
  let orders = db.collection('orders')
  stitchClient.authenticate('anon').then(anonId => {
    let props = { stitchClient, anonId, db, products, users, orders }
    ReactDOM.render(
      <BrowserRouter>
        <App {...props} />
      </BrowserRouter>,
      document.getElementById('root')
    )
    registerServiceWorker()
  })
})
