import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Book } from '../../../Dto/Books/Response/GetBookResponse';


interface SaveBookDialogProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const SaveBookDialog: React.FC<SaveBookDialogProps> = ({ book, open, onClose, onSave }) => {
  const [editedBook, setEditedBook] = React.useState<Book>(book!);

  useEffect(() => {
    if (!open) {
      setEditedBook(book!);
    }
  }, [open, book]);

  const handleChange = (field: keyof Book) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBook((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    const newDate = new Date(editedBook.publicationYear);
    newDate.setFullYear(year);
    setEditedBook((prev) => ({
      ...prev,
      publicationYear: newDate,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{book!.bookId ? 'Edit Book' : 'Add New Book'}</DialogTitle>
      <DialogContent>
        <TextField label="Name" value={editedBook.bookName} onChange={handleChange('bookName')} fullWidth sx={{ mb: 2, mt:2 }} />
        <TextField label="Author" value={editedBook.author} onChange={handleChange('author')} fullWidth sx={{ mb: 2 }} />
        <TextField label="ISBN" value={editedBook.isbn} onChange={handleChange('isbn')} fullWidth sx={{ mb: 2 }} />
        <TextField
          label="Publication Year"
          type="number"
          value={new Date(editedBook.publicationYear).getFullYear()}
          onChange={handleYearChange}
          fullWidth
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(editedBook)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveBookDialog;
