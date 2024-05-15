const models = require('../models/model.js');
const uuid = require('uuid');
const auxFunctions = require('../utils/aux_functions.js')



const getAll = () => models.readFile();



const getById = (id) => {

  const books = models.readFile();
  const bookFound = auxFunctions.auxGetById(id, books);
  return bookFound;
};



const getByName = (name) => {
  if (typeof name !== 'string') {
    return 'Por favor ingrese un titulo correcto'
  };

  const lowerCaseName = name.toLowerCase();
  const books = models.readFile();
  const book = books.filter(element => element.name.toLowerCase().includes(lowerCaseName));

  if (book.length > 0) {
    return book;
  } else {
    return "Libro no disponible";
  };
};



const getByAuthor = (author) => {
  const lowerCaseAuthor = author.toLowerCase();
  const books = models.readFile();
  const booksFilt = books.filter(element => element.author.toLowerCase().includes(lowerCaseAuthor));

  if (booksFilt.length > 0) {
    return booksFilt;
  } else {
    return `No existen libros de ${author} en nuestra base de datos`;
  };
};



function deleteById(id) {
  const books = models.readFile();
  const toValidate = auxFunctions.auxGetById(id, books)

  if (typeof toValidate === 'string') {
    return toValidate;
  };

  const filteredBooks = books.filter((book) => book.id !== id);

  models.createFile(filteredBooks);

  return `El libro con ID ${id} fue eliminado`
}



function updateById(data) {
  const id = data.body.id;

  const propsValidation = auxFunctions.validateBookProperties(data.body);

  if (propsValidation !== true) {
    return propsValidation;
  };

  const validValues = auxFunctions.isValidValue(data.body)

  if (typeof validValues === 'string') {
    return validValues;
  };

  const db = models.readFile();
  const newBook = auxFunctions.auxGetById(id, db);

  if (typeof newBook == 'string') {
    return newBook;
  };

  if (!newBook) {
    return 'No encontramos el libro';
  };

  const keys = Object.keys(data.body);

  for (let key of keys) {
    switch (key) {
      case 'id':
        break;
      case 'name':
        newBook.name = data.body.name;
        break;
      case 'author':
        newBook.author = data.body.author;
        break;
      case 'tags':
        newBook.tags = data.body.tags;
        break;
      case 'sold':
        newBook.sold = data.body.sold;
        break;
      default:
        return `La propiedad ${key} no existe`
    }
  };

  models.createFile(db);
  return 'Cambios realizados'
};



function addBook(book) {
  const validBook = auxFunctions.validateBook(book);
  if (typeof validBook === 'string') {
    return validBook;
  };

  const books = models.readFile();

  book.id = uuid.v4();
  books.push(book);
  models.createFile(books);
  return 'Se ha creado un nuevo libro';
}



module.exports = {
  addBook,
  updateById,
  deleteById,
  getAll,
  getByAuthor,
  getById,
  getByName
};

