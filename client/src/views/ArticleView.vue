<template>
  <div>
    <CardComponent
      :article="article"
      @update="updateArticle"
      @delete="deleteArticle"
    />
  </div>
</template>

<script>
import axios from "axios";
import CardComponent from "@/components/CardComponent.vue";

export default {
  data() {
    return {
      article: {
        _id: null,
        content: null,
        createdAt: null,
        __v: 0,
      },
    };
  },
  created() {
    this.findOneArticleById();
  },
  methods: {
    async findOneArticleById() {
      const articleId = this.$route.params.id;
      const { data } = await axios.get(
        `http://localhost:3000/read/${articleId}`
      );
      this.article = data;
    },
    async updateArticle({ content }) {
      this.article.content = content;
    },
    async deleteArticle() {
      const articleId = this.$route.params.id;
      await axios.delete(`http://localhost:3000/delete/${articleId}`);
      this.$router.push({ name: "home" });
    },
  },
  components: { CardComponent },
};
</script>

<style scoped>
.article-edit-textarea {
  width: 300px;
  height: 100px;
}
.card {
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.content {
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
}

.created-at {
  font-size: 12px;
  margin-right: 20px;
}
</style>
