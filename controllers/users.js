const {getUsers, getUserById, checkCredentials} = require("../models/users");

async function usersHandler(req, res) {
    const users = await getUsers();
    console.log(users); // testing
    res.json(users);
}

async function userByIdHandler(req, res) {
    const id = req.params.id;
    const user = await getUserById(id);
    console.log(user); //testing
    res.json(user);
}

async function checkCredentialsHandler(req, res) {

    const usernameOrEmail = req.body.usernameOrEmail.toLowerCase().trim();
    const password = req.body.password.trim();
    const salt = req.body.salt.trim();

    console.log({'credentials': usernameOrEmail, 'password': password, 'salt': salt}); //testing
    const response = await checkCredentials(usernameOrEmail, password, salt);
    console.log('response', response); //testing

    if (response) res.json({status: 'success', message: 'Login successful'}); else res.json({status: 'error', message: 'Login failed'});
}

module.exports = {usersHandler, userByIdHandler, checkCredentialsHandler};