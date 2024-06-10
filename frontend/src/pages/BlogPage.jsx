import { Link, useParams, useNavigate } from "react-router-dom";
import useDataFetch from "../helper/useFetch";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


const BlogPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    const { data, error: dataError, isLoading } = useDataFetch(`http://localhost:3000/api/blogs/${id}`, user);

    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) {
            setBlog(data);
            setError(dataError);
        }
    }, [data]);

    const handleClick = async () => {

        if (!user) {
            setError("You must be logged in!");
            return;
        }

        const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            navigate("/")
            console.log("the blog is deleted", json);
        }
    }

    if (isLoading) return <h3>...Loading</h3>;
    if (error) return <h3>{`Somthing went wrong - ${error}`}</h3>;
    return (
        <div className="single-blog">
            <div>
                <div className="row-group">
                    <h1>
                        {blog.title}
                    </h1>
                    <div className="button-group" >
                        <span onClick={handleClick} style={{
                            cursor: "pointer",
                            background: "var(--error)",
                            borderRadius: "5px",
                            color: "white",
                            padding: "10px",
                            fontFamily: "Poppins",
                        }} >Delete</span>
                        <Link className="edit-link" style={{
                            marginLeft: "10px",
                            background: "var(--primary)",
                            border: "0",
                            color: "#fff",
                            padding: "10px",
                            fontFamily: "Poppins",
                            borderRadius: "5px",
                            cursor: "pointer",
                            textDecoration: "none",
                        }} to={`/blogs/edit/${id}`} >Edit Blog</Link>
                    </div>
                </div>
                <h4>{`By: ${blog.author || 'Unknown'}`}</h4>
            </div>
            <article>{blog.text}</article>
        </div >
    )
}

export default BlogPage;