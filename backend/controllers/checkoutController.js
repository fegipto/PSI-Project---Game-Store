const userController = require("./userController");

// models
const Cart = require('../models/Cart');
const User = require('../models/User');

const randomSuccess = () => Math.random() < 0.5;

exports.confirmCheckout = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();

  if (user?.cart == null) {
    return res.send({ error: 'Erro ao processar checkout: carrinho vazio!' })
  }

  const cart = await Cart.findById(user.cart);

  try {
    if (randomSuccess()) {
      // success - mandar msg e adicionar na biblioteca e remover do carrinho e da Wishlist

      // falta adicionar este metodo no userController
      await userController.addItemsLibrary(user.id, cart.items)

      // falta adicionar este metodo no userController
      await userController.removeItemsWhislist(user.id, cart.items)

      // falta adicionar este metodo no userController
      await userController.clearCart(user.id)

      res.send({ success: 'Compra efectuada com sucesso' })

    } else {
      // erro
      res.send({ error: 'Erro ao processar checkout' })
    }
  } catch (err) {
    res.send({ error: 'Erro ao processar checkout', errorMsg: err })
  }
};