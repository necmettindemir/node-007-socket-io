
//on   : listens
//emit : runs

var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function()  {
    console.log('disconnected');
});




socket.on('newMessage', function(messageJsonObjFromClient) {   
    console.log('new message', messageJsonObjFromClient);

    var li= jQuery('<li></li>');
    li.text(`${messageJsonObjFromClient.from} : ${messageJsonObjFromClient.text}`);

    jQuery('#messages').prepend(li);
});


socket.on('newUser', function(messageJsonObj) {   
    console.log('new user', messageJsonObj);
});

/*
socket.emit(
    'createMessage', 
    {
        from:'Frank',
        text:'Hi'
    },
    function(dataFromServer) 
    {   
    console.log('ok.. I got it',dataFromServer);
    }
);
*/



jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', 
        {
            from:'User',
            text: jQuery('[name=message]').val()
        },
        function() {
            
        }
    );

});
