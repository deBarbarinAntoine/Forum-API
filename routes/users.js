const express = require("express");
const {usersHandler, userByIdHandler, checkCredentialsHandler} = require("../controllers/users");
const router = express.Router();

router.get('/users', usersHandler);

router.get('/users/:id', userByIdHandler);

router.post('/users/login', checkCredentialsHandler);

module.exports = router;