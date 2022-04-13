<template>
  <div class="home">
    <h1>게시판</h1>
    <div class="new-article">
      <h2>새 글 작성하기</h2>
      <textarea class="new-article-textarea" v-model="newContent"></textarea>
      <div>
        <button class="submit-btn" @click="createArticle">포스팅</button>
      </div>
    </div>
    <CardComponent
      v-for="article in articles"
      :key="article._id"
      :article="article"
      @update="updateArticle"
      @delete="deleteArticle"
    />
  </div>
</template>

<script>
import axios from "axios";
import CardComponent from "@/components/CardComponent";

export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      newContent: "",
      articles: [
        {
          _id: "6254eeab9d45645c24022d4d",
          content: "룰루 비데",
          createdAt: "2022-04-12T03:14:51.185Z",
          __v: 0,
        },
      ],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const { data } = await axios.get("http://localhost:3000/read");
      this.articles = data;
    },
    async createArticle() {
      if (this.newContent.length === 0) {
        alert("내용을 입력해주세요!");
        return;
      }

      const { data } = await axios.post("http://localhost:3000/create", {
        content: this.newContent,
      });

      alert("게시글이 작성되었습니다.");
      this.articles.push(data);
      this.newContent = "";
    },
    updateArticle({ _id, content: articleContent }) {
      const idx = this.articles.findIndex((article) => article._id === _id);
      if (idx > -1) {
        this.articles[idx].content = articleContent;
      }
    },
    deleteArticle({ _id }) {
      const idx = this.articles.findIndex((article) => article._id === _id);
      if (idx > -1) {
        this.articles.splice(idx, 1);
      }
    },
  },
};
</script>

<style scoped>
.new-article {
  margin-bottom: 20px;
}

.new-article-textarea {
  width: 300px;
  height: 100px;
  margin-bottom: 10px;
}
</style>
