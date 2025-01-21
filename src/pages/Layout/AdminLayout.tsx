import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
} from '@mui/material';
import { Dashboard, Book, Assignment } from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import { sideBarWidth } from '../../helper/constant';
import library from "../../assets/library.png";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Books', icon: <Book />, path: '/admin/books' },
    { text: 'Assigned Books', icon: <Assignment />, path: '/admin/assigned-books' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Header */}
      <Header isAdminUser={true} />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sideBarWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: sideBarWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar className='align-item-center p8'>
          <img height={56} src={library} />
        </Toolbar>
        <Box sx={{ overflow: 'auto', padding: "8px" }}>
          <List>
            {menuItems.map((item) => {
              const isActivePath = item.path === location.pathname
              return (
                <>
                  <ListItem
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    className={`${isActivePath ? "themeColor" : ""}`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px"
                    }}
                  >
                    <ListItemIcon><span style={{ color: `${isActivePath ? "white" : ""}` }}>{item.icon}</span></ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </>
              )
            })}
          </List>
        </Box>
      </Drawer >

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${sideBarWidth}px)` }}
      >
        <Toolbar />
        {/* Children will be render here */}
        <Outlet />
      </Box>
    </Box >
  );
};

export default AdminLayout;
