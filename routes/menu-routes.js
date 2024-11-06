
// routes/menu-routes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuModel'); // Importa o modelo

// Rota para obter todos os itens do menu
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para criar um novo item de menu
router.post('/', async (req, res) => {
    const newItem = new MenuItem({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para atualizar um item de menu por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um item de menu por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' });
        res.json({ message: 'Item deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
