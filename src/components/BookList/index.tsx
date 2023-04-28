import React, { useEffect, useState } from "react";
import { getBookList } from "../../api/BookAPI";
import { BookData } from "../../interface";
import styles from "./index.module.css";
const BookList = () => {
  const [bookList, setBookList] = useState<Array<BookData>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [clearSearch, setClearSearch] = useState<boolean>(false);

  useEffect(() => {
    getBookList()
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {});
  }, [clearSearch]);
  const handleAuthorSort = (order: string) => {
    const sortedList = [...bookList].sort((a, b) => {
      if (a.author < b.author) {
        return order === "up" ? -1 : 1;
      }
      if (a.author > b.author) {
        return order === "up" ? 1 : -1;
      }
      return 0;
    });
    setBookList(sortedList);
    // let toBeOrderBookList: Array<BookData> = [];
    // if (order === "up") {
    //   let authorList: Array<string> = [];
    //   bookList.map((book: BookData) => {
    //     authorList.push(book.author);
    //   });
    //   authorList = authorList.sort();
    //   authorList.map((author: string) => {
    //     bookList.map((book: BookData) => {
    //       if (book.author === author) {
    //         toBeOrderBookList.push(book);
    //       }
    //     });
    //   });
    //   setBookList(toBeOrderBookList);
    // } else {
    //   let authorList: Array<string> = [];
    //   bookList.map((book: BookData) => {
    //     authorList.push(book.author);
    //   });
    //   authorList = authorList.sort().reverse();
    //   authorList.map((author: string) => {
    //     bookList.map((book: BookData) => {
    //       if (book.author === author) {
    //         toBeOrderBookList.push(book);
    //       }
    //     });
    //   });
    //   setBookList(toBeOrderBookList);
    // }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let filteredBook: Array<BookData> = [];
    if (searchTitle.trim() !== "") {
      filteredBook = bookList.filter((book: BookData) =>
        book.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    } else {
      setClearSearch((prevState) => !prevState);
    }
    setBookList(filteredBook);
  };
  const handleDateFormat = (date: string) => {
    const dateTobeFormated = new Date(date);
    const formattedDate = `${dateTobeFormated.getDate()}/${
      dateTobeFormated.getMonth() + 1
    }/${dateTobeFormated.getFullYear()}`;
    return formattedDate
  };
  return (
    <div className={styles.bookContainer}>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
        <div className={styles.searchContainer}>
          <input
            className="form-control mr-sm-2"
            type="search"
            value={searchTitle}
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => {
              setSearchTitle(event.target.value);
            }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
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
          {bookList.map((book: BookData, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{handleDateFormat(book.publicationDate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default BookList;
