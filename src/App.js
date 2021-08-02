import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";

function App() {

  const unfinishedBookList = [
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

  return (
    <div>
      <AddBook/>
      <Bookshelf finished={false} bookList={unfinishedBookList}/>
      <Bookshelf finished={true}/>
    </div>
  )
}

export default App;