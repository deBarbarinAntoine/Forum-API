const connection = require("./db-connect");
const {getAllUsersQuery, getUserByIQuery, checkUserByCredentialsQuery} = require("./db-queries");


class User {
    id;
    username;
    email;
    password;
    salt;
    avatarPath;
    role;
    birthDate;
    createdAt;
    updatedAt;
    visitedAt;
    bio;
    signature;
    status;

    constructor(Id_users, Username, Email, Password, Salt, Avatar_path, Role, Birth_date, Created_at, Updated_at, Visited_at, Bio, Signature, Status) {
        this.id = Id_users;
        this.username = Username;
        this.email = Email;
        this.password = Password;
        this.salt = Salt;
        this.avatarPath = Avatar_path;
        this.role = Role;
        this.birthDate = Birth_date;
        this.createdAt = Created_at;
        this.updatedAt = Updated_at;
        this.visitedAt = Visited_at;
        this.bio = Bio;
        this.signature = Signature;
        this.status = Status;
    };

    static newUser(user) {
        return new User(user.Id_users, user.Username, user.Email, user.Password, user.Salt, user.Avatar_path, user.Role, user.Birth_date, user.Created_at, user.Updated_at, user.Visited_at, user.Bio, user.Signature, user.Status);
    };

    static newUsers(users) {
        const allUsers = [];
        for (let user of users) {
            allUsers.push(this.newUser(user));
        }
        return allUsers;
    }
}

async function getUsers() {
    try {
        const [rows] = await connection.query(getAllUsersQuery);
        return User.newUsers(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        // Handle errors appropriately, e.g., return an error response
    }
}

async function getUserById(id) {
    try {
        const [rows] = await connection.query(getUserByIQuery, [id]);
        return User.newUsers(rows)[0];
    } catch (err) {
        console.error('Error fetching users:', err);

    }
}

async function checkCredentials(usernameOrEmail, Password, Salt) {
    try {
        const [rows] = await connection.query(checkUserByCredentialsQuery, [usernameOrEmail, usernameOrEmail, Password, Salt]);
        console.log('sql result:', rows);
        console.log('count:', rows[0].Count);
        return rows[0].Count === 1;
    } catch (err) {
        console.error('Error checking credentials:', err);
    }
}

module.exports = {User, getUsers, getUserById, checkCredentials};