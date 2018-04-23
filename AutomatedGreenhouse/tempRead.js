

function readingTemp()
{
	var sensor = require('node-dht-sensor');
	var temp = 0;
	sensor.read(11, 14, function(err, temperature, humidity) {
    		if (!err) {
        		//console.log('temp: ' + (temperature.toFixed(1)*9/5+32) + '°F, ' + 'humidity: ' + humidity.toFixed(1) + '%');
			temp = (console.log(temperature.toFixed(1)*9/5+32)); 
    		}});
	return(temp);
}
var temp2 = 0;
temp2=readingTemp();
console.log(temp2);
//readingTemp();


/*function readingTemp(sensor)
{
    //reads from type 11 sensor(DHT11) and from GPIO 14
    return new Promise((resolve, reject) => 
        sensor.read(11, 14, function(err, temperature, humidity) {
           if (err) {
               console.log("Error Temp!");
               reject("Error");
           } else {
               console.log('temp: ' + (temperature.toFixed(1) * 9/5 + 32) + '°F, ' + 'humidity: ' + humidity.toFixed(1) + '%');
               const temperatureFinal = temperature.toFixed(1) * 9/5 + 32;
               const humidityFinal = (humidity.toFixed(1));
               console.log(temperatureFinal);
               resolve([temperatureFinal, humidityFinal]);
        }
    );
}
let data = {};
readingTemp(sensor)
    .then(
      (t, h) => {
          data.temperatureFinal = t;
          data.humidityFinal = h;
      }
    )
    .then(() => {
        io.sockets.emit('chat', data)
    })
*/




















/*
sensor.read(11, 14, function(err, temperature, humidity) {
    if (!err) {
		tempValue = ((temperature.toFixed(1)*9/5+32) + '°F';
		humidityValue = (humidity.toFixed(1) + '%';
		document.getElementById("mytemp").value = tempValue;
		document.getElementById("myhumidß").value = humudityValue;
}

}

var temp, humid = 0;
function read (){
var temp, humid = 0;
temp, humid = sensor.read(11, 14, function(err, temperature, humidity) {
    if (!err) {
	var temp = (temperature.toFixed(1)*9/5+32);
	var humid = (humidity.toFixed(1)); 
        console.log('temp: ' + temp + '°F, ' +
            'humidity: ' + humid + '%');
	return temp, humid;
   }else{ return 0,0;}
return temp, humid;
});
}
temp, humid = read();
console.log('2temp: ' + temp + '°F, ' +
            '2humidity: ' + humid + '%');
*/
