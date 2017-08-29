const express = require('express')
const path = require('path')
// const api = require('./src/server/routes/api')

const app = express()

app.use(express.static(__dirname))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'))
})

// 不知道怎么引入这个总路由
// app.use('/api', api);

app.listen(3000, function () {
  console.log('app listen 3000')
})