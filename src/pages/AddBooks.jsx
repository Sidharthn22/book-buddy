
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../api";
import "./AddBooks.css";

function AddBook() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const totalPages = Number(formData.get("totalPages")) || 0;
    const currentPage = Number(formData.get("currentPage")) || 0;
    const selectedStatus = formData.get("status");

    if (totalPages > 0 && currentPage > totalPages) {
      setMessage("Pages read cannot exceed total pages.");
      return;
    }

    const statusLabels = {
      wishlist: "Want to Read",
      reading: "Currently Reading",
      completed: "Completed",
    };

    const status = statusLabels[selectedStatus];
    const actualCurrentPage =
      status === "Completed" && totalPages > 0
        ? totalPages
        : currentPage;

    const book = {
      title: formData.get("title").trim(),
      author: formData.get("author").trim(),
      genre: formData.get("genre"),
      status,
      total_pages: totalPages,
      current_page: actualCurrentPage,
      notes: formData.get("notes").trim(),
      cover: "📚",
    };

    setSaving(true);

    try {
      await createBook(book);
      setMessage("Book saved successfully!");

      form.reset();

      setTimeout(() => {
        navigate("/my-books");
      }, 800);
    } catch (error) {
      setMessage(error.message || "Could not save the book.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="add-book-page">
      <div className="add-book-heading">
        <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
        <h1>
          Add a new <span>book.</span>
        </h1>
        <p>Every great journey begins with a single page.</p>
      </div>

      <div className="add-book-layout">
        <section className="add-book-card">
          <div className="form-heading">
            <span>📚</span>
            <div>
              <h2>Book details</h2>
              <p>Enter the details of the book you want to track.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Book title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Atomic Habits"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="e.g. James Clear"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select id="genre" name="genre" required>
                  <option value="">Choose a genre</option>
                  <option value="Self-help">Self-help</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science fiction">Science fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Biography">Biography</option>
                  <option value="Business">Business</option>
                  <option value="History">History</option>
                  <option value="Education">Education</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Reading status</label>
                <select id="status" name="status" required>
                  <option value="wishlist">Want to read</option>
                  <option value="reading">Currently reading</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="totalPages">Total pages</label>
                <input
                  type="number"
                  id="totalPages"
                  name="totalPages"
                  min="0"
                  placeholder="e.g. 320"
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentPage">Pages read</label>
                <input
                  type="number"
                  id="currentPage"
                  name="currentPage"
                  min="0"
                  placeholder="e.g. 50"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Personal notes</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Why do you want to read this book?"
                rows="3"
              />
            </div>

            {message && (
              <p role="status" className="form-message">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="save-book-button"
              disabled={saving}
            >
              {saving ? "Saving..." : "+ Add to My Library"}
            </button>
          </form>
        </section>

        <aside className="add-book-tip">
          <div className="tip-illustration">🦉</div>
          <p className="eyebrow">A LITTLE READING WISDOM</p>
          <h2>One book can change your perspective.</h2>
          <p>
            Add the books that inspire you, challenge you, and take
            you somewhere new.
          </p>
          <div className="tip-divider" />
          <p>📖 Your next chapter starts here.</p>
        </aside>
      </div>
    </main>
  );
}

export default AddBook;
