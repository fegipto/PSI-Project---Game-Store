const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MAX_IMAGES = 3;

const ItemSchema = new Schema({
  id: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  descricao: { type: String, maxLength: 1000 },
  tipo: { type: String, required: true, maxLength: 100 },
  plataforma: { type: String, required: true, maxLength: 100 },
  idiomas: { type: String, required: true, maxLength: 100 },
  preco: { type: String, required: true, maxLength: 100 },
  classificacao: { type: String, required: true, maxLength: 100 },
  avaliacoes: { type: String, required: true, maxLength: 100 },
  date: { type: Date, required: false },
  imagens: {
    type: [{ data: Buffer, contentType: String }], 
    required: true,
    validate: [(v) => v.length <= MAX_IMAGES, `Item can have a maximum of ${MAX_IMAGES} images`],
  },
  video: { type: String, maxLength: 100 },
});

module.exports = mongoose.model("Item", ItemSchema);