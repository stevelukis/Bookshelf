export function Bookshelf() {
  const book_list = [
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
    <section>
      <h2>Unfinished book</h2>
      <ul>
        {book_list.map(book => {
          return (
            <li key={book.id}>
              Title: {book.title}
              <br/>
              Year: {book.year}
            </li>
          )
        })}
      </ul>
    </section>
  )
}