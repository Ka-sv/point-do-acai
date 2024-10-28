const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para interpretar JSON nas requisições
app.use(express.json());

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/cardapioDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Importa as rotas do menu
const menuRoutes = require('./routes/menu');
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
