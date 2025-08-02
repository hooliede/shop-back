const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 스키마 만들기
const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: "costomer", // 권한은 admin/costmer 2개
  },
}, {timestamps:true});


// 불필요 정보 제거
userSchema.methods.toJSON = function () {
    const obj = this._doc
    delete obj.password
    delete obj.__v
    delete obj.updateAt
    delete obj.createAt
    return obj
}


const User = mongoose.model("User", userSchema);
module.exports = User;

