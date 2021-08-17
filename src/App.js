import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";
import {useEffect, useState} from "react";
import {deleteBook, getFinishedList, getUnfinishedList, saveBook, setFinished} from "./bookshelf/lookup";

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

  const handleDeleteBook = (book) => {
    const deleteFromList = (list, setList) => {
      const newList = list.filter(mBook => mBook.id !== book.id);
      setList(newList);
    }

    const callback = (response, status) => {
      if (status === 201) {
        if (book.finished) {
          deleteFromList(finishedList, setFinishedList);
        } else {
          deleteFromList(unfinishedList, setUnfinishedList);
        }
      }
    }

    deleteBook(book, callback);
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-light bg-light mx-2">
          <a className="navbar-brand" href="#">
            Bookshelf
          </a>
        </nav>
      </header>
      <main className="container">
        <article className="row">
          <aside className="col-lg-4">
            <AddBook handleAddBook={handleAddBook}/>
          </aside>
          <section className="col-lg-4">
            <Bookshelf finished={false}
                       bookList={unfinishedList}
                       handleToggleBook={handleToggleBook}
                       handleDeleteBook={handleDeleteBook}/>
          </section>
          <section className="col-lg-4">
            <Bookshelf finished={true}
                       bookList={finishedList}
                       handleToggleBook={handleToggleBook}
                       handleDeleteBook={handleDeleteBook}/>
          </section>
        </article>
      </main>
    </div>
  )
}

export default App;