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
    console.log('Connected: Listening for requests on port 4000.');
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


   //Handle temp event
   socket.on('temp',function(data)
	{
		//temperatureFinal, humidityFinal = readingTemp(sensor);
		//temperatureFinal, humidityFinal = readingTemp(sensor);
		//socket.broadcast.emit('temp',temperatureFinal);
		console.log("Reading Temperature.");
		sensorReading = readingTemp(sensor);
		temperatureFinal = (sensorReading.temperature*9/5+32);
		humidityFinal=(sensorReading.humidity);
		io.local.emit('temp', temperatureFinal,humidityFinal);
   	});

socket.on('fan', function(data)
	{
        	
		console.log("Fan IN");
		rpiFan.init();
		
		if(data){
			// Turn the fan on 
			rpiFan.toggleFan(true);
			console.log("Fan ON");
		}
		else{
			// Turn the fan off 
			rpiFan.toggleFan(false);
			rpiFan.dispose();
			console.log("Fan OFF");
		}
		
       		io.sockets.emit('fan', data);
		// Close the GPIO connection 
		//
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


