import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getBookById } from "../../api/BookAPI";
import { BookData } from "../../interface";
import styles from "./index.module.css";
const BookCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [book, setBook] = useState<BookData>();
  const navigate = useNavigate();
  const bookId = searchParams.get("id");
  useEffect(() => {
    getBookById(Number(bookId))
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <div className={styles.container}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{book?.title}</h5>
          <h6 className="card-title">{book?.author}</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
