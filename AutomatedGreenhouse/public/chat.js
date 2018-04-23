
// Make connection
var clientSocket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      btnTemp = document.getElementById('getTemp'),
      btnFan = document.getElementById('fan'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback'),
      tempOutput = document.getElementById('tempOutput'),
      humidOutput = document.getElementById('humidOutput'),

      lightbox = document.getElementById("light"),
      waterbox = document.getElementById("water"),
      fanbox = document.getElementById("fan"),
      autobox = document.getElementById("auto");

/*
document.getElementById("lightSwitch").onclick=function() {
    if(this.checked) {
        document.getElementById("lightoffImg").src = "img/lighton.png";
    } else {
        document.getElementById("lightoffImg").src = "img/lightoff.png";   
    }
  }
*/

setInterval(function () {document.getElementById("getTemp").click();}, 10000);


function changeImage(check, imageID ,picture1, picture2)
{
  if (check.checked){
    document.getElementById(imageID).src=picture1;
  }else{
    document.getElementById(imageID).src=picture2;
  }
}




// Emit events

btnTemp.addEventListener('click', function(){
	
	clientSocket.emit('temp',btnTemp.value);
	
});

btnFan.addEventListener('click', function(){
	clientSocket.emit('fan',btnTemp.value);
});

fanbox.addEventListener("fan", function() { //add event listener for when checkbox changes
    socket.emit("fan", Number(this.checked)); //send button status to server (as 1 or 0)
  });


// Listen for events
clientSocket.on('temp', function(data, data2){
	tempOutput.innerHTML = "";
	tempOutput.innerHTML = '<p><strong>'+data+'°</strong><p>';
	humidOutput.innerHTML='<p><strong>'+data2+'°</strong><p>';
});









