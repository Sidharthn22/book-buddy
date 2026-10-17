
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, updateBook, deleteBook } from "../api";
import "./MyBooks.css";

function progressFor(book) {
  if (book.status === "Completed") return 100;
  if (!book.total_pages) return 0;

  return Math.min(
    100,
    Math.round((book.current_page / book.total_pages) * 100)
  );
}

function isImageUrl(cover) {
  return (
    typeof cover === "string" &&
    /^https?:\/\//i.test(cover)
  );
}

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadBooks() {
    setLoading(true);

    try {
      const data = await getBooks();
      setBooks(data);
      setMessage("");
    } catch (error) {
      setMessage(
        "Could not load books. Check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  const genres = [
    "All",
    ...new Set(books.map((book) => book.genre).filter(Boolean)),
  ];

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase().trim();

    return (
      ((book.title || "").toLowerCase().includes(query) ||
        (book.author || "").toLowerCase().includes(query)) &&
      (genreFilter === "All" || book.genre === genreFilter) &&
      (statusFilter === "All" || book.status === statusFilter)
    );
  });

  function startEditing(book) {
    setEditingId(book.id);
    setEditForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: book.status,
      total_pages: book.total_pages,
      current_page: book.current_page,
      notes: book.notes || "",
      cover: book.cover || "📚",
    });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function saveEdit(event) {
    event.preventDefault();

    const totalPages = Number(editForm.total_pages) || 0;
    const currentPage = Number(editForm.current_page) || 0;

    if (
      totalPages < 0 ||
      currentPage < 0 ||
      (totalPages > 0 && currentPage > totalPages)
    ) {
      setMessage("Pages read cannot exceed total pages.");
      return;
    }

    const payload = {
      ...editForm,
      title: editForm.title.trim(),
      author: editForm.author.trim(),
      total_pages: totalPages,
      current_page:
        editForm.status === "Completed" && totalPages > 0
          ? totalPages
          : currentPage,
    };

    try {
      await updateBook(editingId, payload);
      setEditingId(null);
      setMessage("Book updated successfully.");
      await loadBooks();
    } catch (error) {
      setMessage(error.message || "Could not update book.");
    }
  }

  async function handleDelete(book) {
    if (!window.confirm(`Delete "${book.title}" from your library?`)) {
      return;
    }

    try {
      await deleteBook(book.id);
      setMessage("Book deleted successfully.");
      await loadBooks();
    } catch (error) {
      setMessage(error.message || "Could not delete book.");
    }
  }

  return (
    <main className="my-books-page">
      <header className="my-books-header">
        <div>
          <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
          <h1>
            My <span>Books.</span>
          </h1>
          <p className="my-books-subtitle">
            Every book tells a story. Keep track of yours.
          </p>
        </div>

        <Link to="/add-book" className="add-book-button">
          + Add New Book
        </Link>
      </header>

      <section className="book-stats">
        <article className="book-stat-card">
          <span className="stat-icon">📚</span>
          <div>
            <p>Total Books</p>
            <h2>{books.length}</h2>
          </div>
        </article>

        <article className="book-stat-card">
          <span className="stat-icon">📖</span>
          <div>
            <p>Reading</p>
            <h2>
              {books.filter((b) => b.status === "Currently Reading").length}
            </h2>
          </div>
        </article>

        <article className="book-stat-card">
          <span className="stat-icon">✓</span>
          <div>
            <p>Completed</p>
            <h2>
              {books.filter((b) => b.status === "Completed").length}
            </h2>
          </div>
        </article>
      </section>
      
<section className="reading-analytics">
  <div className="analytics-heading">
    <div>
      <h2>Reading Analytics</h2>
      <p>A little insight into your reading journey.</p>
    </div>
  </div>

  <div className="analytics-grid">
    <article className="analytics-card">
      <div className="analytics-card-top">
        <span>📚</span>
        <span>{books.length} books</span>
      </div>
      <h3>Books by Status</h3>

      {[
        {
          label: "Want to Read",
          count: books.filter((b) => b.status === "Want to Read").length,
          color: "#7c9b83",
        },
        {
          label: "Currently Reading",
          count: books.filter((b) => b.status === "Currently Reading").length,
          color: "#d4a84f",
        },
        {
          label: "Completed",
          count: books.filter((b) => b.status === "Completed").length,
          color: "#07865d",
        },
      ].map((item) => (
        <div className="analytics-bar-item" key={item.label}>
          <div className="analytics-bar-label">
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </div>
          <div className="analytics-track">
            <div
              className="analytics-fill"
              style={{
                width: `${
                  books.length ? (item.count / books.length) * 100 : 0
                }%`,
                background: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </article>

    <article className="analytics-card">
      <div className="analytics-card-top">
        <span>📖</span>
        <span>Overall</span>
      </div>
      <h3>Reading Progress</h3>

      <div className="overall-progress">
        <div
          className="overall-progress-ring"
          style={{
            background: `conic-gradient(
              #07865d ${
                books.length
                  ? books.reduce((sum, book) => {
                      const progress =
                        book.status === "Completed"
                          ? 100
                          : book.total_pages > 0
                            ? Math.min(
                                100,
                                (book.current_page / book.total_pages) * 100
                              )
                            : 0;
                      return sum + progress;
                    }, 0) / books.length
                  : 0
              }%,
              #e9e5da 0
            )`,
          }}
        >
          <div className="overall-progress-inner">
            <strong>
              {books.length
                ? Math.round(
                    books.reduce((sum, book) => {
                      const progress =
                        book.status === "Completed"
                          ? 100
                          : book.total_pages > 0
                            ? Math.min(
                                100,
                                (book.current_page / book.total_pages) * 100
                              )
                            : 0;
                      return sum + progress;
                    }, 0) / books.length
                  )
                : 0}%
            </strong>
            <span>Average</span>
          </div>
        </div>
      </div>

      <p className="analytics-description">
        Average reading progress across your personal library.
      </p>
    </article>

    <article className="analytics-card">
      <div className="analytics-card-top">
        <span>🏷️</span>
        <span>{new Set(books.map((b) => b.genre).filter(Boolean)).size} genres</span>
      </div>
      <h3>Books by Genre</h3>

      {Object.entries(
        books.reduce((counts, book) => {
          const name = book.genre || "Uncategorized";
          counts[name] = (counts[name] || 0) + 1;
          return counts;
        }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => (
          <div className="analytics-bar-item" key={name}>
            <div className="analytics-bar-label">
              <span>{name}</span>
              <strong>{count}</strong>
            </div>
            <div className="analytics-track">
              <div
                className="analytics-fill"
                style={{
                  width: `${(count / books.length) * 100}%`,
                  background: "#7c9b83",
                }}
              />
            </div>
          </div>
        ))}

      {books.length === 0 && (
        <p className="analytics-description">
          Add books to see your genre breakdown.
        </p>
      )}
    </article>
  </div>
</section>


      <section className="my-books-library">
        <div className="library-heading">
          <div>
            <h2>Your collection</h2>
            <p>All the stories in one place.</p>
          </div>
          <span className="book-count">
            {filteredBooks.length} books
          </span>
        </div>

        <div className="book-filters">
          <input
            type="search"
            placeholder="Search by title or author..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={genreFilter}
            onChange={(event) => setGenreFilter(event.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre === "All" ? "All genres" : genre}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {message && (
          <p role="status" className="my-books-message">
            {message}
          </p>
        )}

        {loading ? (
          <p>Loading your books...</p>
        ) : filteredBooks.length === 0 ? (
          <div className="empty-library">
            <div className="empty-library-icon">📚</div>
            <h3>
              {books.length === 0
                ? "Your library is waiting!"
                : "No books found"}
            </h3>
            <p>
              {books.length === 0
                ? "Add your first book to get started."
                : "Try changing your search or filters."}
            </p>
            {books.length === 0 && (
              <Link to="/add-book" className="add-book-button">
                + Add Your First Book
              </Link>
            )}
          </div>
        ) : (
          <div className="my-books-grid">
            {filteredBooks.map((book) => (
              <article className="my-book-card" key={book.id}>
                {editingId === book.id ? (
                  <form
                    className="book-details edit-book-form"
                    onSubmit={saveEdit}
                  >
                    <h3>Edit book</h3>

                    <label>Title</label>
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                    />

                    <label>Author</label>
                    <input
                      name="author"
                      value={editForm.author}
                      onChange={handleEditChange}
                      required
                    />

                    <label>Genre</label>
                    <input
                      name="genre"
                      value={editForm.genre}
                      onChange={handleEditChange}
                      required
                    />

                    <label>Status</label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                    >
                      <option>Want to Read</option>
                      <option>Currently Reading</option>
                      <option>Completed</option>
                    </select>

                    <label>Total pages</label>
                    <input
                      type="number"
                      min="0"
                      name="total_pages"
                      value={editForm.total_pages}
                      onChange={handleEditChange}
                    />

                    <label>Pages read</label>
                    <input
                      type="number"
                      min="0"
                      name="current_page"
                      value={editForm.current_page}
                      onChange={handleEditChange}
                    />

                    <label>Notes</label>
                    <textarea
                      name="notes"
                      value={editForm.notes}
                      onChange={handleEditChange}
                      rows="3"
                    />

                    <button type="submit" className="book-action-button">
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="delete-book-button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="book-cover">
                      {isImageUrl(book.cover) ? (
                        <img
                          className="book-cover-image"
                          src={book.cover}
                          alt={`Cover of ${book.title}`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="book-cover-emoji">
                          {book.cover || "📚"}
                        </span>
                      )}

                      <span
                        className={`book-status ${
                          book.status === "Completed"
                            ? "status-completed"
                            : book.status === "Currently Reading"
                              ? "status-reading"
                              : "status-wishlist"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>

                    <div className="book-details">
                      <p className="book-genre">{book.genre}</p>
                      <h3>{book.title}</h3>
                      <p className="book-author">by {book.author}</p>

                      <div className="reading-progress">
                        <div className="progress-label">
                          <span>Reading progress</span>
                          <strong>{progressFor(book)}%</strong>
                        </div>

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${progressFor(book)}%` }}
                          />
                        </div>

                        <p className="pages-read">
                          {book.current_page} / {book.total_pages || "—"} pages
                        </p>
                      </div>

                      {book.notes && (
                        <p className="book-notes">{book.notes}</p>
                      )}

                      <button
                        type="button"
                        className="book-action-button"
                        onClick={() => startEditing(book)}
                      >
                        Edit Book
                      </button>

                      <button
                        type="button"
                        className="delete-book-button"
                        onClick={() => handleDelete(book)}
                      >
                        Delete Book
                      </button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyBooks;
