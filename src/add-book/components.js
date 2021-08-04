import {useState} from "react";

export function AddBook(props) {

  function getBlankBook() {
    return {
      title: '',
      author: '',
      year: 0,
      finished: false,
    }
  }

  const [book, setBook] = useState(getBlankBook);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAddBook(book);
    setBook(getBlankBook());
  }

  function handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setBook(oldBook => ({
      ...oldBook,
      [name]: value
    }));
  }

  return (
    <section className="input_section">
      <div className="card">
        <div className="card-header">
          Add a new book
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <input id="inputBookTitle"
                     className="form-control"
                     type="text"
                     name="title"
                     value={book.title}
                     onChange={handleChange}
                     required/>
              <label htmlFor="inputBookTitle">
                Title
              </label>
            </div>
            <div className="form-floating mt-2">
              <input id="inputBookAuthor"
                     className="form-control"
                     type="text"
                     name="author"
                     value={book.author}
                     onChange={handleChange}
                     required/>
              <label htmlFor="inputBookAuthor"
                     className="input_label">
                Author
              </label>
            </div>
            <div className="form-floating mt-2">
              <input id="inputBookYear"
                     className="form-control"
                     type="number"
                     name="year"
                     value={book.year}
                     onChange={handleChange}
                     required/>
              <label htmlFor="inputBookYear"
                     className="input_label">
                Year
              </label>
            </div>
            <div className="form-check mt-2">
              <input id="inputBookIsComplete"
                     className="form-check-input"
                     name="finished"
                     checked={book.finished}
                     onChange={handleChange}
                     type="checkbox"/>
              <label htmlFor="inputBookIsComplete"
                     className="form-check-label">
                Finished?
              </label>
            </div>
            <input className="form-control btn btn-primary mt-2"
                   type="submit"
                   value="Save"/>
          </form>
        </div>
      </div>
    </section>
  )
}