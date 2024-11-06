const mongoose = require('mongoose');

// Definindo o esquema (schema) para os itens do cardápio
const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true }
});

// Criando o modelo baseado no esquema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
