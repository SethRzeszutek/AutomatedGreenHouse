
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
	btnSave = document.getElementById("saveData"),

      lightbox = document.getElementById("light"),
      waterbox = document.getElementById("water"),
      fanbox = document.getElementById("fan"),
      autobox = document.getElementById("auto");

const imageUpdate = document.getElementById("imageUpdate");


 
//Action to pull temperature
setInterval(function () {document.getElementById("getTemp").click();}, 10000);

//changes image based on checked state
function changeImage(check, imageID ,picture1, picture2)
{
  if (check.checked){
    document.getElementById(imageID).src=picture1;
  }else{
    document.getElementById(imageID).src=picture2;
  }
}
//same as above function, but with added animation
function changeImageSpin(check, imageID ,picture1, picture2)
{
  if (check.checked){
    document.getElementById(imageID).src=picture1;
    /*document.getElementById(imageID).setAttribute("class", "iconLarge rotated-image");*/
  }else{
    document.getElementById(imageID).src=picture2;
   /* document.getElementById(imageID).setAttribute("class", "iconLarge");*/
  }
}


function updateImg(imagePath) {
    imageUpdate.src = `${imagePath}`;
}



// Socket Emit events

btnTemp.addEventListener('click', function(){
	
	clientSocket.emit('temp',btnTemp.value);
	
});

btnFan.addEventListener('click', function(){
	clientSocket.emit('fan',btnTemp.value);
});

fanbox.addEventListener("fan", function() { //add event listener for when checkbox changes
    socket.emit("fan", Number(this.checked)); //send button status to server (as 1 or 0)
  });

autobox.addEventListener('click', function() { //add event listener for when checkbox changes
    socket.emit("auto", Number(this.checked), 70); //send button status to server (as 1 or 0)
  });

btnUpdate.addEventListener('click', function(){
	clientSocket.emit('updateImage',0);
});

var dataArray = ["Heirloom Tomatoes", 70, 30, "Seedless Watermelon", 72, 60, "Cucumber", 65, 50, "Snap Peas", 75, 45, "Broccoli", 67, 80, "Green Peppers", 76, 56];

btnSave.addEventListener('click', function(){
	console.log("Saved");
	clientSocket.emit('saveData',dataArray);
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







