const mongoose = require("mongoose");
const { OrderModel } = require('../models');
const { ORDER_STATUS } = require("../models/type");


module.exports = {
    cget: async (req, res) => {
        const { establishment = null } = req.query;

        try {
            const orders = await OrderModel.find({
                "company.establishment": establishment,
                deleted: false,
                status: ORDER_STATUS.NEW,
                user: req.user.id,
            });
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
