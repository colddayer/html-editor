const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./router')
const path = require('path')
const serve = require("koa-static")


const app = new Koa()
app.use(serve("./static"))

app.use(koaBody({
  multipart: true
}))

app.use(router.routes())

// 启动服务监听本地3000端口
app.listen(8080, () => {
  console.log('应用已经启动，http://localhost:8080');
})