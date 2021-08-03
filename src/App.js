import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";
import {useEffect, useState} from "react";
import {getFinishedList, getUnfinishedList, saveBook} from "./bookshelf/lookup";

function App() {
  const [unfinishedList, setUnfinishedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);


  useEffect(() => {
    getUnfinishedList(list => {
      setUnfinishedList(list)
    });

    getFinishedList(list => {
      setFinishedList(list)
    });
  }, [])

  const handleAddBook = (book) => {
    const addToList = (list) => {
      return [...list, book]
    }

    const callback = (response, status) => {
      if (status === 201) {
        book.id = response.bookId;
        if (book.finished) {
          setFinishedList(addToList)
        } else {
          setUnfinishedList(addToList)
        }
      }
    }

    saveBook(book, callback);
  }

  return (
    <div>
      <AddBook handleAddBook={handleAddBook}/>
      <Bookshelf finished={false} bookList={unfinishedList}/>
      <Bookshelf finished={true} bookList={finishedList}/>
    </div>
  )
}

export default App;