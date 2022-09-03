const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./utils/dbConnect");
const usersRoutes = require("./routes/v1/users.routes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

dbConnect();

app.use("/api/v1/user", usersRoutes);

app.get("/", (req, res) => res.send(`<h2>Welcome to Random User Assignment</h2>`));

// if hit the route that not created at
app.all("*", (req, res) =>
    res.status(404).json({
        status: 404,
        success: false,
        message: "Request Not Found",
    })
);

// handle global error handler
app.use(errorHandler);

app.listen(port, () => console.log(`app listening on port ${port}!`));

// handle database, server related error handler
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});
