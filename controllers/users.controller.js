const fs = require("fs");

const usersData = fs.readFileSync("users.json");
const users = JSON.parse(usersData);

module.exports.home = (req, res) => {
    res.send(`<h2>Welcome to Random User Assignment</h2>`);
};

// Get All Users
module.exports.allUsers = (req, res) => {
    const { limit } = req.query;
    const limitedUsers = users.slice(0, limit);

    if (users.length) {
        res.status(200).send({
            success: true,
            message: "Success",
            data: req.query ? limitedUsers : users,
        });
    } else {
        res.status(500).send({
            success: false,
            error: "No Content",
        });
    }
};

// Random User Generate
module.exports.randomUser = (req, res) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];
    res.status(200).send({
        success: true,
        message: "random user generated!",
        data: randomUser,
    });
};

module.exports.saveUser = (req, res) => {
    const newUser = req.body;
    const allUser = [...users, newUser];
    const stringifiedUser = JSON.stringify(allUser);
    const exist = users.find((user) => user.id === Number(newUser.id));

    if (!exist) {
        if (!newUser.id || !newUser.gender || !newUser.name || !newUser.contact || !newUser.address || !newUser.photoUrl) {
            res.status(200).send({
                success: false,
                message: "Please add the require property to save user",
            });
        } else {
            fs.writeFileSync("users.json", stringifiedUser);
            res.status(200).send({
                success: true,
                message: "new user added successfully",
                data: stringifiedUser,
            });
        }
    } else {
        res.status(200).send({
            success: false,
            message: "User ID already exist!",
        });
    }
};

module.exports.addUser = (req, res) => {
    const exist = users.find((user) => user.id === Number(req.body.id));
    if (!exist) {
        users.push(req.body);
    }
    res.status(200).send({
        status: 200,
        success: true,
        message: "add user successfully",
        data: users,
    });
    res.status(500).send({
        status: 500,
        success: false,
        error: "Internal server error",
    });
};

module.exports.updateUser = (req, res) => {
    const { id } = req.params;
    const exist = users.find((user) => user.id === Number(id));

    exist.age = req.body.age ? req.body.age : exist.age;
    exist.name = req.body.name ? req.body.name : exist.name;

    res.send(exist);
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const remaining = users.filter((user) => user.id !== Number(id));
    users = remaining;
    res.send(remaining);
};
