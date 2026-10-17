# 📚 Book Buddy — Personal Reading Tracker

Book Buddy is a full-stack web application that helps readers organise their personal book collection, track reading progress, discover books, and analyse their reading habits through a clean and user-friendly interface.

## ✨ Features

- **Dashboard:** View reading information and completed books.
- **Book Management:** Add, view, edit, and delete books in your collection.
- **Browse Books:** Search and discover books using the Open Library API.
- **Reading Progress:** Track reading status, current pages, total pages, and completion percentage.
- **Reading Analytics:** View reading statistics, average progress, and books by genre.
- **Personal Notes:** Store personal notes about books.
- **Book Covers:** Display book cover images when available.
- **Responsive UI:** A clean, reader-friendly interface.

## 🖼️ Screenshots

### Home / Dashboard

![Book Buddy Home](public/screenshots/home.png)

### Browse Books

![Browse Books](public/screenshots/browse-books.png)

### My Books and Reading Analytics

![My Books and Analytics](public/screenshots/my-books.png)

### Add a New Book

![Add a Book](public/screenshots/add-book.png)

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Python
- FastAPI
- SQLAlchemy

### Database
- SQLite

### External API
- [Open Library API](https://openlibrary.org/developers/api)

### Version Control
- Git
- GitHub

## 📂 Project Structure

```text
book-buddy/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
├── public/
│   ├── image/
│   └── screenshots/
│       ├── home.png
│       ├── browse-books.png
│       ├── my-books.png
│       └── add-book.png
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── api.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

Install the following software before running the project:

- Python 3
- Node.js and npm
- Git

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Sidharthn22/book-buddy.git
cd book-buddy
```

### 2. Set Up the Backend

From the project root, run:

```powershell
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

The backend will run at:

`http://127.0.0.1:8000`

Interactive API documentation is available at:

`http://127.0.0.1:8000/docs`

### 3. Set Up the Frontend

Open a **second terminal** in the project root, where `package.json` is located.

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173`

Ensure the frontend API URL points to the running backend.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/books` | Retrieve all books |
| POST | `/books` | Add a new book |
| PUT | `/books/{book_id}` | Update an existing book |
| DELETE | `/books/{book_id}` | Delete a book |

## 🧪 Testing

The following operations can be tested:

- Add a book and verify that it appears in the collection.
- Update book details and reading progress.
- Delete a book.
- Search for books through the Browse Books page.
- View reading statistics and completed books.
- Check backend responses using the FastAPI interactive documentation.

## 🔮 Future Improvements

- User authentication and private book collections.
- Reading goals and reminders.
- Additional reading charts.
- Cloud database integration.
- AI-powered book recommendations.

## 👨‍💻 Author

**Sidharth N.**

GitHub: [Sidharthn22](https://github.com/Sidharthn22)

## 📄 Project Information

Developed as part of the **Full Stack (Fresher) coding assignment for SayOne Technologies**.
