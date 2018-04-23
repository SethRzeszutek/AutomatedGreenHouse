var express = require('express');
var socket = require('socket.io');

var sensor = require('node-dht-sensor');
var RPIFanController = require('rpi-fan-controller');

let rpiFan = new RPIFanController({
	pinMode: "RPI",
	pin: 15,
   	maxFanRunTime: 1
});

//Changing variables
//var temperatureFinal = 0;
//var humidityFinal = 0;


// App setup
var app = express();
var server = app.listen(4000, function()
{
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => 
{

    //console.log('made socket connection', socket.id);

    //DELETE THE FOLLOWING LINE WHEN NOT USED FOR TESTING
    //sensorReading = readingTemp(sensor);
    //temperatureFinal = (sensorReading.temperature*9/5+32);
    //console.log(temperatureFinal);

    // Handle chat event
    socket.on('chat', function(data)
	{
        	// console.log(data);
       		io.sockets.emit('chat', data);
    	});


    // Handle typing event
    socket.on('typing', function(data)
	{
        	socket.broadcast.emit('typing', data);
    	});

   //Handle temp event
   socket.on('temp',function(data)
	{
		//temperatureFinal, humidityFinal = readingTemp(sensor);
		//temperatureFinal, humidityFinal = readingTemp(sensor);
		//socket.broadcast.emit('temp',temperatureFinal);
		sensorReading = readingTemp(sensor);
		temperatureFinal = (sensorReading.temperature*9/5+32);
		io.local.emit('temp', temperatureFinal);
   	});

socket.on('fan', function(data)
	{
        	console.log("Fan ON");
		
		rpiFan.init();
		// Turn the fan on 
		rpiFan.toggleFan(true);
		// Turn the fan off 
		rpiFan.toggleFan(false);
       		io.sockets.emit('fan', data);
		// Close the GPIO connection 
		//rpiFan.dispose();
    	});

});


function readingTemp(sensor)
{
    //reads from type 11 sensor(DHT11) and from GPIO 14
    try {
        return sensor.read(11, 14);
    }
    catch (e) {
        // Oh boy, we run into an error. DO SOMETHING
    }
}


rpiFan.on('ready', function() {
    // pin ready! This event will not be called if there was an error 
	console.log("In Function");
	rpiFan.toggleFan(true);
});


