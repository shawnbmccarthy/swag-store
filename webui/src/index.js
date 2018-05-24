import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom';
import {StitchClientFactory} from "mongodb-stitch";

const appId = 'swag-kopai';
const mdbService = 'mongodb-atlas';

let stitchClientPromise = StitchClientFactory.create(appId);

stitchClientPromise.then(stitchClient => {
    let db = stitchClient.service('mongodb', mdbService).db('swag');
    let products = db.collection('products');
    let users = db.collection('users');
    let orders = db.collection('orders');
    stitchClient.authenticate('anon').then(anonId => {
        let props = {stitchClient, anonId, db, products, users, orders};
        ReactDOM.render(
            <HashRouter>
                <App {...props}/>
            </HashRouter>,
            document.getElementById('root')
        );
        registerServiceWorker();
    });
});