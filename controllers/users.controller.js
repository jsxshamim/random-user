let users = [
    { id: 1, name: "Shamim", age: 22 },
    { id: 2, name: "Ruhul", age: 25 },
    { id: 3, name: "Samrat", age: 28 },
    { id: 4, name: "Kamrul", age: 30 },
];

module.exports.getUsers = (req, res) => {
    res.json(users);
};

module.exports.getUser = (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id));
    res.json(user);
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
