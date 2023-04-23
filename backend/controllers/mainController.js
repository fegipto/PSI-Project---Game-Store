const User = require("../models/User");
const UserController = require("../controllers/userController");

exports.init = (req, res) => {
    createUsers();
    res.send();
};
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://tiagomg7fernandes:mBTQcpcGgtJeLuDj@locallibrary.kxp3fjt.mongodb.net/my_database?retryWrites=true&w=majority";

users = []

async function userCreate(id, name) {
    userdetail = { id: id, name:name};
    const user = new User(userdetail);
    users.push(user);
    await user.save();
    console.log(`Added user: ${name}`);
}

async function createUsers() {
    await Promise.all([
        userCreate(1,"Becky"),
        userCreate(2,"Tom"),
        userCreate(3,"Huckleberry"),
        userCreate(4,"Amy"),
    ]);
}


