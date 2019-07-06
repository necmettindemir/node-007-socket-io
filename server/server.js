const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



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



    socket.on('createMessage', (message) => {

        console.log('createmessage from client',message);

        //---- broadcasting to ALL connected clients --
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        //---- /broadcasting to ALL connected clients --

    });


    //--------------

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});

server.listen(port,  () => {
    console.log(`server started on ${port}`);
});





