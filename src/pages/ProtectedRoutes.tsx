import { useSelector } from "react-redux";
import { UserState } from "../interface";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (props: ProtectedRoutes) => {
    const navigate = useNavigate();
    const store: UserState = useSelector((store: any) => store.user);
    const currentUserRole = store.user?.role;
    // if user not login or current user role not then redirect to login page
    if(!store.isLoggedIn || currentUserRole != props.role) {
        setTimeout(() => navigate('/login'));
        // navigate('/login')
        return;
    };

    return ( 
        <>
            {props.children}
        </>
     );
}

export default ProtectedRoutes;

interface ProtectedRoutes {
    children: React.ReactNode;
    role: string
}