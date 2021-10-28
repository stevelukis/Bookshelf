const FINISHED_STORAGE_KEY = 'finished';
const UNFINISHED_STORAGE_KEY = 'unfinished';

function generateID() {
  return Math.random().toString(36).substr(2, 5);
}

function getListFromWebStorage(listKey) {
  const rawList = localStorage.getItem(listKey);
  return JSON.parse(rawList)
}

export async function lookupUnfinishedList() {
  return getListFromWebStorage(UNFINISHED_STORAGE_KEY) ?? [];
}

export async function lookupFinishedList() {
  return getListFromWebStorage(FINISHED_STORAGE_KEY) ?? [];
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