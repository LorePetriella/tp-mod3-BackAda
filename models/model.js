const fs = require('fs');
const path = './DB/db.json';

function readFile() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]))
  }
  const db = fs.readFileSync(path, { encoding: 'utf-8' });
  const dbJs = JSON.parse(db);
  return dbJs;
};

function createFile(data) {

  const dataJson = JSON.stringify(data);
  fs.writeFileSync(path, dataJson);
};


module.exports = {
  readFile,
  createFile
}