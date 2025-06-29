import {Environment} from "./environment";

// This is your development config — it's used when you're working locally (not in production).

export const DevEnvironment: Environment = {
    db_uri: 'mongodb://127.0.0.1:27017/ts-node',
    jwt_secret_key: 'ts-node-dev',
    paystack_secret_key: 'sk_test_755a02d78f2777eb99ac6ba0b69d8a729b4e1992',
    redis_host: '127.0.0.1',
    redis_port: 6379
};
