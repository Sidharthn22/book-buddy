
from sqlalchemy import Column, Integer, String, Text
from database import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    author = Column(String(150), nullable=False)
    genre = Column(String(80), nullable=False)
    status = Column(String(50), default="Want to Read")
    total_pages = Column(Integer, default=0)
    current_page = Column(Integer, default=0)
    notes = Column(Text, default="")
    cover = Column(String(20), default="📚")
