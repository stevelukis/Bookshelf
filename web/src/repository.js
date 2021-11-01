import {lookupDeleteBook, lookupFinishedList, lookupSaveBook, lookupSetFinished, lookupUnfinishedList} from "./lookup";

export async function getUnfinishedList() {
  return await lookupUnfinishedList()
}

export async function getFinishedList() {
  return await lookupFinishedList()
}

export async function saveBook(book) {
  return await lookupSaveBook(book);
}

export async function setFinished(book, finished) {
  return await lookupSetFinished(book, finished);
}

export async function deleteBook(book) {
  await lookupDeleteBook(book);
}