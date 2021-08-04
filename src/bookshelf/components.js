import Book from "../book/components";

export function Bookshelf(props) {
  const bookshelfName = props.finished ? "Finished Books" : "Unfinished Books"

  let {bookList} = props;
  // If bookList is undefined, replace it with an empty array
  bookList = bookList ? bookList : [];

  return (
    <section>
      <h2>{bookshelfName}</h2>
      <ul>
        {bookList.map(book => {
          return (
            <Book book={book}
                  handleToggleBook={props.handleToggleBook}
                  handleDeleteBook={props.handleDeleteBook}
            />
          )
        })}
      </ul>
    </section>
  )
}