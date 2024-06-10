import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleLogout = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>The Blog Masters</h1>
                </Link>
                <nav>
                    {user && <div>
                        <Link to="/my-blogs" style={{marginRight:"10px"}}>
                            <span>My Blogs</span>
                        </Link>
                        <span>{user?.email}</span>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>}
                    {!user && <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;