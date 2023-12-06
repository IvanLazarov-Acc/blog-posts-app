import { useState, useEffect } from "react";
import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
import useDataFetch from "../helper/useFetch";
import { SearchBar } from "../components/SearchBar";

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    const { data, error, isLoading, refetch } = useDataFetch(`http://localhost:3000/api/blogs?page=${pageNumber}&search=${search}`);

    const pages = new Array(totalPages).fill(null).map((v, i) => i);

    useEffect(() => {
        if (data && !isLoading) {
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
        }
    }, [data, totalPages]);

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
    };

    return (
        <div className="home">
            {isLoading && <h4>...Loading</h4>}
            {error && <div className="error">{error}</div>}
            <div className="blogs">
                <SearchBar setSearch={setSearch} />
                {blogs && blogs.map(blog => (
                    <BlogDetails key={blog._id} blog={blog} refetch={refetch} />
                ))}
                <button disabled={totalPages <= 1} style={{ opacity: totalPages <= 1 ? 0.5 : 1 }} className="page-buttons" onClick={gotoPrevious}>Previous</button>
                {pages.map((pageIndex) => (
                    <button
                        disabled={totalPages <= 1}
                        className="page-buttons"
                        style={{ opacity: pageIndex + 1 === pageNumber + 1 ? 0.5 : 1 }}
                        key={pageIndex}
                        onClick={() => setPageNumber(pageIndex)}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
                <button disabled={totalPages <= 1} style={{ opacity: totalPages <= 1 ? 0.5 : 1 }} className="page-buttons" onClick={gotoNext}>Next</button>
            </div>
            <BlogForm refetch={refetch} />
        </div>
    )
}

export default Home;