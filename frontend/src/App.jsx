import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import BlogPage from "./pages/BlogPage";
import EditBlog from "./pages/EditBlog";

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/blogs/edit/:id" element={<EditBlog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
