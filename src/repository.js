import {lookupDeleteBook, lookupFinishedList, lookupSaveBook, lookupUnfinishedList} from "./lookup";

export async function getUnfinishedList() {
  return await lookupUnfinishedList();
}

export async function getFinishedList() {
  return await lookupFinishedList();
}

export async function saveBook(book) {
  return await lookupSaveBook(book);
}

export function setFinished(book, finished, callback) {
  callback({}, 201)
}

export async function deleteBook(book) {
  await lookupDeleteBook(book);
}