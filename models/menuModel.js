const mongoose = require('mongoose'); 

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
    image: { type: String, required: true }, // Caminho para a imagem
    isSpecial: { type: Boolean, default: false } // Indica se é o prato do dia
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
