const express = require('express');
const path = require('path');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const Datauri = require('datauri');
 
const datauri = new Datauri();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

 
app.use(express.static(__dirname + '/public'));
// app.use('/resources', express.static(__dirname +'/resources'));

 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/authoritative_server/index.html');
});
 
server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});

function setupAuthoritativePhaser() {
	JSDOM.fromFile(path.join(__dirname, 'authoritative_server/index.html'), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true
  }).then((dom) => {
    dom.window.gameLoaded = () => {
	  dom.window.io = io;
      server.listen(8081, function () {
        console.log(`Listening on ${server.address().port}`);
      });
    };
	
	
		dom.window.URL.createObjectURL = (blob) => {
	  if (blob){
		return datauri.format(blob.type, blob[Object.getOwnPropertySymbols(blob)[0]]._buffer).content;
	  }
	};
	dom.window.URL.revokeObjectURL = (objectURL) => {};
	
	
  }).catch((error) => {
    console.log(error.message);
  });
}
 
// setupAuthoritativePhaser();