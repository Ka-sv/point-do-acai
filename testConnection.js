const mongoose = require('mongoose');
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexão bem-sucedida ao MongoDB Atlas');
    })
    .catch(err => {
        console.error('Erro ao conectar:', err.message);
    });
