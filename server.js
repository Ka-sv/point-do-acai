// Importações principais
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware para interpretar JSON
app.use(express.json());

// Conexão com o MongoDB usando a URI do arquivo .env
mongoose.connect(process.env.MONGO_URI, {
    
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Importa as rotas do menu
const menuRoutes = require('./routes/menu-routes');
app.use('/api/menu', menuRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Ocorreu um erro no servidor!' });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
