// controller for order
const mongoose = require("mongoose");
const { OrderModel } = require('../models');

module.exports = {
    cget: async (req, res) => {
        try {
            const orders = await OrderModel.find({ ...req.body, deleted: false });
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    post: async (req, res) => {
        try {
            const order = new OrderModel({
                user: req.user.id,
                ...req.body,
            });
            await order.save();
            res.status(201).json(order);
        } catch (err) {
            // if (err instanceof Sequelize.ValidationError) {
            //   res.status(400).json(err);
            // } else {
            // }
            res.status(500).json({ message: err.message });
        }
    },
    get: async (req, res) => {
        try {
            let order = await OrderModel.findOne({
                _id: mongoose.Types.ObjectId(req.params.id),
                deleted: false,
            });
            if(!order) return res.sendStatus(404);
            if (req.user.id !== order.user.toString()) return res.sendStatus(403);
            res.json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    put: async (req, res) => {
        try {
            let order = await OrderModel.findOne({
                _id: mongoose.Types.ObjectId(req.params.id),
                deleted: false,
            });
            if(!order) throw new Error('Order not found');
            order._doc = { ...order._doc, ...req.body };
            await order.save();
            res.json(order);
        } catch (err) {
            // if (err instanceof Sequelize.ValidationError) {
            //   res.status(400).json(err);
            // } else {
            // }
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            let order = await OrderModel.findOne({
                _id: mongoose.Types.ObjectId(req.params.id),
                deleted: false,
            });
            if (!order) return res.sendStatus(404);
            if (req.user.id !== order.user.toString()) return res.sendStatus(403);
            order.deleted = true;
            await order.save();
            res.status(204).end();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};
