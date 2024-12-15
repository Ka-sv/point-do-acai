require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

// Testa conexão com MongoClient
(async () => {
    try {
        const client = new MongoClient(uri, {
            ssl: true,
            tlsAllowInvalidCertificates: true, // Adiciona configurações para problemas com SSL/TLS
        });
        await client.connect();
        console.log('Conexão bem-sucedida com MongoClient!');
        await client.close();
    } catch (error) {
        console.error('Erro ao conectar com MongoClient:', error.message);
    }
})();

// Testa conexão com Mongoose
mongoose.connect(uri, {
    ssl: true,
    tlsAllowInvalidCertificates: true,
})
    .then(() => {
        console.log('Conexão bem-sucedida ao MongoDB Atlas via Mongoose');
    })
    .catch(err => {
        console.error('Erro ao conectar com Mongoose:', err.message);
    });

