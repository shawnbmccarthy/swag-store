# Swag Store

An eCommerce application created using MongoDB Stitch and React.js

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

- Make scripts executable

```
> chmod +x deploy
> chmod +x export
```

#### deploy

Deploy current code using `./deploy` in the root of the project

#### export

Export the project code using `./export` in the root of the project.
