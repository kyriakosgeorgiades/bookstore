import React, { useState, useContext, useEffect } from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import BookGrid from "../../assets/BookGrid/BookGrid";
import Navbar from "../../assets/Navbar";
import { getBooksSearch } from "../../services/books-https-service";
import { Book, BookResponseDto } from "../../Dto/Books/Response/GetBookResponse";
import SaveBookDialog from "../Dialogs/SaveBookDialog/SaveBookDialog ";


interface AddBookProps {
  userLoggedIn: boolean;
}

const AddBook: React.FC<AddBookProps> = ({ userLoggedIn }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);


  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleSaveNewBook = (newBook: Book) => {
    console.log("New book to save:", newBook);
    setIsAddDialogOpen(false);
  };

  return (
    <div>
      <Navbar />
      <BookGrid books={books} userLoggedIn={true} />

      {/* Floating "+" button */}
      {userLoggedIn && (
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleOpenAddDialog}
        >
          <Add />
        </Fab>
      )}

      {/* Add Book Dialog */}
      <SaveBookDialog
        open={isAddDialogOpen}
        book={null}
        onClose={handleCloseAddDialog}
        onSave={handleSaveNewBook}
      />
    </div>
  );
};

export default AddBook;
