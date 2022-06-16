const mongoose = require("mongoose");
const { UserModel } = require('../models');

module.exports = {
  cget: async (req, res) => {
    try {
      const users = await UserModel.find({ ...req.body, deleted: false });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const user = new UserModel({ ...req.body });
      await user.save({ newPassword: true });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  get: async (req, res) => {
    try {
      const user = await UserModel.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        deleted: false,
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      let isUpdatePassword = false;
      if(req.body.password) { isUpdatePassword = true };

      let user = await UserModel.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        deleted: false,
      });
      if(user === null) throw new Error('User not found');
      user._doc = { ...user._doc, ...req.body };
      await user.save( { newPassword: isUpdatePassword } );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await UserModel.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        deleted: false,
      });
      if (user === null) throw new Error('User not found');
      user.deleted = true;
      await order.save();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
