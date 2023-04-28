import React, { useEffect, useState } from "react";
import { getBookList } from "../../api/BookAPI";
import { BookData } from "../../interface";
import styles from "./index.module.css";
const BookList = () => {
  const [bookList, setBookList] = useState<Array<BookData>>([]);
  useEffect(() => {
    getBookList()
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {});
  }, []);
  const handleAuthorSort = (order: string) => {
    let toBeOrderBookList: Array<BookData> = [];
    if (order === "up") {
      let authorList: Array<string> = [];
      bookList.map((book: BookData) => {
        authorList.push(book.author);
      });
      authorList = authorList.sort();
      authorList.map((author: string) => {
        bookList.map((book: BookData) => {
          if (book.author === author) {
            toBeOrderBookList.push(book);
          }
        });
      });
      setBookList(toBeOrderBookList);
    } else {
      let authorList: Array<string> = [];
      bookList.map((book: BookData) => {
        authorList.push(book.author);
      });
      authorList = authorList.sort().reverse();
      authorList.map((author: string) => {
        bookList.map((book: BookData) => {
          if (book.author === author) {
            toBeOrderBookList.push(book);
          }
        });
      });
      setBookList(toBeOrderBookList);
    }
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Book Name</th>
            <th scope="col">
              Author{" "}
              <button
                className={styles.filterButton}
                onClick={() => {
                  handleAuthorSort("up");
                }}
              >
                ⬆️
              </button>
              <button
                className={styles.filterButton}
                onClick={() => {
                  handleAuthorSort("down");
                }}
              >
                ⬇️
              </button>
            </th>
            <th scope="col">Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book: BookData) => {
            return (
              <tr>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default BookList;
