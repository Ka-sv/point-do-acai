const authenticate = (req, res, next) => {
    const token = req.headers.authorization; // Verifica se o token foi enviado no cabeçalho
    if (!token || token !== 'seu-token-seguro') {
        return res.status(403).json({ message: 'Acesso negado.' }); // Responde com erro de acesso negado
    }
    next(); // Prossegue para a próxima função se o token for válido
};

module.exports = { authenticate };
