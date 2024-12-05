const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuModel'); // Importa o modelo

const { authenticate } = require('../middleware/middleware');




// Rota para obter todos os itens do menu
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para obter o prato do dia
router.get('/prato-do-dia', async (req, res) => {
    try {
        const specialItem = await MenuItem.findOne({ isSpecial: true });
        if (!specialItem) {
            return res.status(404).json({ message: 'Prato do dia não encontrado.' });
        }
        res.json(specialItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para obter itens por categoria
router.get('/menu/:category', async (req, res) => {
    try {
        const items = await MenuItem.find({ category: req.params.category, available: true });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para criar um novo item (com autenticação)

router.post('/', authenticate, async (req, res) => {
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


// Rota para atualizar um item por ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um item por ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' });
        res.json({ message: 'Item deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
