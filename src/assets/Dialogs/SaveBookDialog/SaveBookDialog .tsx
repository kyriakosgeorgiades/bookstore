import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import LoadingContext from "../../../Context/loadingContext";
import { BookSaveRequestDto } from "../../../Dto/Books/Request/BookSaveRequestDto";
import { Book } from "../../../Dto/Books/Response/GetBookResponse";

interface SaveBookDialogProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const defaultBook = {
  bookId: "",
  bookName: "",
  isbn: "",
  bookUrl:
    "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  publicationYear: new Date(),
  author: {
    authorId: null,
    authorName: "",
  },
};

const SaveBookDialog: React.FC<SaveBookDialogProps> = ({
  book,
  open,
  onClose,
  onSave,
}) => {
  const { isLoading, setLoading } = useContext(LoadingContext);
  const [formData, setFormData] = useState(book || defaultBook);
  const [errors, setErrors] = useState<{
    bookName?: string;
    authorName?: string;
    isbn?: string;
    publicationYear?: string;
  }>({});
  const [previousAuthorName, setPreviousAuthorName] = useState(
    (book && book.author.authorName) || ""
  );

  useEffect(() => {
    if (book && book.author.authorName !== previousAuthorName) {
      setPreviousAuthorName(book.author.authorName);
    }
    if (!open) {
      setFormData(book || defaultBook);
    }
  }, [open, book, previousAuthorName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData: any) => ({
        ...prevData,
        [parent]: { ...prevData[parent], [child]: value },
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    const newDate = new Date(formData.publicationYear);
    newDate.setFullYear(year);
    setFormData((prev: any) => ({
      ...prev,
      publicationYear: newDate,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    let validationErrors = {};

    // Validation
    if (!formData.bookName) {
      validationErrors = {
        ...validationErrors,
        bookName: "Book name is required",
      };
    }

    if (!formData.author.authorName) {
      validationErrors = {
        ...validationErrors,
        authorName: "Author name is required",
      };
    }

    if (!formData.isbn) {
      validationErrors = { ...validationErrors, isbn: "ISBN is required" };
    }

    if (!formData.publicationYear) {
      validationErrors = {
        ...validationErrors,
        publicationYear: "Publication Year is required",
      };
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } 
      // Check if the previous author doesn't match the new one
  if (previousAuthorName.toLowerCase() !== formData.author.authorName.toLowerCase()) {
    formData.author.authorId = undefined;
  }

  onSave(formData as Book); 

  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {book && book.bookId ? "Edit Book" : "Add New Book"}
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            label="Name"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2, mt: 2 }}
            error={!!errors.bookName}
            helperText={errors.bookName}
          />
          <TextField
            label="Author"
            name="author.authorName"
            value={formData.author.authorName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            error={!!errors.authorName}
            helperText={errors.authorName}
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            error={!!errors.isbn}
            helperText={errors.isbn}
          />
          <TextField
            label="Publication Year"
            type="number"
            name="publicationYear"
            value={new Date(formData.publicationYear).getFullYear()}
            onChange={handleYearChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            error={!!errors.publicationYear}
            helperText={errors.publicationYear}
          />
        </DialogContent>

        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SaveBookDialog;
