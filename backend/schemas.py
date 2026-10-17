
from pydantic import BaseModel, ConfigDict, Field

class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    author: str = Field(min_length=1, max_length=150)
    genre: str = Field(min_length=1, max_length=80)
    status: str = "Want to Read"
    total_pages: int = Field(default=0, ge=0)
    current_page: int = Field(default=0, ge=0)
    notes: str = ""
    cover: str = "📚"

class BookUpdate(BookCreate):
    pass

class BookResponse(BookCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
