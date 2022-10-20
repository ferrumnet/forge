"use strict";
import express from 'express';
var cors = require("cors");
var kraken = require("kraken-js");
import path from 'path';
var options, app : any;
require('dotenv').config()
/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
  onconfig: function (config: any, next: any) {
    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */

    next(null, config);
  },
};

app = module.exports = express();

app.use(express.static(__dirname + "/public")); // set the static files location /public/img will be /img for users
app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
(global as any).utils = require("./app/lib/middlewares/utils")();
(global as any).db = require("./app/models/index");
(global as any).stringHelper = require("./app/lib/middlewares/helpers/stringHelper");
(global as any).startHelper = require("./app/lib/middlewares/helpers/startHelper");
(global as any).starterEnvironment = (global as any).startHelper.startHelperInit(process);
(global as any).environment = require("./config/environment.json");
(global as any).starterEnvironment = (global as any).startHelper.startHelperInit(process);
console.log((global as any).starterEnvironment);
(global as any).log = require("./app/lib/logger");
(global as any).appRoot = path.resolve(__dirname);
(global as any)._ = require("lodash");
(global as any).asyncMiddleware = require("./app/lib/response/asyncMiddleware");
(global as any).commonFunctions = require("./app/lib/middlewares/common");
(global as any).networksHelper = require("./app/lib/httpCalls/networksHelper");
(global as any).web3ConfigurationHelper = require("./app/lib/middlewares/helpers/web3ConfigurationHelper");
(global as any).web3Helper = require("./app/lib/middlewares/helpers/web3Helper");
(global as any).contractHelper = require("./app/lib/middlewares/helpers/contractHelper");

(global as any).standardStatuses = require("./app/lib/response/standardStatuses");

(global as any).kraken = app.kraken;

app.use(kraken(options));
app.on("start", function () {
  (global as any).kraken = app.kraken;
  (global as any).log.info("Application ready to serve requests.");
  (global as any).log.info("Environment: %s", app.kraken.get("env:env"));
});
