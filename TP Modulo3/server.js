const net = require ('net');
const views = require('./views/view.js')

const port = 3000;

const server = net.createServer();

server.on('connection', (socket) => { //Socket = IP: puerto
    console.log('Cliente conectado');

    socket.on('data', (clientMessage) => {
        const mensajeJs = views.processArguments(clientMessage);
        socket.write(JSON.stringify(mensajeJs));
        // console.log('Cliente dice: '+ textMessage);
    })

});


server.listen(port, () =>{
    console.log('SERVIDOR ESCUCHANDO EN EL PUERTO: ' + port);
})