import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import StyledTable from "../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { AssignedBook, Book, GlobalState, UserType } from "../../interface";
import { SYSTEM_USER } from "../../helper/constant";
import { PageWrapper } from "../Components/common";
import { assignBook, deleteAssignBook } from "../../redux/Slice/assignedBookSlice";
import moment from "moment";
import { toast } from "react-toastify";

const AssignedBooks = () => {
  const store = useSelector((store: GlobalState) => store);
  const dispatch = useDispatch();
  const books = store.book.books;

  // available books 
  const students = store.user.registeredUsers.filter(user => user.role === SYSTEM_USER.USER);
  let assignedBooks = store.assignBook.assignedBooks;

  let availableBooks: Book[] = JSON.parse(JSON.stringify(books));
  let today = moment();

  availableBooks = availableBooks.map(availableBook => {
    // if any book is assigned between issue and return date then remove that count total quanity of book;
    const assignedBooksToStudent = assignedBooks.filter(assignBook =>
      assignBook.book === availableBook.id &&
      (moment(assignBook.returnDate)).diff(today, 'days') >= 0
    );

    // check issue and return date for that book if that between in this date then count that as assigned book
    let assignedBooksCount = assignedBooksToStudent?.length || 0;
    availableBook.quantity = (Number(availableBook.quantity) - assignedBooksCount).toString();
    if (Number(availableBook.quantity) > 0) {
      return availableBook;
    }
    return null;
  }).filter(books => books) as Book[];

  // format assigned Book data
  assignedBooks = assignedBooks.map(assignBook => {
    const book = books.find(book => book.id === assignBook.book) as Book;
    const user = students.find(student => student.id === assignBook.student) as UserType
    const issueDate = moment(assignBook.issueDate).format("DD-MM-YYYY");
    const returnDate = moment(assignBook.returnDate).format("DD-MM-YYYY");
    const payload = {
      ...assignBook,
      student: user.name,
      book: book.title,
      issueDate: issueDate,
      returnDate: returnDate
    }
    return payload;
  });

  const [formData, setFormData] = useState({
    id: "",
    student: "",
    book: "",
    issueDate: moment().format("DD-MM-YYYY"),
    returnDate: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    const issueDate = new Date(formData.issueDate);
    const returnDate = new Date(formData.returnDate);

    if (!formData.student) newErrors.student = "Please select a student.";
    if (!formData.book) newErrors.book = "Please select a book.";
    if (!formData.issueDate) newErrors.issueDate = "Please select an issue date.";
    if (!formData.returnDate) newErrors.returnDate = "Please select a return date.";
    if (!(returnDate > issueDate)) newErrors.returnDate = "Return date should be greater than issue date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAssignment = () => {
    if (validate()) {
      const assignedBooks = JSON.parse(JSON.stringify(store.assignBook.assignedBooks)) as AssignedBook[];
      const isSameBookAssigned = assignedBooks.some((assignBook) => assignBook.book === formData.book && moment(assignBook.returnDate).diff(moment(), 'days') >= 0);

      // if same book already assigned to same student before return date then dislay error;
      if(isSameBookAssigned){
       toast.error("Book is already assigned to student")
      } else{
        const payload = { ...formData }
        dispatch(assignBook(payload))
      }
      setErrors({});
      closeDialogue();
    }
  };

  const closeDialogue = () => {
    setDialogOpen(false);
    setFormData({
      id: "",
      student: "",
      book: "",
      issueDate: "",
      returnDate: "",
    })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e: any) => {
    setFormData({ ...formData, issueDate: e });
  };

  const handleReturnDateChange = (e: any) => {
    setFormData({ ...formData, returnDate: e });
  };

  const deleteAssignedBook = (id: number) => {
    dispatch(deleteAssignBook(id));
  }

  const columns = [
    { field: 'student', headerName: 'Student' },
    { field: 'book', headerName: 'Book' },
    { field: 'issueDate', headerName: 'Issue Date' },
    { field: 'returnDate', headerName: 'Return Date' },
  ];

  return (
    <PageWrapper>
      <div className='space-between mb'>
        <Typography variant="h4" className='textColor'>Assigned Books</Typography>
        <Button variant="contained" className='btn-color' onClick={() => setDialogOpen(true)}>
          Assign Book
        </Button>
      </div>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => closeDialogue()}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Assign Book</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Student</InputLabel>
              <Select
                label="Student"
                name="student"
                value={formData.student}
                onChange={handleChange}
                error={!!errors.student}
              >
                {students.map((student, index) => (
                  <MenuItem key={index} value={student.id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.student && (
                <Typography color="error" variant="caption">
                  {errors.student}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Book</InputLabel>
              <Select
                label="Book"
                name="book"
                value={formData.book}
                onChange={handleChange}
                error={!!errors.book}
              >
                {availableBooks.map((availableBook, index) => (
                  <MenuItem key={index} value={availableBook?.id}>
                    {availableBook.title}
                  </MenuItem>
                ))}
              </Select>
              {errors.book && (
                <Typography color="error" variant="caption">
                  {errors.book}
                </Typography>
              )}
            </FormControl>

            <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              fullWidth
              value={formData.issueDate}
              onChange={(e) => handleDateChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.issueDate}
              helperText={errors.issueDate}
            />

            <TextField
              label="Return Date"
              name="returnDate"
              type="date"
              fullWidth
              value={formData.returnDate}
              onChange={(e) => handleReturnDateChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.returnDate}
              helperText={errors.returnDate}
            />
          </Box>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={() => closeDialogue()} variant='contained' color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAddAssignment} variant='contained' className='btn-color'>
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      <StyledTable
        columns={columns}
        data={assignedBooks}
        onDelete={deleteAssignedBook}
      />
    </PageWrapper>
  );
};

export default AssignedBooks;
