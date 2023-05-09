
// const Checkout = require("../models/Checkout");
const userController = require("../models/userController");
const Biblioteca = require("../models/Biblioteca");
const Wishlist = require("../models/Wishlist");

// models
const Cart = require('../models/Cart');


const randomSuccess = () => Math.random() < 0.5;

exports.confirmCheckout = async (req, res) => {


    const query = User.where('id', req.params.id);
    const user = await query.findOne();  

    if (user?.cart == null) {
       return res.send({error: 'Erro ao processar checkout: carrinho vazio!'})
    } 

    const cart = await Cart.findById(user.cart);
    // const cartMap = new Map();
    // if(cart){
    //    for (const item of cart.items) {
    //    cartMap.set(item.itemId.toString(), item.quantity);
    // }
   try{

        if (randomSuccess){
            // success - mandar msg e adicionar na biblioteca e remover do carrinho e da Wishlist

            // falta adicionar este metodo no userController
            await user.addItemsLibrary(cart.items)

            // falta adicionar este metodo no userController
            await user.removeItemsWhislist(cart.items)

            // falta adicionar este metodo no userController
            await user.clearCart()

            res.send({success:'Compra efectuada com sucesso'})

        } else {
            // erro
            res.send({error: 'Erro ao processar checkout'})

        }
    }catch(err){
            res.send({error: 'Erro ao processar checkout', errorMsg: err})


    }
    

};

async function createCheckout(req) {
    await Promise.all([
                userCreate(req),
    ]);
  }

  async function userCreate(req) {
    const nextId = await findNextId(); // wait for the promise to resolve
    const user = new User({
      id: nextId,
      name: req.body.name,
      password: req.body.password,
    });
    await user.save();
    console.log(`Added user: ${req.body.name}`);
  }




async function findNextId() {
  const users = await User.find({}, { id: 1, _id: 0 }).sort({ id: 1 }).lean();
  let nextId = 1;
  for (const user of users) {
    if (user.id !== nextId) {
      return nextId;
    }
    nextId++;
  }
  return nextId;
}



  
