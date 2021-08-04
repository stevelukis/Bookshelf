import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";
import {useEffect, useState} from "react";
import {getFinishedList, getUnfinishedList, saveBook, setFinished} from "./bookshelf/lookup";

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

  const handleToggleBook = (book) => {
    const moveBook = (sourceList, setSourceList, destList, setDestList) => {
      console.log(book)
      const newSourceList = sourceList.filter(mBook => {
        return mBook.id !== book.id
      });
      setSourceList(newSourceList);

      const newDestList = [...destList, {...book, finished: !book.finished}];
      setDestList(newDestList);
    }

    const callback = (response, status) => {
      if (status === 201) {
        if (book.finished) {
          moveBook(finishedList, setFinishedList, unfinishedList, setUnfinishedList);
        } else {
          moveBook(unfinishedList, setUnfinishedList, finishedList, setFinishedList);
        }
      }
    }

    setFinished(book, !book.finished, callback)
  }

  return (
    <div>
      <AddBook handleAddBook={handleAddBook}/>
      <Bookshelf finished={false}
                 bookList={unfinishedList}
                 handleToggleBook={handleToggleBook}/>
      <Bookshelf finished={true}
                 bookList={finishedList}
                 handleToggleBook={handleToggleBook}/>
    </div>
  )
}

export default App;