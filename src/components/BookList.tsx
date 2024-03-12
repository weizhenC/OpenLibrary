import { Col, Row, Spinner } from "react-bootstrap";
import BookCard from "./BookCard";
import useBooks from "../hooks/useBooks";
interface BookListProps {
  subject?: string;
  title?: string;
}
const BookList = ({ subject, title }: BookListProps) => {
  const { books, error, isLoading } = useBooks(
    subject ? subject.toLocaleLowerCase() : undefined,
    title ? title.toLocaleLowerCase() : undefined
  );
  if (isLoading) {
    return (
      <Spinner
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
        }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div>{error}.....</div>;
  }
  return (
    <Row xs={1} sm={2} md={4} className="g-4 align-items-stretch">
      {books.map((book, index) => (
        <Col key={index}>
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
