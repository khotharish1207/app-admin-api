const mongoose = require("mongoose");

function getDeliveryDate() {
  var result = new Date();
  result.setDate(result.getDate() + 7);
  return result;
}

const OrderSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Why no name?"] },
    deliveryAddress: {
      type: String,
      required: [true, "Where should we deliver?"],
    },
    contact: {
      type: String,
      required: [true, "How to contact you?"],
      // unique: true,
      validate: {
        validator: function (v) {
          return /^[0]?[789]\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    item: { type: Number, required: [true, "Whats your order?"] },
    numberOfItems: {
      type: Number,
      default: 1,
      min: [1, "Must be at least 1, got {VALUE}"],
    },
    orderDate: { type: Date, default: Date.now },
    shouldDeliverDate: { type: Date, default: getDeliveryDate },
    dispatchId: { type: Number, default: null },
    image: { type: String },
    status: {
      type: String,
      enum: ["pending", "inProcess", "created", "dispatched"],
      default: "pending",
      message: "{VALUE} is not supported",
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Must be at least 0, got {VALUE}"],
    },
    payment: {
      type: String,
      enum: ["pending", "complete-cash", "complete-online"],
      default: "pending",
      message: "{VALUE} is not supported",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", OrderSchema);
