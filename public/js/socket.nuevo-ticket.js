// Comando para establecer la conexión 

var socket = io();

var label = $("#lblNuevoTicket");

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado al servidor');
});

$('button').on('click', function(){
    console.log('click aquí');
    socket.emit('siguienteTicket', function(resp){
        label.text(resp.ticket);
        console.log('El siguiente ticket es: ', resp);
    });
});


socket.on('estadoActual', (estado) => {
    label.text(estado.actual);
});