const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuração do dotenv
dotenv.config();

const app = express();
const port = 3000;

// Log da variável de ambiente
console.log('MONGO_URI:', process.env.MONGO_URI);

// Middleware para interpretar JSON
app.use(express.json());

// Configurar debug do Mongoose
mongoose.set('debug', true);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexão bem-sucedida ao MongoDB Atlas');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    });


// Importação e uso das rotas do menu
const menuRoutes = require('./routes/menu-routes');
app.use('/api/menu', menuRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor do cardápio!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
