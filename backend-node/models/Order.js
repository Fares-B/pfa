const mongoose = require("mongoose");
const { ORDER_STATUS } = require("./type");

const IngredientSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isRemoved: Boolean,
}, { _id: false });

const MenuSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    category: {
        id: Number,
        name: String,
    },
    price: { type: Number, required: true },
    ingredients: [IngredientSchema],
    supplements: [IngredientSchema],
});

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    menus: [MenuSchema],
    company: {
        establishment: { type: Number, required: true },
        table: { type: Number, required: true },
        user: { type: Number, required: true },
    },
    totalPrice: Number,
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.NEW,
    },
    deleted: { type: Boolean, default: false },
});


OrderSchema.set("timestamps", true);

OrderSchema.pre('save', function (next) {
    this.__v = this.__v + 1;
    this.updatedAt = new Date();
    next();
});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;
