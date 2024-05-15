const net = require('net');
// const readLine = require ('readline') 
// const rl = readLine.createInterface({input: process.stdin, output: process.stdout})
// rl.question('Ingresa la accion a realizar: ', (respCliente)=> {
//     console.log('Cliente dice', respCliente);
// })

const client = new net.createConnection({ port: 3000 });

client.on('connect', () => {

    const book = {
        name: false,
        author: "Hermann Hesse",
        tags: ["Comedia", "Filosofia"],
        sold: 15
    }

    // const data = {action: 'read'};
    // const data = {action: 'findBook', body: {id: id}};
    // const data = {action: 'create', body: book};
    // const data = {action: 'getByTitle', body: {name: book.name}};
    // const data = {action: 'booksByAuthor', body: {author: book.author}};
    // const data = {action: 'delete', body: {id: "13"}};
    // const data = {action: 'update', body: {id: "13", sold: 130}};

    const message = JSON.stringify(data);
    client.write(message);
});



client.on('data', (serverMessage) => {
    console.log(JSON.parse(serverMessage));
});