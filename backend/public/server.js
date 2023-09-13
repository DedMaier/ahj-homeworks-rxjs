"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const Router = require('koa-router');
const app = new Koa();
const messagesData = require('./data.js');
const { v4 } = require('uuid');
app.use(cors());
app.use(koaBody({
    urlencoded: true,
    multipart: true
}));
const router = new Router();
router.get('/api/messages', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.response.status = 200;
    ctx.response.body = { status: JSON.stringify(messagesData) };
}));
app.use(router.routes());
const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
