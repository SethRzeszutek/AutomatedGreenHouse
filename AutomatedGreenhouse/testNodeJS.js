// spawn_python.js
var util = require("util");

var spawn = require("child_process").spawn;
var process = spawn('python',["testPython.py"]);

util.log('readingin')

process.stdout.on('data',function(chunk){

   // var textChunk = chunk.toString('utf8');// buffer to string
	var textChunk = chunk.toString();// buffer to string
	var numChunk = Buffer.from(textChunk, 'hex').toString('utf8');
	
	util.log(chunk);
    	console.log(textChunk);
	util.log(numChunk);
});
