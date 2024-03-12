import { useState } from "react";
import { Form } from "react-bootstrap";
interface SearchBarProps {
  setTitle: (title: string) => void;
  setSubject: (subject: string) => void;
}
const SearchBar = ({ setTitle, setSubject }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = () => {
    setTitle(searchValue);
    setSearchValue("");
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchValue == "") {
        return;
      }
      setSubject("");
      handleSubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <Form.Control
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        type="text"
        style={{ marginTop: "20px" }}
        placeholder="Search the title"
      />
    </>
  );
};

export default SearchBar;
