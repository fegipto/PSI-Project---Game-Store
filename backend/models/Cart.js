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
