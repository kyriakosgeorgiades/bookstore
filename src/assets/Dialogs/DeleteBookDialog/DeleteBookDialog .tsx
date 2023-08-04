// DeleteBookDialog.tsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteBookDialogProps {
  bookName: string;
  bookId: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (bookId: string) => void;
}

const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
  bookName,
  bookId,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the book &quot;{bookName}&quot;?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(bookId)} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBookDialog;
