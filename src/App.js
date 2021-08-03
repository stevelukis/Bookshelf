import {AddBook} from "./add-book/components"
import {Bookshelf} from "./bookshelf/components";
import {useEffect, useState} from "react";
import {getFinishedList, getUnfinishedList} from "./bookshelf/lookup";

function App() {
  const [unfinishedList, setUnfinishedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const [isListFetched, setIsListFetched] = useState(false);

  useEffect(() => {
    getUnfinishedList(list => {
      setUnfinishedList(list)
    });

    getFinishedList(list => {
      setFinishedList(list)
    });
  })

  return (
    <div>
      <AddBook/>
      <Bookshelf finished={false} bookList={unfinishedList}/>
      <Bookshelf finished={true} bookList={finishedList}/>
    </div>
  )
}

export default App;