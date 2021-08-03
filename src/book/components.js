export default function Book(props) {
  const {book} = props;
  return (
    <div>
      <p>
        Title: {book.title}
        <br/>
        Author: {book.author}
        <br/>
        Year: {book.year}
      </p>
    </div>
  )
}