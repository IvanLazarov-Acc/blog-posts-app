import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import BlogPage from "./pages/BlogPage";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";
import MyBlogs from "./pages/MyBlogs";

function App() {
  const { user } = useAuthContext();
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/my-blogs" element={user ? <MyBlogs /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/blogs/:id" element={user ? <BlogPage /> : <Navigate to="/login" />} />
            <Route path="/blogs/edit/:id" element={user ? <EditBlog /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
