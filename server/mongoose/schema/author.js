const mongoose = require('mongoose');

// schema는 대문자를 사용
const Author = new mongoose.Schema({
  nickname: { type: String, default: '', required: true, unique: true },
  hashedPassword: { type: String, required: true }, // todos, 전처리
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = Author;
