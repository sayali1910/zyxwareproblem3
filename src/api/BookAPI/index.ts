import axios from "axios";
export const getBookList = () => {
  return axios.get("https://644ac1f6a8370fb321574de6.mockapi.io/api/v1/books");
};
export const getBookById = (bookId: number) => {
  return axios.get(
    `https://644ac1f6a8370fb321574de6.mockapi.io/api/v1/books/${bookId}`
  );
};
