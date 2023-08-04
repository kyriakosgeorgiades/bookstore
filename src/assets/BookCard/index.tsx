import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { AuthContext } from '../../Providers/AuthContext';
import { Book } from '../../Dto/Books/Response/GetBookResponse';
import EditBookDialog from '../Dialogs/SaveBookDialog/SaveBookDialog ';
import { BookSaveRequestDto, AuthorDto } from '../../Dto/Books/Request/BookSaveRequestDto';
import { deleteBook, saveBook } from '../../services/books-https-service';
import LoadingContext from '../../Context/loadingContext';
import { showToast } from '../../helpers/toastHelper';
import SaveBookDialog from '../Dialogs/SaveBookDialog/SaveBookDialog ';
import DeleteBookDialog from '../Dialogs/DeleteBookDialog/DeleteBookDialog ';



interface BookCardProps {
  book: Book;
  userLoggedIn: boolean;
  onBookSaved: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, userLoggedIn, onBookSaved}) => {
  const auth = useContext(AuthContext);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const {isLoading, setLoading} = useContext(LoadingContext)

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuthenticated } = auth;

  const handleSave = async (newBook: Book) => {
    const bookDto = new BookSaveRequestDto();
    

    bookDto.bookid = newBook.bookId;
    bookDto.bookName = newBook.bookName;
    bookDto.isbn = newBook.isbn;
    bookDto.publicationYear = newBook.publicationYear;

    bookDto.author = new AuthorDto();
    bookDto.author.authorId = newBook.author.authorId;
    bookDto.author.authorName = newBook.author.authorName; 
    
    await saveBook(bookDto, setLoading);
    onBookSaved();
    showToast("Book Saved!", "success");
    setIsEditOpen(false);
  }

  const handleDeleteConfirm = async (bookId: string) => {
    debugger
    await deleteBook(bookId, setLoading); 
    showToast("Book Deleted!", "success");
    onBookSaved();
    setIsDeleteOpen(false);
  }
  

  return (
    <Card sx={{ position: 'relative', width: 250 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.bookUrl}
        alt={book.bookName}
      />
      <CardContent>
        <Typography variant="h6">{book.bookName}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{book.author.authorName}</Typography>
        <Typography variant="body2" color="textSecondary">{book.isbn}</Typography>
        <Typography variant="body2" color="textSecondary">{new Date(book.publicationYear).getFullYear()}</Typography>
      </CardContent>

      {isAuthenticated && (
        <Box sx={{ position: 'absolute', bottom: 5, right: 5 }}>
          <IconButton aria-label="edit" size="small" onClick={() => { setIsEditOpen(true); setEditedBook(book); }}>
            <Edit />
          </IconButton>
  
          <IconButton aria-label="delete" size="small" onClick={() => setIsDeleteOpen(true)}>
  <Delete />
</IconButton>

        </Box>
      )}

      <SaveBookDialog 
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        book={editedBook || book} 
        onSave={handleSave} 
      />

<DeleteBookDialog 
  bookName={book.bookName}
  bookId={book.bookId}
  open={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  onConfirm={handleDeleteConfirm}
/>
    </Card>
  );
};

export default BookCard;
