import { useState, useContext, useEffect } from "react";
import LoadingContext from "../../Context/loadingContext";
import BookGrid from "../../assets/BookGrid/BookGrid";

import Navbar from "../../assets/Navbar";
import { getBooksSearch } from "../../services/books-https-service";
import { Book, BookResponseDto } from "../../Dto/Books/Response/GetBookResponse";
import SaveBookDialog from "../../assets/Dialogs/SaveBookDialog/SaveBookDialog ";
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { AuthContext } from "../../Providers/AuthContext";

const LandingPage = () => {
    const [books, setBooks] = useState<Book[]>([]); // <-- State for books
    const { isLoading, setLoading } = useContext(LoadingContext);
    const auth = useContext(AuthContext);
    if (!auth) {
       throw new Error("useAuth must be used within an AuthProvider");
     }
   
     const { isAuthenticated } = auth;


    useEffect(() => {
        console.log(books);
        // Define an async function within the useEffect
        const fetchBooks = async () => {
            try {
                const response = await getBooksSearch('',setLoading)
                if (response && response.data) {
                    debugger

                    setBooks(response.data.books || []);
                }
                console.log(books)
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };

        // Call the async function
        fetchBooks();
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    return (
        <div>
            <Navbar />
            <BookGrid books={books} userLoggedIn={true} /> 
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
        onSave={handleSaveNewBook}
        newEntry={true} // Pass the "newEntry" prop to indicate it's for a new entry
      />
        </div>
    );
}

export default LandingPage;

