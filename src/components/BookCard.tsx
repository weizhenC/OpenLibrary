import { Card } from "react-bootstrap";
import { Work } from "../hooks/useBooks";

interface BookCardProps {
  book: Work;
}
const BookCard = ({ book }: BookCardProps) => {
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            "https://covers.openlibrary.org/b/isbn/" +
            book.availability.isbn +
            "-M.jpg"
          }
          style={{ width: "100%", height: "296px" }}
        />
        <Card.Body>
          <Card.Title>
            <strong>
              <p>{book.title}</p>
            </strong>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookCard;
