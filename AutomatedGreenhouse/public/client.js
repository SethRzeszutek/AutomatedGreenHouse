
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
	btnUpdate = document.getElementById("getUpdate"),

      lightbox = document.getElementById("light"),
      waterbox = document.getElementById("water"),
      fanbox = document.getElementById("fan"),
      autobox = document.getElementById("auto");

const imageUpdate = document.getElementById("imageUpdate");

 
 

setInterval(function () {document.getElementById("getTemp").click();}, 10000);


function changeImage(check, imageID ,picture1, picture2)
{
  if (check.checked){
    document.getElementById(imageID).src=picture1;
  }else{
    document.getElementById(imageID).src=picture2;
  }
}


function updateImg(imagePath) {
    imageUpdate.src = `${imagePath}`;
}

/*
function updateImg(tag, image) {
    var element = document.getElementById(tag);
    if (element) {
	 //I want to create an image tag inside the anchorElement
	removeElement("imageUpdate");
        var img = document.createElement("img");
        img.setAttribute("src", image, "class", "picture", "id", "imageUpdate");
        element.appendChild(img);
    }
}

function removeElement(tag) {
    var elem = document.getElementById(tag);
    elem.parentNode.removeChild(elem);
    return false;
}
*/


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

btnUpdate.addEventListener('click', function(){
	clientSocket.emit('updateImage',btnTemp.value);
});


// Listen for events
clientSocket.on('temp', function(data){
	tempOutput.innerHTML = '<p><strong>'+data+'°</strong><p>';
});

clientSocket.on('humid', function(data){
	//console.log(data);
	humidOutput.innerHTML='<p><strong>'+data+'%</strong><p>';
});

clientSocket.on('updateImage',updateImg);







