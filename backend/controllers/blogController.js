const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// const getBlogs = async (req, res) => {
//     const blogs = await Blog.find({}).sort({ createdAt: -1 });
//     res.status(200).json(blogs);
// }

const getBlogs = async (req, res) => {

    const PAGE_SIZE = 8;
    const page = parseInt(req.query.page || "0");
    const search = req.query.search || "";
    const searchQuery = { title: { $regex: search, $options: "i" } };
    const totalBlogs =
        search.length > 0 ? await Blog.countDocuments(searchQuery) :
            await Blog.countDocuments();
    const blogs = await Blog.find({ title: { $regex: search, $options: "i" } }).sort({ createdAt: -1 }).limit(PAGE_SIZE).skip(page * PAGE_SIZE);
    res.status(200).json({ totalPages: Math.ceil(totalBlogs / PAGE_SIZE), blogs });
}

const getMyBlogs = async (req, res) => {
    const user_id = req.user._id;
    const PAGE_SIZE = 8;
    const page = parseInt(req.query.page || "0");
    const search = req.query.search || "";
    const searchQuery = { title: { $regex: search, $options: "i" } };
    const totalBlogs =
        search.length > 0 ? await Blog.countDocuments(searchQuery) :
            await Blog.countDocuments();
    const blogs = await Blog.find({ title: { $regex: search, $options: "i" }, user_id: user_id }).sort({ createdAt: -1 }).limit(PAGE_SIZE).skip(page * PAGE_SIZE);
    res.status(200).json({ totalPages: Math.ceil(totalBlogs / PAGE_SIZE), blogs });
}

const getBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such blog found" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ error: "No such blog found" });
    }

    res.status(200).json(blog);
}

const createBlog = async (req, res) => {
    const { title, text, author } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!text) {
        emptyFields.push('text');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all required fields', emptyFields });
    }

    try {
        const user_id = req?.user?._id;
        const blog = await Blog.create({ title, text, author, user_id });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such blog found" });
    }

    const blog = await Blog.findOneAndDelete({ _id: id });

    if (!blog) {
        return res.status(404).json({ error: "No such blog found" });
    }

    res.status(200).json(blog);
}

const updateBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such blog found" });
    }

    const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!blog) {
        return res.status(404).json({ error: "No such blog found" });
    }

    res.status(200).json(blog);
}


module.exports = { getBlogs, getBlog, createBlog, deleteBlog, updateBlog, getMyBlogs }