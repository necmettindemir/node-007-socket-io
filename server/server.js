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
    var emailJsonObj = {
        from:'mike@example.com',
        text:'hey.. what is gooing on!',
        createAt:'123'
    };
    
    socket.emit('newEmail', emailJsonObj);
*/

var messageJsonObj = {
    from:'john',
    text:'see you then',
    createAt:'3434343'
};

socket.emit('newMessage', messageJsonObj);

    //--------------

/*
    socket.on('createEmail', (createEmailObj) => {
        console.log('createEmail from client',createEmailObj);
    });
*/

socket.on('createMessage', (message) => {
    console.log('createmessage from client',message);
});


    //--------------

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});

server.listen(port,  () => {
    console.log(`server started on ${port}`);
});





