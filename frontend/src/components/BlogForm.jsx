/* eslint-disable react/prop-types */
import { useState } from "react";
import "../index.css";

const BlogForm = ({ refetch }) => {

    const [formData, setFormData] = useState({ title: "", text: "", author: "" });
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBlog = { title: formData.title, text: formData.text, author: formData.author };

        const response = await fetch(`http://localhost:3000/api/blogs`, {
            method: 'POST',
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
            console.log("new blog added", json);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Blog</h3>
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

            <button type="submit">Add Blog</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default BlogForm;