import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { StitchClientFactory } from 'mongodb-stitch'

const appId = 'ecommercechatbot-glwkl'
let stitchClientPromise = StitchClientFactory.create(appId)

stitchClientPromise.then(stitchClient => {
  stitchClient.authenticate('anon').then(anonId => {
    let props = { stitchClient, anonId }
    ReactDOM.render(
      <BrowserRouter>
        <App {...props} />
      </BrowserRouter>,
      document.getElementById('root')
    )
    registerServiceWorker()
  })
})
