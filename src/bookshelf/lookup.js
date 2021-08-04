const SAMPLE_UNFINISHED_BOOK_LIST = [
  {
    id: 1,
    title: "Book 1 Unfinished",
    year: 1945,
    finished: false,
  },
  {
    id: 2,
    title: "Book 2 Unfinished",
    year: 2000,
    finished: false,
  },
]

const SAMPLE_FINISHED_BOOK_LIST = [
  {
    id: 3,
    title: "Book 1 Finished",
    year: 2008,
    finished: true,
  },
  {
    id: 4,
    title: "Book 2 Finished",
    year: 2020,
    finished: true,
  },
]

export function getUnfinishedList(callback) {
  callback(SAMPLE_UNFINISHED_BOOK_LIST)
}

export function getFinishedList(callback) {
  callback(SAMPLE_FINISHED_BOOK_LIST)
}

export function saveBook(book, callback) {
  callback({bookId: 3124}, 201)
}

export function setFinished(book, finished, callback) {
  callback({}, 201)
}

export function deleteBook(book, callback) {
  callback({}, 201)
}