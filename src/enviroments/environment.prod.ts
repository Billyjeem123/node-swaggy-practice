import {Environment} from './environment';

// This is your production config — it's used when your app is running on a live server (production).

export const ProdEnvironment: Environment = {
    db_uri: 'mongodb://127.0.0.1:27017/nodeapi',
    jwt_secret_key: 'ts-node-live',
    paystack_secret_key: 'sk_test_755a02d78f2777eb99ac6ba0b69d8a729b4e1992',
    redis_host: '127.0.0.1',
    redis_port: 6379
};