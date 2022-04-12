const mongoose = require('mongoose');

// schema는 대문자를 사용
const Article = new mongoose.Schema({
  // author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
  content: { type: String, default: '', required: true }, // 게시글 본문
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = Article;
