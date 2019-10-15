// index, show, store, update, destroy
const Booking = require('../models/Booking');
const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async store(req, res) {
        try {
            const { user_id } = req.headers;
            const { spot_id } = req.params;
            const { date } = req.body;

            const booking = await Booking.create({
                user: user_id,
                spot: spot_id,
                date,
            })

            await booking.populate('spot').populate('user').execPopulate();

            return res.json(booking);
        } catch (err) {
            return res.status(500).json({ message: "Erro interno" });
        }
    }
};