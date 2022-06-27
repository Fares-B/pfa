// controller for order
const mongoose = require("mongoose");
const { OrderModel } = require('../models');
const { ORDER_STATUS } = require("../models/type");
const { SYMFONY_API_URL } = process.env;

module.exports = {
    cget: async (req, res) => {
        try {
            const orders = await OrderModel.find({ ...req.body, deleted: false }).sort({ createdAt: -1 });
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    post: async (req, res) => {
        const {menus: menusParams, user, establishment, table} = req.body;
        if (!user || !establishment || !table) return res.sendStatus(400);

        let supplements = [];
        let menus = [];
        for (const m of menusParams) {
            menus.push(m.id);
            for (const s of m.supplements) {
                supplements.push(s.id);
            }
        }

        try {
            const menu = await fetch(`${SYMFONY_API_URL}/menu/prices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    api_key: process.env.SYMFONY_API_KEY,
                    user,
                    menus,
                    supplements,
                })
            })
                .then(response => response.json())
                .then(data => data);
            let supplementsTotal = 0;
            let menusTotal = 0;
            for (const m of menu.menus) {
                menusTotal += (m.price * menus.filter(i => i === m.id).length);
            }
            for (const s of menu.supplements) {
                supplementsTotal += (s.price * supplements.filter(i => i === s.id).length);
            }
            const order = new OrderModel({
                ...req.body,
                user: req.user.id,
                company: {
                    establishment,
                    user,
                    table,
                },
                totalPrice: menusTotal + supplementsTotal,
            });
            await order.save();
            res.status(201).json(order);
        } catch (err) {
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
                user: req.user.id,
                status: ORDER_STATUS.NEW,
                deleted: false,
            });
            if (!order) return res.sendStatus(403);
            order.status = ORDER_STATUS.CANCELED;
            await order.save();
            res.json({ order });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};
