
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BrowseBooks.css";
import { createBook } from "../api";

const API_URL = "https://openlibrary.org/search.json";

function BrowseBooks() {
  const [search, setSearch] = useState("fiction");
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("All");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [addingId, setAddingId] = useState(null);

  async function fetchBooks(query, pageNumber = 1, append = false) {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        q: query || "fiction",
        page: String(pageNumber),
        limit: "20",
        fields:
          "key,title,author_name,cover_i,first_publish_year,subject,number_of_pages_median",
      });

      const response = await fetch(`${API_URL}?${params}`);

      if (!response.ok) {
        throw new Error("Could not load books. Please try again.");
      }

      const data = await response.json();

      const results = (data.docs || []).map((item) => ({
        id: item.key,
        title: item.title || "Untitled",
        author: item.author_name?.[0] || "Unknown author",
        genre: item.subject?.[0] || "Fiction",
        pages: item.number_of_pages_median || 0,
        year: item.first_publish_year || "",
        cover: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
          : "",
        description: item.first_publish_year
          ? `First published in ${item.first_publish_year}.`
          : "Discover this book on Open Library.",
      }));

      setBooks((previous) => {
        if (!append) return results;

        const existingIds = new Set(previous.map((book) => book.id));
        return [
          ...previous,
          ...results.filter((book) => !existingIds.has(book.id)),
        ];
      });

      setHasMore(
        pageNumber * 20 < (data.numFound ?? data.num_found ?? 0)
      );
      setPage(pageNumber);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      if (!append) setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks("fiction", 1, false);
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    const query = input.trim();

    if (!query) {
      setMessage("Enter a book title, author, or topic to search.");
      return;
    }

    setMessage("");
    setSearch(query);
    setGenre("All");
    fetchBooks(query, 1, false);
  }

  const genres = [
    "All",
    ...new Set(books.map((book) => book.genre).filter(Boolean)),
  ];

  const filteredBooks =
    genre === "All"
      ? books
      : books.filter((book) => book.genre === genre);

  async function addToLibrary(book) {
    setMessage("");
    setAddingId(book.id);

    try {
      const response = await fetch("http://127.0.0.1:8000/books");

      if (!response.ok) {
        throw new Error("Could not check your library.");
      }

      const savedBooks = await response.json();

      const alreadyExists = savedBooks.some(
        (item) =>
          item.title.toLowerCase() === book.title.toLowerCase() &&
          item.author.toLowerCase() === book.author.toLowerCase()
      );

      if (alreadyExists) {
        setMessage(`"${book.title}" is already in your library.`);
        return;
      }

      await createBook({
        title: book.title,
        author: book.author,
        genre: book.genre.slice(0, 80),
        status: "Want to Read",
        total_pages: book.pages,
        current_page: 0,
        notes: "",
        cover: book.cover || "📚",
      });

      setMessage(`"${book.title}" added to your library!`);
    } catch (err) {
      setMessage(err.message || "Could not add the book.");
    } finally {
      setAddingId(null);
    }
  }

  function loadMore() {
    if (!loading && hasMore) {
      fetchBooks(search, page + 1, true);
    }
  }

  return (
    <main className="browse-page">
      <header className="browse-header">
        <p className="eyebrow">YOUR NEXT ADVENTURE</p>
        <h1>
          Browse <span>Books.</span>
        </h1>
        <p>Discover stories, ideas, and new perspectives.</p>
      </header>

      <form className="browse-controls" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search by title, author, or topic..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Search books"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          aria-label="Filter by category"
        >
          {genres.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All categories" : item}
            </option>
          ))}
        </select>
      </form>

      <p className="browse-result-count">
        {filteredBooks.length} books displayed
      </p>

      {message && (
        <p className="browse-message" role="status">
          {message}
        </p>
      )}

      {error && (
        <div className="browse-empty">
          <h2>Could not load books</h2>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => fetchBooks(search, 1, false)}
          >
            Try again
          </button>
        </div>
      )}

      {!error && loading && books.length === 0 && (
        <p role="status">Loading books...</p>
      )}

      {!error && !loading && filteredBooks.length === 0 && (
        <div className="browse-empty">
          <h2>No books found</h2>
          <p>Try another search.</p>
        </div>
      )}

      {filteredBooks.length > 0 && (
        <section className="browse-grid">
          {filteredBooks.map((book) => (
            <article className="browse-card" key={book.id}>
              <div className="browse-cover">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span>📚</span>
                )}
                <small>{book.genre}</small>
              </div>

              <div className="browse-card-content">
                <p className="browse-genre">{book.genre}</p>
                <h2>{book.title}</h2>
                <p className="browse-author">by {book.author}</p>
                <p className="browse-description">{book.description}</p>
                {book.pages > 0 && (
                  <p className="browse-pages">{book.pages} pages</p>
                )}

                <button
                  type="button"
                  className="browse-add-button"
                  disabled={addingId === book.id}
                  onClick={() => addToLibrary(book)}
                >
                  {addingId === book.id
                    ? "Adding..."
                    : "+ Add to My Library"}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {!error && hasMore && books.length > 0 && (
        <div className="browse-library-link">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Books"}
          </button>
        </div>
      )}

      <div className="browse-library-link">
        <Link to="/my-books">View My Library →</Link>
      </div>
    </main>
  );
}

export default BrowseBooks;
