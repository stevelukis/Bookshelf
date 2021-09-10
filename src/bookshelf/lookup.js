const FINISHED_STORAGE_KEY = 'finished';
const UNFINISHED_STORAGE_KEY = 'unfinished';

function generateID() {
  return Math.random().toString(36).substr(2, 5);
}

function getListFromWebStorage(listKey) {
  const rawList = localStorage.getItem(listKey);
  return JSON.parse(rawList)
}

export function getUnfinishedList(callback) {
  const list = getListFromWebStorage(UNFINISHED_STORAGE_KEY)
  callback([...list]);
}

export function getFinishedList(callback) {
  const list = getListFromWebStorage(FINISHED_STORAGE_KEY)
  callback([...list]);
}

export function saveBook(book, callback) {
  let getListCallback = function(list) {
    const addedBook = {id: generateID(), ...book}
    list.push(addedBook);

    const key = book.finished ? FINISHED_STORAGE_KEY : UNFINISHED_STORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(list))
    callback({bookId: addedBook.id}, 201);
  }

  if (book.finished) {
    getFinishedList(getListCallback)
  } else {
    getUnfinishedList(getListCallback)
  }
}

export function setFinished(book, finished, callback) {
  callback({}, 201)
}

export function deleteBook(book, callback) {
  callback({}, 201)
}