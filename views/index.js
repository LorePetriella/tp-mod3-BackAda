const controllers = require('../controllers/controller.js');



function processArguments(clientMessage) {
    const clientMessageJs = JSON.parse(clientMessage);

    if (!clientMessageJs.action) {
        return 'Por favor indique la accion que desea realizar'
    }
    else if (clientMessageJs.action == "read") {
        return controllers.getAll()
    }
    else if (clientMessageJs.action == "findBook") {
        const book = controllers.getById(clientMessageJs.body.id);
        return book;
    }
    else if (clientMessageJs.action == "create") {
        const newBook = controllers.addBook(clientMessageJs.body)
        return newBook;
    }
    else if (clientMessageJs.action == "getByTitle") {
        const title = controllers.getByName(clientMessageJs.body.name)
        return title;
    }
    else if (clientMessageJs.action == "booksByAuthor") {
        const author = controllers.getByAuthor(clientMessageJs.body.author)
        return author;
    }
    else if (clientMessageJs.action == "delete") {
        const bookToBeDeleted = controllers.deleteById(clientMessageJs.body.id)
        return bookToBeDeleted;
    }
    else if (clientMessageJs.action == 'update') {
        const changes = controllers.updateById(clientMessageJs)
        return changes;
    }
    else {
        return 'Accion invalida';
    }
};



module.exports = {
    processArguments
};