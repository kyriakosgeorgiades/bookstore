import React, { useState, useContext, useEffect } from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import BookGrid from "../../assets/BookGrid/BookGrid";
import Navbar from "../../assets/Navbar";
import { getBooksSearch, saveBook } from "../../services/books-https-service";
import {
  Book,
  BookResponseDto,
} from "../../Dto/Books/Response/GetBookResponse";
import SaveBookDialog from "../Dialogs/SaveBookDialog/SaveBookDialog ";
import LoadingContext from "../../Context/loadingContext";
import {
  AuthorDto,
  BookSaveRequestDto,
} from "../../Dto/Books/Request/BookSaveRequestDto";

interface AddBookProps {
  userLoggedIn: boolean;
  onBookSaved: () => void;
}

const AddBook: React.FC<AddBookProps> = ({ userLoggedIn, onBookSaved }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, setLoading } = useContext(LoadingContext);

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleSaveNewBook = async (newBook: Book) => {
    setIsAddDialogOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100vh"}}>
        <BookGrid books={books} userLoggedIn={true} onBookSaved={onBookSaved} />

        {/* Floating "+" button */}
        {userLoggedIn && (
          <div style={{ alignSelf: "flex-end", padding: 16 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleOpenAddDialog}
            >
              <Add />
            </Fab>
          </div>
        )}
      </div>
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
