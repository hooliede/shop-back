const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import User from "./User";
import Product from "/Product";

// 스키마 만들기
const orderSchema = Schema(
  {
    shipTo: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: User,
    },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        size: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// 불필요 정보 제거
orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Order = mongoose.model("Cart", orderSchema);
module.exports = Order;
