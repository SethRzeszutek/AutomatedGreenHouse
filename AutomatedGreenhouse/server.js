var express = require('express');
var socket = require('socket.io');


var sensor = require('node-dht-sensor');
var RPIFanController = require('rpi-fan-controller');
var NodeWebcam = require( "node-webcam" );
var x=1;


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.231.27.196',
  user     : 'root',
  password : '',
  database : 'plantlist',
  //socketPath: '/cloudsql/sql-database-nodejs:us-east1:sql-instance'
});


// Log any errors connected to the db
connection.connect(function(err){
    if (err) console.log(err)
})



//Default options 
var opts = {
    //Picture related 
    width: 1280,
    height: 720,
    quality: 100,
    //Delay to take shot 
    delay: 0,
    //Save shots in memory 
    saveShots: true,
    // [jpeg, png] support varies 
    // Webcam.OutputTypes 
    output: "jpeg",
    //Which camera to use 
    //Use Webcam.list() for results 
    //false for default device 
    device: false,
    // [location, buffer, base64] 
    // Webcam.CallbackReturnTypes 
    callbackReturn: "base64",
    //Logging 
    verbose: false
};


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
		//console.log("Reading Temperature.");
		sensorReading = readingTemp(sensor);
		//console.log(sensorReading);
		temperatureFinal = (sensorReading.temperature*9/5+32);
		humidityFinal=(sensorReading.humidity);
		//console.log(humidityFinal);
		io.local.emit('temp', temperatureFinal);
		io.local.emit('humid', humidityFinal);
   	});

socket.on('fan', function(data)
	{
        	
		//console.log("Fan IN");
		rpiFan.init();
		
		if(data){
			// Turn the fan on 
			rpiFan.toggleFan(true);
			//console.log("Fan ON");
		}
		else{
			// Turn the fan off 
			rpiFan.toggleFan(false);
			rpiFan.dispose();
			//console.log("Fan OFF");
		}
		
       		io.sockets.emit('fan', data);
		// Close the GPIO connection 
		//
    	});
const Webcam = NodeWebcam.create( opts );
 socket.on('updateImage',function(data)
	{
	Webcam.capture("public/test_picture", function( err, image ) {
        	if (err) console.error(err);
       		io.sockets.emit("updateImage", image);
       		//console.log("Image taken.", image);
    	});
/*
	NodeWebcam.capture( "public/test_picture", opts, function( err, image ) 
		{
		io.sockets.emit("updateImage", image);
		console.log("Image taken.", image);
		});
*/
	//io.sockets.emit("updateImage", image);
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


