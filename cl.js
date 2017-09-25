const net = require("net");
var socket = new net.Socket();
//var serialport = require('serialport');


/*   var myPort = new serialport("COM6", { //ESCOLHER A PORTA
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")
 });
 myPort.open; //Inicia conexao com a porta serial e exibe informações sobre a conexao
 myPort.on('open', showPortOpen);
 function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}*/

// Create a socket (client) that connects to the server

socket.connect(3001, "172.18.26.56", function () {
    console.log("Client: Connected to server");
});

// Let's handle the data we get from the server
socket.on("data", function (data) {
	try{
    data = JSON.parse(data);
	var orientation = data.response;
	console.log(orientation);
	//myPort.write(orientation);
	}
	
	catch(err) { console.log("deu erro!");}
	

});