# Book Buddy — Personal Reading Tracker

Book Buddy is a full-stack web application that helps readers organise their book collection, track reading progress, discover books, and view reading statistics.

## Features

- **Dashboard:** View reading information and completed books.
- **Book Management:** Add, view, edit, and delete books.
- **Browse Books:** Search for books using the Open Library API.
- **Reading Progress:** Track reading status, pages read, and completion percentage.
- **Reading Analytics:** View reading statistics, average progress, and books by genre.
- **Personal Notes:** Store personal notes about books.
- **Responsive UI:** A clean, reader-friendly interface.

## Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Backend**
- Python
- FastAPI
- SQLAlchemy

**Database**
- SQLite

**External API**
- Open Library API

**Version Control**
- Git and GitHub

## Project Structure

```text
book-buddy/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── api.js
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3
- Node.js and npm

### 1. Clone the Repository

```bash
git clone https://github.com/Sidharthn22/book-buddy.git
cd book-buddy
```

### 2. Set Up the Backend

Open a terminal in the project root and run:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The backend will run at `http://127.0.0.1:8000`.

API documentation is available at `http://127.0.0.1:8000/docs`.

### 3. Set Up the Frontend

Open a second terminal in the project root and run:

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

Make sure the frontend API URL is configured to point to the running backend.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/books` | Retrieve books |
| POST | `/books` | Add a book |
| PUT | `/books/{book_id}` | Update a book |
| DELETE | `/books/{book_id}` | Delete a book |

## Future Improvements

- User authentication and private book collections
- Reading goals and reminders
- Additional reading charts
- Cloud database integration

## Author

**Sidharth N.**

GitHub: [Sidharthn22](https://github.com/Sidharthn22)

## Project Information

Developed as part of the Full Stack (Fresher) coding assignment for SayOne Technologies.
