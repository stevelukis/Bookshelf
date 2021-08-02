export function AddBook() {

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
            Judul
          </label>
          <input id="inputBookTitle"
                 className="input_box"
                 type="text"
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookAuthor"
                 className="input_label">
            Penulis
          </label>
          <input id="inputBookAuthor"
                 className="input_box"
                 type="text"
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookYear"
                 className="input_label">
            Tahun
          </label>
          <input id="inputBookYear"
                 className="input_box"
                 type="number"
                 required/>
        </div>
        <div className="input">
          <label htmlFor="inputBookIsComplete"
                 className="input_label">
            Selesai dibaca
          </label>
          <input id="inputBookIsComplete"
                 className="input_box"
                 type="checkbox"/>
        </div>
        <button id="bookSubmit"
                className="input"
                type="submit"
                onClick="onAddBook()">
          Simpan
        </button>
      </form>
    </section>
  )
}