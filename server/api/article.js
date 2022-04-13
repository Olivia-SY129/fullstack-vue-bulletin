const model = require('../mongoose/model');

// Create
const createArticle = async (req, res) => {
  const { content } = req.body;
  const newArticle = await model.Article({
    content,
  });
  const saveRequest = await newArticle.save();
  res.send(saveRequest);
};

// Read
const readArticle = async (req, res) => {
  const articles = await model.Article.find({});
  res.send(articles);
};

// Read/:id
const findOneArticle = async (req, res) => {
  const { id } = req.params;
  const article = await model.Article.findById(id);
  res.send(article);
};

// Update
const updateArticle = async (req, res) => {
  const { id, content } = req.body;
  const updatedArticle = await model.Article.findByIdAndUpdate(id, { content });
  res.send(updatedArticle);
};

// Delete
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  await model.Article.findByIdAndDelete(id);
  res.send(await model.Article.find({}));
};

module.exports = {
  createArticle,
  readArticle,
  findOneArticle,
  updateArticle,
  deleteArticle,
};
