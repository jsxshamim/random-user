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
        res.status(400).send({
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

module.exports.updateUser = (req, res) => {
    const { id } = req.params;
    const exist = users.find((user) => user.id === Number(id));
    if (id == req.body.id) {
        exist.id = req.body.id ? req.body.id : exist.id;
        exist.name = req.body.name ? req.body.name : exist.name;
        exist.gender = req.body.gender ? req.body.gender : exist.gender;
        exist.contact = req.body.contact ? req.body.contact : exist.contact;
        exist.address = req.body.address ? req.body.address : exist.address;
        exist.photoUrl = req.body.photoUrl ? req.body.photoUrl : exist.photoUrl;

        const updatedUsers = JSON.stringify(users);

        fs.writeFileSync("users.json", updatedUsers);

        res.status(200).send({
            success: true,
            message: "User updated successfully!",
            data: exist,
        });
    } else {
        res.status(400).send({
            success: false,
            message: `you have to used ID: ${id}, in the body to update user`,
        });
    }
};

module.exports.bulkUpdate = (req, res) => {
    const newUsers = req.body;
    if (Array.isArray(newUsers)) {
        newUsers.map((user) => {
            const id = user.id;
            const exist = users.find((user) => user.id === Number(id));

            exist.id = user.id ? user.id : exist.id;
            exist.name = user.name ? user.name : exist.name;
            exist.gender = user.gender ? user.gender : exist.gender;
            exist.contact = user.contact ? user.contact : exist.contact;
            exist.address = user.address ? user.address : exist.address;
            exist.photoUrl = user.photoUrl ? user.photoUrl : exist.photoUrl;

            const updatedUsers = JSON.stringify(users);

            fs.writeFileSync("users.json", updatedUsers);

            res.status(200).send({
                success: true,
                message: "Multiple Users updated!",
                data: updatedUsers,
            });
        });
    } else {
        res.status(400).send({
            success: false,
            message: "Please input an array to update multiple user",
        });
    }
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    if (id > 0) {
        const remainingUsers = users.filter((user) => user.id !== Number(id));

        fs.writeFileSync("users.json", JSON.stringify(remainingUsers));

        res.status(200).send({
            success: true,
            message: `ID: ${id}, deleted successfully!`,
            data: remainingUsers,
        });
        res.send(remainingUsers);
    } else {
        res.status(400).send({
            success: false,
            message: "Please input the valid ID to delete the user",
        });
    }
};
