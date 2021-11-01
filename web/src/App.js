import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";
import {useEffect, useState} from "react";
import {deleteBook, getFinishedList, getUnfinishedList, saveBook, setFinished} from "./repository";
import {Col, Container, Navbar, Row} from "react-bootstrap";

function App() {
  const [unfinishedList, setUnfinishedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);


  useEffect(async () => {
    let unfinishedList = await getUnfinishedList()
    setUnfinishedList(unfinishedList)

    let finishedList = await getFinishedList()
    setUnfinishedList(finishedList)
  }, [])

  const handleAddBook = (book) => {
    saveBook(book).then(({bookId}) => {
      book.id = bookId;
      if (book.finished) {
        setFinishedList([...finishedList, book])
      } else {
        setUnfinishedList([...unfinishedList, book])
      }
    });
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

    setFinished(book, !book.finished).then(_ => {
      if (book.finished) {
        moveBook(finishedList, setFinishedList, unfinishedList, setUnfinishedList);
      } else {
        moveBook(unfinishedList, setUnfinishedList, finishedList, setFinishedList);
      }
    });
  }

  const handleDeleteBook = (book) => {
    console.log(book.id)
    const deleteFromList = (list, setList) => {
      const newList = list.filter(mBook => mBook.id !== book.id);
      setList(newList);
    }

    deleteBook(book).then(_ => {
      if (book.finished) {
        deleteFromList(finishedList, setFinishedList);
      } else {
        deleteFromList(unfinishedList, setUnfinishedList);
      }
    });
  }

  return (
    <div>
      <header>
        <Navbar bg="light" className="mx-2">
          <Navbar.Brand className="navbar-brand" href="#">
            Bookshelf
          </Navbar.Brand>
        </Navbar>
      </header>
      <Container className="mt-3">
        <article className="row">
          <Row>
            <Col lg={4}>
              <AddBook handleAddBook={handleAddBook}/>
            </Col>
            <Col lg={4}>
              <Bookshelf finished={false}
                         bookList={unfinishedList}
                         handleToggleBook={handleToggleBook}
                         handleDeleteBook={handleDeleteBook}/>
            </Col>
            <Col lg={4}>
              <Bookshelf finished={true}
                         bookList={finishedList}
                         handleToggleBook={handleToggleBook}
                         handleDeleteBook={handleDeleteBook}/>
            </Col>
          </Row>
        </article>
      </Container>
    </div>
  )
}

export default App;