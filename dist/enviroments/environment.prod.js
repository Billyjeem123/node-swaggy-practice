"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdEnvironment = void 0;
// This is your production config — it's used when your app is running on a live server (production).
exports.ProdEnvironment = {
    db_uri: 'mongodb://127.0.0.1:27017/nodeapi',
    jwt_secret_key: 'ts-node-live'
};
