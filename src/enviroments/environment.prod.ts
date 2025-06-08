import { Environment } from './environment';

// This is your production config — it's used when your app is running on a live server (production).

export const ProdEnvironment: Environment = {
    db_uri: 'mongodb://127.0.0.1:27017/nodeapi',
      jwt_secret_key: 'ts-node-live'
};