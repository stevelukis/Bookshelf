import Book from "../book/components";
import {Table} from "react-bootstrap";

export function Bookshelf(props) {
  const bookshelfName = props.finished ? "Finished Books" : "Unfinished Books"

  let {bookList} = props;
  // If bookList is undefined, replace it with an empty array
  bookList = bookList ? bookList : [];

  return (
    <div className="card">
      <div className="card-header">
        {bookshelfName}
      </div>
      <div className="card-body p-0">
        <Table className="p-0 m-0">
          <tbody>
          {bookList.map(book => {
            return (
              <tr key={book.id}>
                <td className="p-3">
                  <Book book={book}
                        handleToggleBook={props.handleToggleBook}
                        handleDeleteBook={props.handleDeleteBook}
                  />
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}