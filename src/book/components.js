export default function Book(props) {
  const {book} = props;
  const toogleButtonText = book.finished ? "Unfinish" : "Finish";
  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          Title:
        </div>
        <div className="col-lg-9 col-sm-12">
          {book.title}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          Author:
        </div>
        <div className="col-lg-9 col-sm-12">
          {book.author}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          Year:
        </div>
        <div className="col-lg-9 col-sm-12">
          {book.year}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6 col-sm-12 p-1">
          <button className="form-control btn btn-primary"
                  onClick={() => props.handleToggleBook(book)}>
            {toogleButtonText}
          </button>
        </div>
        <div className="col-lg-6 col-sm-12 p-1">
          <button className="form-control btn btn-danger"
                  onClick={() => props.handleDeleteBook(book)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}