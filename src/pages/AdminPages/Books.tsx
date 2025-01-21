import { useId, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import StyledTable from '../Components/Table';
import { AssignedBook, Book, GlobalState } from '../../interface';
import ConfirmationDialogue from '../Components/DeleteDialogue';
import { createBook, deleteBook, editBook } from '../../redux/Slice/BookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PageWrapper } from '../Components/common';
import moment from 'moment';
import { toast } from 'react-toastify';

const Books = () => {
  const dispatch = useDispatch();
  const store: GlobalState = useSelector((store: any) => store);
  const [open, setOpen] = useState(false);
  const [deleteBookDialogue, setDeleteBookDialogue] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState("");
  const [bookDetails, setBookDetails] = useState<Book>({
    id: "",
    title: '',
    description: '',
    quantity: '',
    author: '',
  });
  const [errors, setErrors] = useState<any>({});

  const columns = [
    { field: 'title', headerName: 'Title' },
    { field: 'description', headerName: 'Description' },
    { field: 'quantity', headerName: 'Available Quantity', align: 'center' },
    { field: 'author', headerName: 'Author' },
  ];

  const handleOpen = (book: Book | null = null) => {
    const bookDetails = store.book?.books?.find(bookData => bookData.id === book?.id);
    if (book?.quantity && bookDetails?.quantity) {
      book.quantity = bookDetails?.quantity.toString() || "";
    }
    setBookDetails(book || { id: "", title: '', description: '', quantity: '', author: '' });
    setErrors({} as Book);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const validateForm = () => {
    const newErrors = {} as Book;
    if (!bookDetails.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!bookDetails.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!bookDetails.quantity || Number(bookDetails.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    if (!bookDetails.author.trim()) {
      newErrors.author = 'Author name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const isEditBook = bookDetails.id;
      if (isEditBook) {
        dispatch(editBook(bookDetails))
      } else {
        const payload: Book = { ...bookDetails };
        dispatch(createBook(payload))
      }
      handleClose();
    }
  };

  const handleDelete = (deleteBookId: string) => {
    toggleDeleteBookPrompt();
    setDeleteBookId(deleteBookId)
  };

  const handleDeleteBook = () => {
    if(deleteBookId) {
      // if book is assign to any student then don't delete that book from records
      const assignedBooks = JSON.parse(JSON.stringify(store.assignBook.assignedBooks)) as AssignedBook[];
      
      const isBookAssignedToStudent = assignedBooks.find(assignBook => assignBook.book === deleteBookId)
      if(isBookAssignedToStudent) {
        toast.error("You can't delete this book because it's assigned to a student")
      } else {
        dispatch(deleteBook(deleteBookId));
      }
      toggleDeleteBookPrompt();
    }
  };

  const handleChange = (e: any) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const toggleDeleteBookPrompt = () => {
    setDeleteBookDialogue(!deleteBookDialogue)
  }

  // display available books logic
  let availableBooks = JSON.parse(JSON.stringify(store.book.books)) as Book[];
  let assignedBooks = JSON.parse(JSON.stringify(store.assignBook.assignedBooks)) as AssignedBook[];
  let today = moment();
  availableBooks = availableBooks.map(availableBook => {
    // if any book is assigned between issue and return date then remove that count total quanity of book;
    const assignedBooksToStudent = assignedBooks.filter(assignBook =>
      assignBook.book === availableBook.id &&
      (moment(assignBook.returnDate)).diff(today, 'days') >= 0
    );

    let assignedBooksCount = assignedBooksToStudent?.length || 0;
    availableBook.quantity = (Number(availableBook.quantity) - assignedBooksCount).toString();
    return availableBook;
  })
  return (
    <PageWrapper>
      <div className='space-between mb'>
        <Typography variant="h4" className='textColor'>Books</Typography>
        <Button variant="contained" className='btn-color' onClick={() => handleOpen()}>
          Add Book
        </Button>
      </div>

      {/* Book listing */}
      <StyledTable
        columns={columns}
        data={availableBooks}
        onEdit={handleOpen}
        onDelete={handleDelete}
      />

      {/* Dialog for Add/Edit Book */}
      <Dialog maxWidth={"xs"} open={open} onClose={handleClose}>
        <DialogTitle><span className='align-item-center textColor'>{bookDetails.id ? 'Edit Book' : 'Add Book'}</span></DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={bookDetails.description}
            onChange={handleChange}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            type="number"
            value={bookDetails.quantity}
            onChange={handleChange}
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <TextField
            margin="dense"
            label="Author"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            fullWidth
            error={!!errors.author}
            helperText={errors.author}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant='contained' color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant='contained' className='btn-color'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Book Dialog */}
      {deleteBookDialogue &&
        <ConfirmationDialogue
          open={deleteBookDialogue}
          title='Delete Book'
          body='Are you sure you want to delete this book?'
          cancelBtnText='Cancel'
          cancelBtnClick={() => toggleDeleteBookPrompt()}
          confirmBtnText='Delete'
          confirmBtnClick={() => handleDeleteBook()}
          closeDialogue={() => toggleDeleteBookPrompt()}
        />
      }
    </PageWrapper>
  );
};

export default Books;
