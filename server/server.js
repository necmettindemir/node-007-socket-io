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

/*
app.listen(port,  () => {
    console.log(`server started on ${port}`);
});
*/


io.on('connection', (socket) => {

    console.log('new user connected');

    
    //--------------
    /*
    var messageJsonObj = {
        from:'john',
        text:'see you then',
        createAt:'3434343'
    };

    socket.emit('newMessage', messageJsonObj);
    */
    //--------------

    
   // ---- to connected client only v1 ----
    /* 
        socket.emit('newUser', {
            from:'Admin',
            text:'welcome',
            createdAt: new Date().getTime()
        });
    */
    // ---- /to connected client only v1 ----
    

    // ---- to connected client only v2 ----
    socket.emit('newUser', generateMessage('Admin','welcome'));
    // ---- /to connected client only v2 ----

    //---- to all clients except connected v1 ---
    /*
    socket.broadcast.emit('newUser', {
        from:'Admin',
        text:'new user connected',
        createdAt: new Date().getTime()
    });
    */
    //---- /to all clients except connected v1 ---


    //---- to all clients except connected v2 ---

    socket.broadcast.emit('newUser', generateMessage('admin', 'new user connected'));
    //---- /to all clients except connected v2 ---


    socket.on('createMessage', (message) => {

        console.log('createmessage from client',message);

        /*

        //---- broadcasting to ALL connected clients V1 --
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        //---- /broadcasting to ALL connected clients V1 --

        */
        
        //---- broadcasting to ALL connected clients V2 --
        //broadcast to all clients except sender client!
        socket.broadcast.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        //---- /broadcasting to ALL connected clients V2 --

     
    });


    //--------------

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});

server.listen(port,  () => {
    console.log(`server started on ${port}`);
});





