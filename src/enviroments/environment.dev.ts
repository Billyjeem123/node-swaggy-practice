import { Environment } from "./environment";

// This is your development config — it's used when you're working locally (not in production).



export const DevEnvironment: Environment = {
    db_uri: 'mongodb://127.0.0.1:27017/nodeapi'
};