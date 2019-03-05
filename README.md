# Swag Store

An eCommerce application created using MongoDB Stitch and React.js

[![Netlify Status](https://api.netlify.com/api/v1/badges/bc0207a6-709d-4e14-905f-b35fc73ff528/deploy-status)](https://app.netlify.com/sites/mdb-swag-store/deploys)

**Note**
_This application uses v3 of the Stitch JavaScript SDK._

## webui

React.js application created using [Create React App](https://github.com/facebook/create-react-app). Application is automatically built and deployed to [Netlify](https://www.netlify.com/) on merge to master. Application can be viewed at https://mdb-swag-store.netlify.com.

## stitch-app

Exported Stitch app.

### Scripts

Requirements:

- Install the [stitch-cli](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/)
- Create a `.env` file like the following

```
export STITCH_API_KEY=<API_KEY>
export STITCH_USERNAME=<CLOUD_USERNAME>
```

#### deploy.sh

Deploy current code using `./deploy.sh` in the root of the project

#### export.sh

Export the project code using `./export.sh` in the root of the project.
