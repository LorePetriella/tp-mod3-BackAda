function isValidId(id) {
  if (typeof id !== 'string') {
    return 'El ID ingresado es incorrecto'
  }
  return true;
};



function auxGetById(id, db) {
  if (!id) {
    return 'Por favor indique el id'
  };

  const validId = isValidId(id);

  if (validId !== true) {
    return validId; // Retorna el mensaje de error si el ID no es válido
  };

  const book = db.find(element => element.id === id);

  if (!book) {
    return 'El libro indicado por id no existe';
  } else {
    return book;
  };
};



function validateBookProperties(book) {
  const validProps = ['name', 'author', 'tags', 'sold', 'id'];
  const bookKeys = Object.keys(book);

  for (let key of bookKeys) {
    if (!validProps.includes(key)) {
      return `La propiedad ${key} no es válida para un libro`;
    };
  };

  return true;
};



function isValidValue(data) {
  if (data.name && typeof data.name !== 'string') {
    return 'El titulo ingresado es incorrecto'
  };

  if (data.author && typeof data.author !== 'string') {
    return 'El autor ingresado es incorrecto'
  };

  if (data.tags && typeof data.tags !== 'object') {
    return 'El genero ingresado es incorrecto'
  };

  if (data.sold && typeof data.sold !== 'number') {
    return 'La cantidad ingresada es incorrecta'
  };

  return true;
};


function validateBook(book) {
  if (!book.name || !book.author || !book.sold && book.sold != 0 || !book.tags.length || typeof book.tags !== 'object') {

    return 'Propiedades faltantes';
  };

  return true;
};



module.exports = {
  auxGetById,
  validateBookProperties,
  isValidValue,
  validateBook
};