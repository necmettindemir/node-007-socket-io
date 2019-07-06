
//on   : listens
//emit : runs

var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

/*
    var emailJsonObjV2 = {
        to:'jen@example.com',
        text:'hey. this is andrew'
    };

    socket.emit('createEmail',emailJsonObjV2);
*/

var createMessageObjV2 = {
    from:'Andrew',
    text:'it works for me'
};

socket.emit('createMessage',createMessageObjV2);

});

socket.on('disconnect', function()  {
    console.log('disconnected');
});


/*
socket.on('newEmail', function(emailJsonObj) {   
    console.log('new email', emailJsonObj);
});
*/

socket.on('newMessage', function(messageJsonObj) {   
    console.log('new message', messageJsonObj);
});
