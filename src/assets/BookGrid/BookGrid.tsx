import React from "react";
import { Grid, Container } from "@mui/material";
import BookCard from "../BookCard";
import { Book } from "../../Dto/Books/Response/GetBookResponse";

interface BookGridProps {
  books: Book[];
  userLoggedIn: boolean;
  onBookSaved: () => void;
}

const BookGrid: React.FC<BookGridProps> = ({
  books,
  userLoggedIn,
  onBookSaved,
}) => {
  console.log(books);
  return (
    <Container style={{ padding: "120px 0" }}>
      <Grid container spacing={4} justifyContent="center">
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Grid container justifyContent="center">
              <BookCard
                book={book}
                userLoggedIn={userLoggedIn}
                onBookSaved={onBookSaved}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookGrid;
