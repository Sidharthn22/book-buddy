const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export async function getBooks() {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export async function createBook(book) {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to add book");
  }

  return response.json();
}

export async function updateBook(id, book) {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update book");
  }

  return response.json();
}

export async function deleteBook(id) {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  return response.json();
}
