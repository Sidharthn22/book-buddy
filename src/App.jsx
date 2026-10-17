
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import AddBook from "./pages/AddBooks";
import BrowseBooks from "./pages/BrowseBooks";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse-books" element={<BrowseBooks />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
