/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";

const BlogDetails = ({ blog, refetch }) => {
    const [error, setError] = useState(null);
    const handleClick = async () => {

        const response = await fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
            method: 'DELETE',
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            refetch();
            console.log("the blog is deleted", json);
        }
    }

    return (
        <div className="blog-details">
            {error && <div className="error">{error}</div>}
            <Link to={`/blogs/${blog._id}`} >
                <h4>{blog.title}</h4>
            </Link>
            <p>{blog.text}</p>
            <div className="row-group">
                <p id="blog-author">author: {blog.author || "Unknown"}</p>
                <div className="button-group">
                    <span onClick={handleClick} >Delete</span>
                    <Link className="edit-link" to={`/blogs/edit/${blog._id}`}  >Edit Blog</Link>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;