const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const Router = require('koa-router');
const app = new Koa()
const messagesData = require('./data.js')
const { v4 } = require('uuid')

app.use(cors())

app.use(koaBody({
    urlencoded: true,
    multipart: true
}))

const router = new Router();

router.get('/api/messages', async (ctx: any) => {
    ctx.response.status = 200
    ctx.response.body = { status: JSON.stringify(messagesData) }
})

app.use(router.routes())

const port: (string | number) = process.env.PORT || 7070
const server = http.createServer(app.callback())

server.listen(port)
