const FINISHED_STORAGE_KEY = 'finished';
const UNFINISHED_STORAGE_KEY = 'unfinished';

let unfinishedList = [];
let finishedList = [];

function generateID() {
  return Math.random().toString(36).substr(2, 5);
}

function getListFromWebStorage(listKey) {
  const rawList = localStorage.getItem(listKey);
  return JSON.parse(rawList)
}

export function getUnfinishedList(callback) {
  unfinishedList = getListFromWebStorage(UNFINISHED_STORAGE_KEY) ?? [];
  callback([...unfinishedList]);
}

export function getFinishedList(callback) {
  finishedList = getListFromWebStorage(FINISHED_STORAGE_KEY) ?? [];
  callback([...finishedList]);
}

export function saveBook(book, callback) {
  let list;
  if (book.finished) {
    list = finishedList;
  } else {
    list = unfinishedList;
  }
  const addedBook = {id: generateID(), ...book}
  list.push(addedBook);

  const key = book.finished ? FINISHED_STORAGE_KEY : UNFINISHED_STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(list))

  callback({bookId: book.id}, 201)
}

export function setFinished(book, finished, callback) {
  callback({}, 201)
}

export function deleteBook(book, callback) {
  let list;
  if (book.finished) {
    finishedList = finishedList.filter(mBook => book.id !== mBook.id);
    list = finishedList;
  } else {
    unfinishedList = unfinishedList.filter(mBook => book.id !== mBook.id);
    list = unfinishedList;
  }

  const key = book.finished ? FINISHED_STORAGE_KEY : UNFINISHED_STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(list))

  callback({}, 201)
}