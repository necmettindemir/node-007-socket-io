

/*
summary :

on   :  listens
emit : run-do

io.emit : sends to all clients
socket.emit :send only to sender client
socket.broadcast.emit : send all clients except sender client

*/

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const  { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
//console.log('traditional : ',__dirname + '/../public');
//console.log('public path : ' , publicPath);


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {

    console.log('new user connected');

          
    //---- on ----

    socket.on('createMessage', (message,callback) => {

        console.log('createmessage from client',message);
     
    //---- broadcasting to ALL connected clients V2 --
    //broadcast to all clients except sender client!
            //socket.broadcast.
            io.emit('newMessage', {
                from:message.from,
                text:message.text,
                createdAt: new Date().getTime()
        });
    //---- /broadcasting to ALL connected clients V2 --

        callback(' -- this is from server -- ');

    });

    //---- /on ----



    //---- emits ----

     // ---- to connected client only v2 ----
     socket.emit('newUser', generateMessage('Admin','welcome'));
     // ---- /to connected client only v2 ----
 
    
 
     //---- to all clients except connected v2 ---
     socket.broadcast.emit('newUser', generateMessage('admin', 'new user connected'));
     //---- /to all clients except connected v2 ---
 
   


    //---- /emits ----

    //--------------

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});

server.listen(port,  () => {
    console.log(`server started on ${port}`);
});





