import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDataFetch from "../helper/useFetch";


const EditBlog = () => {
    const [formData, setFormData] = useState({ title: "", text: "", author: "" });
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [blog, setBlog] = useState({});

    const { id } = useParams();
    const { data, refetch } = useDataFetch(`http://localhost:3000/api/blogs/${id}`);

    useEffect(() => {
        if (data) {
            setBlog({ ...data, author: data.author === "" ? "Unknown" : data.author });
            setFormData({ ...data, author: data.author === "" ? "Unknown" : data.author });
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBlog = { title: formData.title, text: formData.text, author: formData.author };

        const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newBlog),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setError(null);
            setFormData({ title: "", text: "", author: "" });
            setEmptyFields([]);
            refetch();
            console.log("blog updated successfully", json);
        }
    };
    return (
        <div className="edit-container">
            <form className="update" onSubmit={handleSubmit}>
                <h3>Edit a Blog</h3>
                <label htmlFor="title">Title:</label>
                <input type="text"
                    id="title"
                    name="title"
                    placeholder="Title..."
                    value={formData.title}
                    onChange={handleChange}
                    className={emptyFields.includes("title") ? "error" : ""}
                />

                <label htmlFor="text">Text:</label>
                <textarea type="text" placeholder="Text..." id="text" name="text" value={formData.text} onChange={handleChange} className={emptyFields.includes("text") ? "error" : ""} />

                <label htmlFor="author">Author:</label>
                <input id="author" type="text" placeholder="Author..." name="author" value={formData.author} onChange={handleChange} />

                <button type="submit">Update Blog</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="single-blog">
                <div>
                    <h1>
                        {blog.title}
                    </h1>
                    <h4>{`By: ${blog.author}`}</h4>
                </div>
                <article>{blog.text}</article>
            </div>
        </div>
    );
}

export default EditBlog;