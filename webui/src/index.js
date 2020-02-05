import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk'

const appId = 'ecommercechatbot-glwkl'
const stitchClient = Stitch.initializeDefaultAppClient(appId)
const mongodb = stitchClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
const db = mongodb.db('swagstore')
const props = {stitchClient, db}

ReactDOM.render(
    <BrowserRouter>
      <App {...props} />
    </BrowserRouter>,
    document.getElementById('root')
)
registerServiceWorker()
