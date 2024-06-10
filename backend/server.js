require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to the DB and listening on port ${process.env.PORT}!`);
        });
    })
    .catch((error) => console.log(error));

