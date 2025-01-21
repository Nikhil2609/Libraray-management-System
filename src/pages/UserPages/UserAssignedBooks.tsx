import {
  Typography,
} from "@mui/material";
import StyledTable from "../Components/Table";
import { useSelector } from "react-redux";
import { Book, GlobalState, UserType } from "../../interface";
import { SYSTEM_USER } from "../../helper/constant";
import { PageWrapper } from "../Components/common";
import moment from "moment";

const UserDashboard = () => {
  const store = useSelector((store: GlobalState) => store);
  const currentUser = store.user.user
  const books = store.book.books;
  const students = store.user.registeredUsers.filter(user => user.role === SYSTEM_USER.USER);
  let assignedBooks = store.assignBook.assignedBooks;

  assignedBooks = assignedBooks.filter(assignedBook => assignedBook.student === currentUser?.id)

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

  const columns = [
    { field: 'book', headerName: 'Book' },
    { field: 'issueDate', headerName: 'Issue Date' },
    { field: 'returnDate', headerName: 'Return Date' },
  ];

  return (
    <PageWrapper>
      <div className='space-between mb'>
        <Typography variant="h4" className='textColor'>User Books</Typography>
      </div>

      <StyledTable
        columns={columns}
        data={assignedBooks}
      />
    </PageWrapper>
  );
};

export default UserDashboard;
