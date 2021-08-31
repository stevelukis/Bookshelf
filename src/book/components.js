import {Col, Row, Button} from "react-bootstrap";

export default function Book(props) {
  const {book} = props;
  const toogleButtonText = book.finished ? "Unfinish" : "Finish";
  return (
    <div>
      <Row>
        <Col lg={3} sm={12}>
          Title:
        </Col>
        <Col lg={9} sm={12}>
          {book.title}
        </Col>
      </Row>
      <Row>
        <Col lg={3} sm={12}>
          Author:
        </Col>
        <Col lg={9} sm={12}>
          {book.author}
        </Col>
      </Row>
      <Row>
        <Col lg={3} sm={12}>
          Year:
        </Col>
        <Col lg={9} sm={12}>
          {book.year}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={6} sm={12} className="p-1 d-grid">
          <Button variant="primary"
                  onClick={() => props.handleToggleBook(book)}>
            {toogleButtonText}
          </Button>
        </Col>
        <Col lg={6} sm={12} className="p-1 d-grid">
          <Button variant="danger"
                  onClick={() => props.handleDeleteBook(book)}>
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  )
}