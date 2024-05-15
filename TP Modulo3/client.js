const net = require ('net');

const client = new net.createConnection({port: 3000});

client.on('connect', () => {

    const book = {

        name: "Demian",
        author: "Hermann Hesse",
        tags: ["Comedia","Filosofia"],
        sold: 15
    }

    // const data = {action: 'read'};
    // const data = {action: 'findBook', body: {id: id}};
    // const data = {action: 'create', body: book};
    // const data = {action: 'getByTitle', body: {name: book.name}};
    // const data = {action: 'booksByAuthor', body: {author: book.author}};
    // const data = {action: 'delete', body: {id: id}};
    // const data = {action: 'update', body: {id: 456, sold: 5}};

    const message = JSON.stringify(data);
    client.write(message);
});

client.on('data', (serverMessage) => {
    console.log(JSON.parse(serverMessage));
});