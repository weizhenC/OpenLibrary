/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import Logo from "./assets/openlibrary-logo-tighter.svg";
import BookList from "./components/BookList";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";

interface Subject {
  id: number;
  name: string;
}
function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState("animal");
  const [title, setTitle] = useState("");
  // for local test
  // useEffect(() => {
  //   fetch("http://localhost:3000/subject")
  //     .then((response) => response.json())
  //     .then((data) => setSubjects(data));
  // }, []);

  // for the vercel server
  useEffect(() => {
    const vercelServerSubjects: Subject[] = [
      {
        id: 1,
        name: "Love",
      },
      {
        id: 2,
        name: "Reality",
      },
      {
        id: 3,
        name: "Programming",
      },
      {
        id: 4,
        name: "Heroism",
      },
      {
        id: 5,
        name: "Family",
      },
      {
        id: 6,
        name: "Music",
      },
      {
        id: 7,
        name: "Food",
      },
    ];
    setSubjects(vercelServerSubjects);
  }, []);

  const handleClick = (id: number) => {
    const selectedSubject = subjects.find((subject) => {
      return subject.id == id;
    });
    if (selectedSubject) {
      setSubject(selectedSubject.name);
    } else {
      // default value
      console.warn(`Subject with id ${id} not found`);
      setSubject("animal");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md="3">
            <img
              src={Logo}
              alt=""
              style={{ width: "280px", height: "68 px" }}
            />
          </Col>
          <Col md="6">
            <SearchBar setTitle={setTitle} setSubject={setSubject}></SearchBar>
          </Col>
        </Row>

        <Row style={{ margin: "30px" }}>
          <Col md="1" style={{ marginRight: "50px" }}>
            <Nav>
              {subjects.map((subject) => (
                <Nav.Item key={subject.id} style={{ marginTop: "10px" }}>
                  <Nav.Link
                    onClick={() => {
                      handleClick(subject.id);
                    }}
                  >
                    {subject.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col md="10">
            <BookList subject={subject} title={title}></BookList>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col md="1">
            <img
              src="https://openlibrary.org/static/images/pantheon.png"
              alt=""
            />
          </Col>
          <Col>
            <p>
              Open Library is an initiative of the{" "}
              <a href="">Internet Archive</a>, a 501(c)(3) non-profit, building
              a digital library of Internet sites and other cultural artifacts
              in digital form. Other projects include the{" "}
              <a href="">Wayback Machine</a>,<a href="">archive.org</a> and{" "}
              <a href="">archive-it.org</a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
