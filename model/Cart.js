const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import User from './User';

// 스키마 만들기
const cartSchema = Schema(
  {
   userId: {
    type: mongoose.ObjectId, ref:User,

   }
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
