import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './pages/Layout/AdminLayout'
import UserLayout from './pages/Layout/UserLayout'
import ProtectedRoutes from './pages/ProtectedRoutes'
import DashboardPage from './pages/AdminPages/Dashboard';
import BooksPage from './pages/AdminPages/Books';
import AssignedBooksPage from './pages/AdminPages/AssignedBook';
import UserDashboardPage from './pages/UserPages/UserAssignedBooks';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          {/* Admin path */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoutes role="admin">
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            {/* add admin nested component here */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="assigned-books" element={<AssignedBooksPage />} />
          </Route>

          {/* User path */}
          <Route path="/user/*"
            element={
              <ProtectedRoutes role="user">
                <UserLayout />
              </ProtectedRoutes>
            }
          >
            {/* add user nested component here */}
            <Route path="dashboard" element={<UserDashboardPage />} />
          </Route>

          {/* No route found redirect to login page */}
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
