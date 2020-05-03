const { io } = require('../server');
const { TicketControl } = require('../classes/ticket_control');


const ticketControl = new TicketControl();


io.on('connection', (client) => {
    client.on('siguienteTicket', (callback) => {

        let siguiente = ticketControl.siguiente();
        callback({ticket: `${siguiente}`})
        console.log('ticket ', siguiente);
    });

    // recuperar el estado actual 
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    // 
    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // notificar cambios en los últimos cuatro
        client.broadcast.emit('estadoActual', {
            actual: ticketControl.getUltimoTicket(),
            ultimosCuatro: ticketControl.getUltimosCuatro()
        });
    });

});


// Ejemplos del ejecricio anterior
// console.log('Usuario conectado');

// client.emit('enviarMensaje', {
//     usuario: 'Administrador',
//     mensaje: 'Bienvenido a esta aplicación'
// });



// client.on('disconnect', () => {
//     console.log('Usuario desconectado');
// });

// // Escuchar el cliente
// client.on('enviarMensaje', (data, callback) => {

//     console.log(data);

//     client.broadcast.emit('enviarMensaje', data);


//     // if (mensaje.usuario) {
//     //     callback({
//     //         resp: 'TODO SALIO BIEN!'
//     //     });

//     // } else {
//     //     callback({
//     //         resp: 'TODO SALIO MAL!!!!!!!!'
//     //     });
//     // }



// });