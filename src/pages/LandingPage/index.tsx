import { useState, useContext, useEffect } from "react";
import LoadingContext from "../../Context/loadingContext";
import BookGrid from "../../assets/BookGrid/BookGrid";

import Navbar from "../../assets/Navbar";
import { getBooksSearch, saveBook } from "../../services/books-https-service";
import { Book } from "../../Dto/Books/Response/GetBookResponse";
import SaveBookDialog from "../../assets/Dialogs/SaveBookDialog/SaveBookDialog ";
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { AuthContext } from "../../Providers/AuthContext";
import { BookSaveRequestDto, AuthorDto } from "../../Dto/Books/Request/BookSaveRequestDto";
import { showToast } from "../../helpers/toastHelper";

const LandingPage = () => {
    const [books, setBooks] = useState<Book[]>([]); // <-- State for books
    const { isLoading, setLoading } = useContext(LoadingContext);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const auth = useContext(AuthContext);
    if (!auth) {
       throw new Error("useAuth must be used within an AuthProvider");
     }
   
     const { isAuthenticated } = auth;

     const handleOpenAddDialog = () => {
      setIsAddDialogOpen(true);
    };
  
    const handleCloseAddDialog = () => {
      setIsAddDialogOpen(false);
    };
  
    const handleSaveNewBook = async (newBook: Book) => {
      const bookDto = new BookSaveRequestDto();
    

      bookDto.bookid = undefined;
      bookDto.bookName = newBook.bookName;
      bookDto.isbn = newBook.isbn;
      bookDto.publicationYear = newBook.publicationYear;
  
      bookDto.author = new AuthorDto();
      bookDto.author.authorId = undefined;
      bookDto.author.authorName = newBook.author.authorName; 
      
      await saveBook(bookDto, setLoading);
      fetchBooks()
      showToast("Book Saved!", "success");
      setIsAddDialogOpen(false);
    };

    const fetchBooks = async () => {
      try {
          const response = await getBooksSearch('',setLoading)
          if (response && response.data) {

              setBooks(response.data.books || []);
          }
          console.log(books)
      } catch (error) {
          console.error("Failed to fetch books:", error);
      }
  };
    useEffect(() => {
        fetchBooks();
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    const handleBookSaved = () => {
      fetchBooks(); // Refetch the books after a book is saved
    };
    return (
        <div>
            <Navbar />
            <BookGrid books={books} userLoggedIn={true}  onBookSaved={handleBookSaved}/> 
                  {/* Floating "+" button */}
      {isAuthenticated && (
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
          onClose={handleCloseAddDialog}
          onSave={handleSaveNewBook} book={null}      />
        </div>
    );
}

export default LandingPage;

