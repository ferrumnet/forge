"use strict";

var mongoose = require("mongoose");
import crypto from 'crypto';
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var collectionName = 'users';

var schema = mongoose.Schema(
  {
    name: { type: String, default: '' },
    nameInLower: { type: String, default: '' },
    isActive: { type: Boolean, default: true },

    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
  },
  { collection: collectionName }
);

schema.statics.getHashedPassword = function (password: any) {
  return crypto.createHash("sha256").update(password).digest("base64");
};

schema.methods.createAPIToken = function () {
  var payload = this.toClientObject();
  return jwt.sign(
    { _id: payload._id, email: payload.email },
    (global as any).environment.jwtSecret
  );
};
schema.methods.createProfileUpdateToken = function (token: any, signature: any) {
  return jwt.sign({ token, signature }, (global as any).environment.jwtSecret);
};
schema.methods.toClientObject = function () {
  var rawObject = this.toObject();
  delete rawObject.password;

  delete rawObject.__v;
  return rawObject;
};

var usersModel = mongoose.model(collectionName, schema);
module.exports = usersModel;
