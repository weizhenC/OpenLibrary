import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export type ShowBook = {
  works: Work[];
};
export interface Author {
  name: string;
}
export interface Availability {
  isbn: string;
}
export interface Work {
  authors?: Author[];
  first_publish_year?: number;
  title: string;
  availability: Availability;
}

export interface SearchResponse {
  docs: SearchBook[];
}

export interface SearchBook {
  title: string;
  isbn: string[];
}

const useBooks = (subject?: string, title?: string) => {
  const [books, setBooks] = useState<Work[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (subject) {
      apiClient
        .get<ShowBook>("/subjects/" + subject + ".json?limit=30")
        .then((res) => {
          const works = res.data.works;
          const newWorks = works.filter((book) => {
            return (
              book.availability !== undefined &&
              book.availability.isbn !== null &&
              book.availability.isbn !== undefined
            );
          });
          if (newWorks.length == 0) {
            alert("there is no subject with " + subject);
          }
          setIsLoading(false);
          setBooks(newWorks);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    } else {
      apiClient
        .get<SearchResponse>("/search.json?title=" + title + "&limit=10")
        .then((res) => {
          const docs = res.data.docs;
          const newDocs: Work[] = [];
          const selectedDocs = docs.filter((doc) => {
            return doc.isbn != undefined && doc.isbn.length > 1;
          });
          selectedDocs.map((doc) => {
            const newWork: Work = {
              title: doc.title,
              availability: { isbn: doc.isbn[0] },
            };
            newDocs.push(newWork);
          });
          if (docs.length == 0) {
            alert("there is no title with " + title);
          }
          setIsLoading(false);
          setBooks(newDocs);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [subject, title]);

  return { books, error, isLoading };
};

export default useBooks;
