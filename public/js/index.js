
//on   : listens
//emit : runs

var socket = io();

socket.on('connect', function() {
    console.log('connected to server');


/*
var createMessageObjV2 = {
    from:'Andrew',
    text:'it works for me'
};

socket.emit('createMessage',createMessageObjV2);
*/

});

socket.on('disconnect', function()  {
    console.log('disconnected');
});




socket.on('newMessage', function(messageJsonObj) {   
    console.log('new message', messageJsonObj);
});


socket.on('newUser', function(messageJsonObj) {   
    console.log('new user', messageJsonObj);
});