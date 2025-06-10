"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const db_1 = require("./config/db");
const UserRoute_1 = require("./routers/UserRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
class Server {
    constructor() {
        this.app = express();
        this.setConfigs();
        this.setRoutes(); //if an error is called in  our routes here if it is not a 404, handle erros will see to it
        this.error404Handler();
        this.handleErrors();
    }
    setConfigs() {
        (0, db_1.default)();
        this.allowCors();
        this.configureBodyParser();
    }
    setRoutes() {
        this.app.use('/api/user', UserRoute_1.default); //middleware to build router for routes
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    allowCors() {
        this.app.use(cors());
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not found',
                status_code: 404
            });
        });
    }
    handleErrors() {
        //Hey Express, whenever something goes wrong in the app and an error is passed, use this function to catch it and send a clean response.”
        this.app.use((error, req, res, next) => {
            const errorStatus = error.status || 500; // 👈 use error.status instead of req.errorStatus
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again!',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
