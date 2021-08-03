export function AddBook(props) {

  function handleSubmit(e) {
    e.preventDefault();
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
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookIsComplete"
                 className="input_label">
            Finished?
          </label>
          <input id="inputBookIsComplete"
                 className="input_box"
                 type="checkbox"/>
        </div>
        <button id="bookSubmit"
                className="input"
                type="submit"
                onClick="onAddBook()">
          Save
        </button>
      </form>
    </section>
  )
}