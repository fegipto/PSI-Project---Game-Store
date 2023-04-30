const User = require("../models/User");
const Item = require("../models/Item");
const UserController = require("../controllers/userController");
const fs = require('fs');

exports.init = (req, res) => {
    createItems();
    createUsers();
    res.send();
};
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://tiagomg7fernandes:mBTQcpcGgtJeLuDj@locallibrary.kxp3fjt.mongodb.net/my_database?retryWrites=true&w=majority";

users = []
items = []

async function userCreate(id, name, lists, library, followers, following) {
    userdetail = { id: id, name:name, lists:lists, library:library, followers:followers, following:following, password: '123'};
    const user = new User(userdetail);
    users.push(user);
    await user.save();
    console.log(`Added user: ${name}`);
}

async function createUsers() {
    await Promise.all([
        //userCreate(1,"Becky"),
        //userCreate(2,"Tom"),
        //userCreate(3,"Huckleberry"),
        userCreate(1,
            "Becky", 
            [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista2", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [],
            []
            ),
        userCreate(2,
            "Tom", 
            [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista2", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [await User.where('id', 1).findOne()],
            [await User.where('id', 1).findOne()],
            ),
        userCreate(3,
            "Huckleberry", 
            [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista2", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [await User.where('id', 1).findOne(), await User.where('id', 2).findOne()],
            [await User.where('id', 1).findOne(), await User.where('id', 2).findOne()],
            ),
        userCreate(4,
            "Amy", 
             [{name : "lista1", values: [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()]},
                      {name:"lista3", values: [await Item.where('id', 3).findOne(), await Item.where('id', 2).findOne()]}],
            [await Item.where('id', 1).findOne(), await Item.where('id', 2).findOne()],
            [await User.where('id', 3).findOne(), await User.where('id', 2).findOne()],
            [await User.where('id', 3).findOne(), await User.where('id', 2).findOne()],
            ),
    ]);
}

async function createItems() {
    await Promise.all([
                itemCreate(item1),
                itemCreate(item2),
                itemCreate(item3),
    ]);
}

async function itemCreate(item) {
    items.push(item);
    await item.save();
    console.log(`Added item: ${item.name}`);
}

// Read the image file and convert it to base64-encoded data
const imageData = fs.readFileSync('../images/callofduty.jpg', { encoding: 'base64' });

// Create four example items
const item1 = new Item({
  id: '11111',
  name: 'Call of Duty',
  descricao: 'This is a war game',
  tipo: 'Jogo',
  plataforma: 'PC',
  idiomas: 'Inglês, Português',
  preco: 49.99,
  classificacao: 'E',
  avaliacoes: 4.5,
  imagens: [{ data: imageData, contentType: 'image/jpg' }],
  video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
});

const item2 = new Item({
  id: '234',
  name: 'Item 2',
  descricao: 'This is the second item',
  tipo: 'DLC',
  plataforma: 'PS4',
  idiomas: 'Inglês',
  preco: 9.99,
  classificacao: 'M',
  avaliacoes: 3.2,
  imagens: [{ data: Buffer.from('image2'), contentType: 'image/png' }, { data: Buffer.from('image3'), contentType: 'image/png' }],
});

const item3 = new Item({
  id: '345',
  name: 'Item 3',
  descricao: 'This is the third item',
  tipo: 'Subscrição',
  plataforma: 'Xbox One',
  idiomas: 'Inglês, Espanhol',
  preco: 14.99,
  classificacao: 'T',
  avaliacoes: 4.7,
  imagens: [{ data: Buffer.from('image4'), contentType: 'image/png'
    }],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
});


async function getItemId(id) {
    const query = Item.where('id', id);
    const result = await query.findOne();
    return result;
    }
async  function getUserId(id) {
    const query = User.where('id', id);
    const result = await query.findOne();
    return result;
}

async function getItems() {
    const items= await Item.find()
    return items;
}







