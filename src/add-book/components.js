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
      <h3 className="input_title">Masukkan Buku Baru</h3>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label className="input_label"
                 htmlFor="inputBookTitle">
            Title
          </label>
          <input id="inputBookTitle"
                 className="input_box"
                 type="text"
                 name="title"
                 value={book.title}
                 onChange={handleChange}
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookAuthor"
                 className="input_label">
            Author
          </label>
          <input id="inputBookAuthor"
                 className="input_box"
                 type="text"
                 name="author"
                 value={book.author}
                 onChange={handleChange}
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookYear"
                 className="input_label">
            Year
          </label>
          <input id="inputBookYear"
                 className="input_box"
                 type="number"
                 name="year"
                 value={book.year}
                 onChange={handleChange}
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookIsComplete"
                 className="input_label">
            Finished?
          </label>
          <input id="inputBookIsComplete"
                 className="input_box"
                 name="finished"
                 checked={book.finished}
                 onChange={handleChange}
                 type="checkbox"/>
        </div>
        <input type="submit"
               value="Submit"/>
      </form>
    </section>
  )
}