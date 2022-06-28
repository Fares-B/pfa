const mongoose = require("mongoose");
const { OrderModel } = require('../models');
const { ORDER_STATUS } = require("../models/type");
const { io } = require("..");

function nextStatus(status) {
    switch (status) {
        case ORDER_STATUS.NEW:
        //     return ORDER_STATUS.IN_PROGRESS;
        // case ORDER_STATUS.IN_PROGRESS:
            return ORDER_STATUS.COMPLETED;
    }
    return null;
}

module.exports = {
    cget: async (req, res) => {
        try {
            const orders = await OrderModel.find({
                "company.establishment": req.user.establishment,
                deleted: false,
                status: ORDER_STATUS.NEW,
                // user: req.user.id,
            });
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    history: async(req, res) => {
        try {
            const orders = await OrderModel.find({
                "company.establishment": req.user.establishment,
                deleted: false,
                status: { $in: [ORDER_STATUS.CANCELLED, ORDER_STATUS.COMPLETED] },
            });
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    nextStatus: async (req, res) => {
        try {
            const order = await OrderModel.findOne({
                _id: mongoose.Types.ObjectId(req.params.id),
                deleted: false,
                status: { $in: [ORDER_STATUS.NEW, ORDER_STATUS.IN_PROGRESS] },
            });
            if (!order) return res.sendStatus(404);

            const status = nextStatus(order.status);
            if (!status) return res.sendStatus(400);

            order.status = status;
            await order.save();
            io.emit(order.user + "_order-status-updated", order);
            res.json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const order = await OrderModel.findOne({
                _id: mongoose.Types.ObjectId(req.params.id),
                deleted: false,
                status: ORDER_STATUS.NEW,
            });
            if (!order) return res.sendStatus(404);

            order.status = ORDER_STATUS.CANCELLED;

            await order.save();
            res.json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};
