#!/usr/bin/env node

"use strict"

const PORT = 9527


// Webpack build server
const webpack = require('webpack')
// const config = require('../webpack.config.js')

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const configFactory = require('../config/webpack.config');
const config = configFactory('development');
// console.log('config',JSON.stringify(config))
const compiler = webpack(config)
const colors = require('colors')

let logSemaphore = 0
compiler.watch({}, function (err, stats) {
	console.log(stats.toString({ colors: true, chunks: false, children: false }))
	logSemaphore++
	setTimeout(function () {
		logSemaphore--
		if (logSemaphore == 0) {
			console.log()
			serverStatus()
			console.log()
		}
	}, 100)
})

// Express web server
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

// 执行目录
const binPath = path.resolve(__dirname,'../../../..')
console.log('命令行目录:'+binPath)

io.on('connection', function (socket) {
	console.log('客户端 连接成功')

	socket.on('console', command => {
		console.log('receive console: ', command)
		if (command === '') return
		const { spawn } = require('child_process')
		const [cwd, ...args] = command.split(' ')
		const proc = spawn(cwd, args,{ cwd: binPath})
		proc.stdout.pipe(process.stdout)
		proc.stderr.pipe(process.stderr)
		proc.stdout.on('data', data => {
			io.emit('console', data.toString())
		})
		proc.stderr.on('data', data => {
			io.emit('console', data.toString())
		})
		proc.on('error', error => {
			io.emit('console', error.toString())
		})

	})
	
	socket.on('disconnect', function () {
		console.log('user disconnected')
	})
})




const os = require('os')
const ifaces = os.networkInterfaces()

app.use('/', express.static(path.resolve(__dirname , '../dist')))
// app.get('/', function (req, res) {
// 	res.sendFile(path.resolve(__dirname , '../build/index.html'))
// })

//定义动态按钮列表
app.get('/json', function (req, res) {
	var buttonArray = []
   
	const json = require('../../../../package.json').scripts
   
	var obj = {}
   
	for (let key in json) {
	 if (key == 'start') {
	  obj.EN = 'start';
	  obj['ZH'] = '启动'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'build') {
	  obj.EN = 'build';
	  obj['ZH'] = '打包'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'tslint') {
	  obj.EN = 'tslint';
	  obj['ZH'] = '代码检测'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'format') {
	  obj.EN = 'format';
	  obj['ZH'] = '美化'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'db') {
	  obj.EN = 'db';
	  obj['ZH'] = '启动数据库'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'docker') {
	  obj.EN = 'docker';
	  obj['ZH'] = 'docker部署'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'dockerd') {
	  obj.EN = 'docked';
	  obj['ZH'] = 'docked部署'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'coverage') {
	  obj.EN = 'coverage';
	  obj['ZH'] = '覆盖率'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'ui') {
	  obj.EN = 'ui';
	  obj['ZH'] = '界面'
	  buttonArray.push(obj)
	  obj = {}
	 } else if (key == 'test') {
	  obj.EN = 'test';
	  obj['ZH'] = '测试'
	  buttonArray.push(obj)
	  obj = {}
	 }
   
	}
	res.json(buttonArray)
   })
   
console.log('module.parent',module.parent)
if(!module.parent) {
	http.listen(PORT, function () {
		serverStatus()
	})
}else{
	module.exports = http
}


function serverStatus() {
	console.log(colors.cyan("http://localhost:%s"), PORT)

	Object.keys(ifaces).forEach(function (ifname) {
		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' === iface.family && iface.internal === false) {
				console.log(colors.cyan("http://%s:%s"), iface.address, PORT)
			}
		})
	})
}
