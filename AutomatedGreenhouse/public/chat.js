
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

function changeImage(check, imageID ,picture1, picture2)
{
  if (check.checked){
    document.getElementById(imageID).src=picture1;
  }else{
    document.getElementById(imageID).src=picture2;
  }
}




// Emit events
btn.addEventListener('click', function(){
	//takes two parameters, title, data to be sent
 	clientSocket.emit('chat', {message: message.value, handle: handle.value});
  message.value = "";
});

message.addEventListener('keypress', function(){
	clientSocket.emit('typing',handle.value);
});

btnTemp.addEventListener('click', function(){
	clientSocket.emit('temp',btnTemp.value);
});

btnFan.addEventListener('click', function(){
	clientSocket.emit('fan',btnTemp.value);
});

lightbox.addEventListener("change", function() { //add event listener for when checkbox changes
    socket.emit("light", Number(this.checked)); //send button status to server (as 1 or 0)
  });


// Listen for events
clientSocket.on('chat', function(data){
	feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

clientSocket.on('typing', function(data){
	feedback.innerHTML = '<p><em>'+data+' is typing a message...</em><p>';
});

clientSocket.on('temp', function(data){
	tempOutput.innerHTML = '<p><strong>'+data+' F</strong><p>';
});









