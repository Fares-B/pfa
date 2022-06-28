const mongoose = require("mongoose");
const { UserModel } = require('../models');
const { USER_TYPE } = require("../models/type");

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
      const user = new UserModel({ ...req.body, userType: req.userType });
      await user.save({ newPassword: true });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  get: async (req, res) => {
    try {
      const user = await UserModel.findOne({
        _id: mongoose.Types.ObjectId(req.user.id),
        userType: req.user.userType,
        deleted: false,
      });
      if(!user) {
        return res.status(403).json({ message: "User not found" });
      }
      res.json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      let isUpdatePassword = false;
      if(req.body.password) { isUpdatePassword = true };

      let user = await UserModel.findOne({
        _id: mongoose.Types.ObjectId(req.user.id),
        userType: req.user.userType,
        deleted: false,
      });

      if(user === null) throw new Error('User not found');
      if(req.body.firstName) user.firstName = req.body.firstName;
      if(req.body.lastName) user.lastName = req.body.lastName;
      if(req.body.password) user.password = req.body.password;

      await user.save( { newPassword: isUpdatePassword } );
      res.json({
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await UserModel.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        userType: req.user.userType,
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
