var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const net = require("net");

// Create a simple server
var conectados=0;
var c;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	conectados++;
	console.log("conectados" + conectados);
	if(conectados>=2)
	{
		console.log("removendo usuario extra!");
		socket.disconnect();
		conectados--;
	}
  socket.on('new message', function(data) {
	  var orientation = data[0] + data[1] + data[2] + data[8] + data[9] + data[10];
	console.log(orientation);
	c.write( JSON.stringify ({response : orientation}));
	
  });
  socket.on('disconnect', function() {
	console.log("usuario saiu!");
	conectados--;
})
  
});


http.listen(8080, function () {
    console.log("HTTP: Listening");
});


var server = net.createServer(function (conn) {
	c=conn;
    console.log("Server: Client connected");
	
    // If connection is closed
    conn.on("end", function() {
        console.log('Server: Client disconnected');
        // Close the server
        server.close();
        // End the process
        process.exit(0);
		
    });

    // Handle data from client
	
	
    conn.on("data", function(data) {
        data = JSON.parse(data);
        console.log("Response from client: %s", data.response);
    });

    
});








// Listen for connections
server.listen(3001, function () {
    console.log("Server: Listening");
});
