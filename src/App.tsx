import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BookList from "./components/bookList";
import BookCard from "./components/bookCard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book" element={<BookCard />} />
      </Routes>
    </div>
  );
}

export default App;
