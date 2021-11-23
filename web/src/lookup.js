const axios = require('axios')

const BASE_URL = "http://127.0.0.1:8000/book/"

async function getListFromAPI(endpoint) {
  return await axios.get(`${BASE_URL}${endpoint}`)
}

export async function lookupUnfinishedList() {
  let response = await getListFromAPI('unfinished/');
  return response.data;
}

export async function lookupFinishedList() {
  let response = await getListFromAPI('finished/');
  return response.data;
}

export async function lookupSaveBook(book) {
  let response = await axios.post(BASE_URL, book)
  return response.data
}

export async function lookupDeleteBook(book) {
  await axios.delete(`${BASE_URL}${book.id}/`)
}

export async function lookupSetFinished(book, finished) {
  return await axios.patch(`${BASE_URL}${book.id}/`, {finished: finished});
}