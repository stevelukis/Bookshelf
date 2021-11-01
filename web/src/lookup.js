const axios = require('axios')

const BASE_URL = "http://127.0.0.1:8000/book"

const FINISHED_STORAGE_KEY = 'finished';
const UNFINISHED_STORAGE_KEY = 'unfinished';

function generateID() {
  return Math.random().toString(36).substr(2, 5);
}

function getListFromWebStorage(listKey) {
  const rawList = localStorage.getItem(listKey);
  return JSON.parse(rawList)
}

async function getListFromAPI(endpoint) {
  return await axios.get(`${BASE_URL}/${endpoint}`)
}

export async function lookupUnfinishedList() {
  let response = await getListFromAPI('unfinished');
  return response.data;
}

export async function lookupFinishedList() {
  let response = await getListFromAPI('finished');
  return response.data;
}

export async function lookupSaveBook(book) {
  const key = book.finished ? FINISHED_STORAGE_KEY : UNFINISHED_STORAGE_KEY;
  const addedBook = {id: generateID(), ...book}

  let list;
  if (book.finished) {
    list = await lookupFinishedList();
  } else {
    list = await lookupUnfinishedList();
  }
  list.push(addedBook);

  localStorage.setItem(key, JSON.stringify(list))
  return {bookId: book.id}
}

export async function lookupDeleteBook(book) {
  let list;
  if (book.finished) {
    list = await lookupFinishedList();
  } else {
    list = await lookupUnfinishedList();
  }
  list = list.filter(mBook => mBook.id !== book.id);
  console.log(list)

  const key = book.finished ? FINISHED_STORAGE_KEY : UNFINISHED_STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(list))
}

export async function lookupSetFinished(book, finished) {
  // Delete book from the source "from" list
  await lookupDeleteBook(book);

  // Add book to its new list
  await lookupSaveBook({...book, finished: finished});
}