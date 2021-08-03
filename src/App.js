import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";

function App() {

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
      id: 1,
      title: "Book 1 Finished",
      year: 2008,
      finished: true,
    },
    {
      id: 2,
      title: "Book 2 Finished",
      year: 2020,
      finished: true,
    },
  ]

  return (
    <div>
      <AddBook/>
      <Bookshelf finished={false} bookList={SAMPLE_UNFINISHED_BOOK_LIST}/>
      <Bookshelf finished={true} bookList={SAMPLE_FINISHED_BOOK_LIST}/>
    </div>
  )
}

export default App;