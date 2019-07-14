
// This simple web server written in Node responds with "Hello World" for every request.

var http = require('http');
var express = require('express');
var util = require('util');
var app_port = process.env.app_port || 8080;
var app_host = process.env.app_host || '127.0.0.1';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World from Cloudnode\n\n');
    res.write('Node version:' + process.versions);
    res.end();
}).listen(app_port);
console.log('Web server  running at http://' + app_host + ':' + app_port);


// const express = require('express');
// const path = require('path');
// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;
// const Datauri = require('datauri');
 
// const datauri = new Datauri();
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// var app_port = process.env.PORT || 5000;
// var app_host = process.env.app_host || '127.0.0.1';
 
// app.use(express.static(__dirname + '/public'));
// // app.use('/resources', express.static(__dirname +'/resources'));

 
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/authoritative_server/index.html');
// });
 
// // server.listen(app_port, function () {
//   // console.log(`Listening on ${server.address().port}`);
// // });

// function setupAuthoritativePhaser() {
// 	JSDOM.fromFile(path.join(__dirname, 'authoritative_server/index.html'), {
//     // To run the scripts in the html file
//     runScripts: "dangerously",
//     // Also load supported external resources
//     resources: "usable",
//     // So requestAnimatinFrame events fire
//     pretendToBeVisual: true
//   }).then((dom) => {
//     dom.window.gameLoaded = () => {
// 	  dom.window.io = io;
//       server.listen(app_port, function () {
//         console.log(`Listening on ${server.address().port}`);
//       });
//     };
	
	
// 		dom.window.URL.createObjectURL = (blob) => {
// 	  if (blob){
// 		return datauri.format(blob.type, blob[Object.getOwnPropertySymbols(blob)[0]]._buffer).content;
// 	  }
// 	};
// 	dom.window.URL.revokeObjectURL = (objectURL) => {};
	
	
//   }).catch((error) => {
//     console.log(error.message);
//   });
// }
 
// setupAuthoritativePhaser();