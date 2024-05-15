const models = require('../models/model.js');
const uuid = require('uuid');


const getAll = () => models.readFile();

// console.log(getAll())                            

function auxGetById(id, db) {
  // if (typeof id != 'string'){
  //   return 'El ID ingresado es incorrecto'
  // }
  const validId = isValidId(id);
  if (validId !== true) {
    return validId; // Retorna el mensaje de error si el ID no es válido
  }

  const book = db.find(element => element.id == id);

  if (!book) {
    return 'El ID indicado no existe';  
  } else {
    return book;
  };
}


// - getById(id) --> Devuelve el libro cuyo ID es el indicado por parámetro.

const getById = (id) => {
  
  const books = models.readFile();
  const bookFound = auxGetById(id, books);
  return bookFound;
}
// console.log(getById("14"));


// // - getByName(name) --> Devuelve el libro cuyo nombre es el indicado por parámetro.

const getByName = (name) => {

  const lowerCaseName = name.toLowerCase();
  const books = models.readFile();
  const book = books.filter(element => element.name.toLowerCase().includes(lowerCaseName));

  if (book.length > 0) {
    return book;
  } else {
    return "Libro no disponible";
  };
}

// console.log(getByName('Yani'));


// - getByAuthor(author) --> Devuelve un array con los libros cuyo nombre de autor es el indicado por parámetro.

const getByAuthor = (author) => {

  // Agregar inicial minúscula que pase a mayúscula

  const lowerCaseAuthor = author.toLowerCase();
  const books = models.readFile();
  const booksFilt = books.filter(element => element.author.toLowerCase().includes(lowerCaseAuthor));

  if (booksFilt.length > 0) {
    return booksFilt;
  } else {
    return `No existen libros de ${author} en nuestra base de datos`;
  };
};

// console.log(getByAuthor('Gabriel'));

// Elimino el libro que corresponda con el ID enviado por el cliente.

function deleteById(id) {
  const books = models.readFile();
  const toValidate = auxGetById(id, books)

  if(typeof toValidate === 'string'){
    return toValidate;
  }

  const filteredBooks = books.filter((book) => book.id !== id);

  models.createFile(filteredBooks);
  return `El libro con ID ${id} fue eliminado`
}

// console.log(deleteById("14"));
function validateBookProperties(book) {
  const validProps = ['name', 'author', 'tags', 'sold'];
  const bookKeys = Object.keys(book);
  for (let key of bookKeys) {
    if (!validProps.includes(key)) {
      return `La propiedad ${key} no es válida para un libro`;
    }
  }
  return true;
}

// Modifico el libro con la data que envíe el cliente por ID

function updateById(data) {
  const id = data.body.id;
  // if (!id) {
  //   return 'Por favor indique el id'
  // };

  const propsValidation = validateBookProperties(data.body);
  if (propsValidation !== true) {
    return propsValidation;
  }

  
  const db = models.readFile();
  const newBook = auxGetById(id, db);
  if(!newBook){
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
        throw new Error(`La propiedad ${key} no existe`)
    }
  };

  models.createFile(db);
  return 'Cambios realizados'
}

// updateById(data)


function validateBook(book) {

  if (!book.name || !book.author || !book.sold && book.sold != 0 || !book.tags.length || typeof book.tags !== 'object') {
    return 'Propiedades faltantes';
  };

  return true;
}

function isValidId(id){
  if (typeof id != 'string'){
    return 'El ID ingresado es incorrecto'
  }
  return true
} 
// console.log(isValidId("14"));

// Crea el libro envíado por el cliente en la base de datos.

function addBook(book) {
  const validBook = validateBook(book);
  if (typeof validBook == 'string') {
    return validBook;
  }

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
}

