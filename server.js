const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuração do dotenv
dotenv.config();

const app = express();
const port = 3000;

// Log da variável de ambiente
if (!process.env.MONGO_URI) {
    console.error('A variável MONGO_URI não está definida no arquivo .env');
    process.exit(1);
}

console.log('MONGO_URI:', process.env.MONGO_URI);

// Middleware para interpretar JSON
app.use(express.json());

// Configurar debug do Mongoose
mongoose.set('debug', true);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
    ssl: true, // Habilita SSL
    tlsAllowInvalidCertificates: true, // Aceita certificados inválidos
})
    .then(() => {
        console.log('Conexão bem-sucedida ao MongoDB Atlas via Mongoose');
    })
    .catch(err => {
        console.error('Erro ao conectar com Mongoose:', err.message);
        process.exit(1); // Finaliza o processo caso a conexão falhe
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
