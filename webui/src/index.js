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
  let db = stitchClient.service('mongodb', 'mongodb-atlas').db('swagstore')
  let props = { stitchClient, db }
  ReactDOM.render(
    <BrowserRouter>
      <App {...props} />
    </BrowserRouter>,
    document.getElementById('root')
  )
  registerServiceWorker()
})
