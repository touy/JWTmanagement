import * as Nano from "nano";
import crypto from 'crypto';
import waitOn from 'wait-on';
import * as fs from 'fs';
import express from 'express';
import moment from 'moment-timezone';
import * as bodyParser from "body-parser";
import * as path from 'path';
//import * as ffmpeg from 'fluent-ffmpeg';
import * as utilities from './utilities'
//import ZipStream from 'zip-stream';
import archiver from 'archiver';
//import * as mm from 'music-metadata';
import * as util from 'util';
import requestrestapi from "./requestrestapi";
import request = require("request");
import redis, { RedisClient } from "redis";
import jwt from 'jsonwebtoken';
// import nodemailer from "nodemailer";

// import * as path from 'path';

// import * as bodyParser from "body-parser";
// //import { Routes } from "./routes/Routes";
// import * as async from 'async';
// import uuidV4 from 'uuid';

// import { NextHandleFunction } from "connect";
// import * as util from 'util';
// import * as Q from 'q';
// import { Iclient, Globalcommands, Oclient, OmySystem, Systemlist, LogTypes, Iuser, MyDataBaseNames, Oactivatekeys, Otempprefix, Itempprefix, Ogijuser, Systemdefaultadmin, ImySystem, Iroles, Oroles, Ouserprofile, Iuserprofile, Ouserprefix, Iuserprefix, Ouser, Opermissions, Permissionstaus, Commonenames, Xuser, Odbconfig, Xdbconfig, Osecurity, Osecurityuser, Xsecurityuser, Oauthorizedkyes, Oencryptionkeys, Utils, OpermissionAssigned, Oapprovement, Odocument } from "./interfaces";
// import PouchAuth from 'pouchdb-authentication';
// import validator from 'validator';
// //import  * as Auth from 'pouchdb-auth';
// import pouchSecurity from 'pouchdb-security-helper';
// import pouchdb from 'pouchdb';
class App {
    app: express.Application | undefined;
    nano: Nano.ServerScope | undefined;
    nanoconf: Nano.Configuration | undefined;
    serverurl: string | undefined;
    rclient: RedisClient;
    fs1 = fs.readFileSync('../private.key');
    fs2 = fs.readFileSync('../public.key');
    readonly secret = '';
    privateKey: string;
    publicKey: string;
    constructor() {
        this.privateKey = this.fs1.toString();
        this.publicKey = this.fs2.toString();
        this.rclient = redis.createClient();
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.enable('trust proxy');
        console.log(path.resolve(__dirname.replace('src', '').replace('dist', '') + 'public'));
        console.log(path.resolve(__dirname.replace('src', '').replace('dist', '') + 'public'));
        console.log(`start ${new Date().toString()}`);
        
        this.app.use('/public', express.static(path.resolve(__dirname.replace('src', '').replace('dist', '') + 'public')));
        
        this.registerToken=this.registerToken.bind(this);
        this.app.post('/', this.registerToken);
        this.app.post('/registerToken', this.registerToken);

        this.verifyToken=this.verifyToken.bind(this);
        this.app.post('/verifyToken',this.verifyToken);
        
        this.getInfoByToken=this.getInfoByToken.bind(this);
        this.app.post('/getInfoByToken',this.getInfoByToken);

        this.renewToken=this.renewToken.bind(this);
        this.app.post('/renewToken',this.renewToken);

        this.app.use(function (err, req, res, next) {
            let debug = true;
            if (debug)
                res.status(err.status || 500).json({ status: err.status, message: err.message, error: err });
            else
                res.status(err.status || 500).json({ status: err.status, message: err.message })
        });

    }
    authentication(req: express.Request, res: express.Response) {

    }
    authorization(req: express.Request, res: express.Response) {

    }
    registerToken(req: express.Request, res: express.Response) {
        let user = req.body;
        let token = jwt.sign(user, this.privateKey.trim(), { algorithm: 'RS256' });
        this.rclient.set(token, this.publicKey.trim(), 'EX', 1 * 60 * 60 * 24 * 365);
        res.status(200).json({ stats: 'OK', token: token });
    }
    renewToken(req: express.Request, res: express.Response) {
        let token = req.body.token;
        this.rclient.get(token, (err, reply) => {
            if (err) {
                res.json({ error: err });
            }
            else if (reply) {
                let user = jwt.verify(token, reply);
                this.rclient.del(token);
                token = jwt.sign(user, this.privateKey.trim(), { algorithm: 'RS256' });
                this.rclient.set(token, reply.toString(), 'EX', 1 * 60 * 60 * 24 * 365);
                res.status(200).json({ stats: 'OK', token: token });
            }
        });
    }
    verifyToken(req: express.Request, res: express.Response) {
        let token = req.body.token;
        this.rclient.get(token, (err, reply) => {
            if (reply) {
                let user = jwt.verify(token, reply);
                console.log(user);
                res.json({ status: 'ok',token:token });
            } else if (err) {
                console.log(err);
                res.json({ error: err });
            }
        });
    }
    getInfoByToken(req: express.Request, res: express.Response) {
        let token = req.body.token;
        this.rclient.get(token, (err, reply) => {
            if (reply) {
                let user = jwt.verify(token, reply);
                console.log(user);
                res.json({status:'ok',user:user,token:token});
            } else if (err) {
                console.log(err);
                res.json({ error: err });
            }
        });
    }
    destroyToken(req: express.Request, res: express.Response) {
        let token = req.body.token;
        this.rclient.get(token, (err, reply) => {
            if (reply) {
                this.rclient.del(token);
                res.json({ status: 'ok' });
            } else if (err) {
                console.log(err);
                res.json({ error: err });
            }
        });
    }
    getAuthorizeByToken(req: express.Request, res: express.Response) {

    }
}
export default new App().app;