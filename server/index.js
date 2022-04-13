require('dotenv').config();

const express = require('express');
const cors = require('cors');
const API = require('./api');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json()); // POST를 사용할 경우 req.body의 payload를 access할 수 있다. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.

app.get('/', (req, res) => {
  res.send('Hello Fullstack app!');
});

app.post('/create', API.Article.createArticle);
app.get('/read', API.Article.readArticle);
app.get('/read/:id', API.Article.findOneArticle);
app.patch('/update', API.Article.updateArticle);
app.delete('/delete/:id', API.Article.deleteArticle);

app.listen(PORT, 'localhost', () => {
  /* eslint-disable no-console */
  console.log(`Bulletin Board App listening on port ${PORT}`);
});
