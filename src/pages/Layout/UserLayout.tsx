import {
    Box,
    Toolbar,
    CssBaseline,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const UserLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header isAdminUser={false} />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: "" }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default UserLayout;
