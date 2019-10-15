// index, show, store, update, destroy
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        try {
            const { email } = req.body;

            let user = await User.findOne({ email: email });
            if (!user) {
                user = await User.create({ email });
            }

            return res.json(user);
        } catch(err) {
            if (err.code == 11000) {
                return res.status(401).json({ message: "E-mail informado já existe" });
            } else {
                return res.status(500).json({ message: "Erro interno" });
            }
        }
    },
    async index(req, res) {
        try {
            const users = await User.find();

            return res.json(users);
        } catch (err) {
            return res.status(500).json({ message: "Erro interno" });
        }
    }
};