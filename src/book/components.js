export default function Book(props) {
  const {book} = props;
  const toogleButtonText = book.finished ? "Unfinish" : "Finish";
  return (
    <div>
      <div>
        Title: {book.title}
      </div>
      <div>
        Author: {book.author}
      </div>
      <div>
        Year: {book.year}
      </div>
      <div>
        <button>{toogleButtonText}</button>
      </div>
    </div>
  )
}