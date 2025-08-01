const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import User from "./User";
import Product from "./Product";

// 스키마 만들기
const cartSchema = Schema(
  {
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
          default: 1,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// 불필요 정보 제거
cartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
