
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import Book
from schemas import BookCreate, BookUpdate, BookResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Book Buddy API")


import os

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        os.getenv("FRONTEND_URL", ""),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Book Buddy API is running"}

@app.get("/books", response_model=list[BookResponse])
def get_books(db: Session = Depends(get_db)):
    return db.query(Book).order_by(Book.id.desc()).all()

@app.post("/books", response_model=BookResponse, status_code=201)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    if book.total_pages > 0 and book.current_page > book.total_pages:
        raise HTTPException(400, "Pages read cannot exceed total pages")

    new_book = Book(**book.model_dump())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@app.put("/books/{book_id}", response_model=BookResponse)
def update_book(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    existing = db.query(Book).filter(Book.id == book_id).first()
    if not existing:
        raise HTTPException(404, "Book not found")

    if book.total_pages > 0 and book.current_page > book.total_pages:
        raise HTTPException(400, "Pages read cannot exceed total pages")

    for key, value in book.model_dump().items():
        setattr(existing, key, value)

    db.commit()
    db.refresh(existing)
    return existing

@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(404, "Book not found")

    db.delete(book)
    db.commit()
    return {"message": "Book deleted successfully"}
