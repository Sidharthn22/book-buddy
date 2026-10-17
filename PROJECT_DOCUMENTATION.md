# Book Buddy – Project Documentation

## 1. Project Overview

Book Buddy is a full-stack web application that helps users organise their personal book collection, discover books, track reading progress, and monitor reading habits.

## 2. Objectives

- Maintain a personal book library.
- Discover books using the Open Library API.
- Track reading status and progress.
- Add personal notes to books.
- View reading statistics and genre-based analytics.

## 3. Technologies Used

- **Frontend:** React.js, Vite, HTML, CSS, JavaScript
- **Backend:** Python, FastAPI
- **Database:** SQLite
- **ORM:** SQLAlchemy
- **External API:** Open Library API
- **Version Control:** Git and GitHub

## 4. Main Features

### Home Dashboard
Displays reading statistics and provides quick access to the application's main sections.

### Browse Books
Allows users to search for books using the Open Library API and add selected books to their library.

### My Books
Displays saved books and supports searching, filtering, updating reading status, tracking progress, and managing personal notes.

### Add Book
Allows users to add book details, including title, author, genre, and reading status.

### Reading Analytics
Shows reading statistics, progress summaries, and genre-based information to help users understand their reading habits.

## 5. System Architecture

The React frontend communicates with the FastAPI backend through REST API requests. The backend uses SQLAlchemy to interact with the SQLite database. The Open Library API provides book information for the browsing feature.

## 6. Database

SQLite is used to store book records. Book information includes details such as title, author, genre, reading status, reading progress, and personal notes.

## 7. Installation and Setup

### Prerequisites
- Python
- Node.js and npm
- Git

### Backend Setup

Open a terminal in the project directory and run:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The API documentation is available at `http://127.0.0.1:8000/docs`.

### Frontend Setup

Open a second terminal in the project root directory and run:

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal to use the application.

## 8. Testing

The main application workflows include searching for books, adding books, updating reading status and progress, saving notes, and viewing reading statistics.

## 9. Future Enhancements

- User authentication and individual libraries.
- Cloud deployment.
- Reading goals and reminders.
- Additional book recommendations.

## 10. Project Repository

GitHub: https://github.com/Sidharthn22/book-buddy

## 11. Conclusion

Book Buddy demonstrates the development of a full-stack web application using React, FastAPI, and SQLite. It brings book management, reading progress tracking, and reading analytics together in one application.
