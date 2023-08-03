import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { AuthContext } from '../../Providers/AuthContext';
import { Book } from '../../Dto/Books/Response/GetBookResponse';
import EditBookDialog from '../Dialogs/SaveBookDialog/SaveBookDialog ';



interface BookCardProps {
  book: Book;
  userLoggedIn: boolean; // this will be used to control the visibility of the icons
}

const BookCard: React.FC<BookCardProps> = ({ book, userLoggedIn }) => {
  const auth = useContext(AuthContext);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuthenticated } = auth;

  const handleSave = (book: Book) => {
    // Here you can implement the logic to save the updated book
    console.log(book);
    setIsEditOpen(false);
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
          {/* For Delete button you can add similar logic */}
          <IconButton aria-label="delete" size="small">
            <Delete />
          </IconButton>
        </Box>
      )}

      <EditBookDialog 
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        book={editedBook || book} 
        onSave={handleSave} 
      />
    </Card>
  );
};

export default BookCard;
