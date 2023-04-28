import React, { useEffect, useState } from "react";
import { getBookList } from "../../api/BookAPI";
import { BookData } from "../../interface";
const BookList = () => {
  const [BookList, setBookList] = useState<Array<BookData>>([]);
  useEffect(() => {
    getBookList()
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <div>
      <ul className="list-group">
        {BookList.map((book) => {
          return <li className="list-group-item ">{book.title}</li>;
        })}
      </ul>
    </div>
  );
};
export default BookList;
