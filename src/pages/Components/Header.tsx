import { Logout } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Slice/UserSlice";
import { UserState } from "../../interface";
import { sideBarWidth } from "../../helper/constant";

function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const drawerWidth = props.isAdminUser ? sideBarWidth : 0;
    const state: UserState = useSelector((state: any) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: "#326b44"
                }}
            >
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Avatar style={{
                            backgroundColor: "white",
                            color: "#326b44"
                        }} alt="Remy Sharp" src="/static/images/avatar/1.jpg">{state.user?.name.charAt(0).toUpperCase()}</Avatar> &nbsp;
                        {state.user?.name}
                    </Typography>

                    <Box title="logout">
                        <Logout className='pointer' onClick={handleLogout} fontSize="small" sx={{ mr: 1 }} />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;

interface HeaderProps {
    isAdminUser: boolean;
}