const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 스키마 만들기
const productSchema = Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 불필요 정보 제거
productSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
