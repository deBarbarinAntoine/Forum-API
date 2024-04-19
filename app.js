require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const users = require("./routes/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(users);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});