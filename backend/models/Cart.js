const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);

const Item = require('./Item');

const carrinhoComprasSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: () => mongoose.Types.ObjectId()
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }],
  totalQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('carrinhoCompras', carrinhoComprasSchema);
