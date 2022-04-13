<template>
  <article class="card">
    <div v-if="!isEditing" class="content">{{ article.content }}</div>
    <textarea v-else class="article-edit-textarea" v-model="content"></textarea>
    <div class="created-at">
      {{ article.createdAt | moment("YYYY.M.D HH:mm") }}
    </div>
    <button v-if="isEditing" @click="updateArticle">수정</button>
    <button @click="toggleTextarea">{{ isEditing ? "취소" : "수정" }}</button>
    <button v-if="!isEditing" @click="deleteArticle">삭제</button>
    <button
      v-if="!isEditing && $route.params.id !== article._id"
      @click="moveToArticle"
    >
      게시글 이동
    </button>
  </article>
</template>
<script>
import moment from "vue-moment";
import axios from "axios";

moment;

export default {
  props: {
    article: {
      default: {
        content: null,
        createdAt: null,
        _id: null,
      },
    },
  },
  data() {
    return {
      isEditing: false,
      content: "",
    };
  },
  created() {},
  methods: {
    toggleTextarea() {
      this.isEditing = !this.isEditing;
    },
    async updateArticle() {
      const articleId = this.article._id;
      const { data } = await axios.patch(`http://localhost:3000/update`, {
        id: articleId,
        content: this.content,
      });
      if (!data) return;
      this.$emit("update", { _id: articleId, content: this.content });
      this.content = "";
      this.isEditing = !this.isEditing;
    },
    async deleteArticle() {
      if (!confirm("삭제하시겠습니까?")) {
        return;
      }
      const articleId = this.article._id;
      const { data } = await axios.delete(
        `http://localhost:3000/delete/${articleId}`
      );
      if (!data) return;
      this.$emit("delete", { _id: articleId });
    },
    moveToArticle() {
      this.$router.push({
        name: "article",
        params: {
          id: this.article._id,
        },
      });
    },
  },
};
</script>
<style scoped>
.card {
  margin-bottom: 30px;
  padding: 15px;
  box-shadow: 3px 3px 5px rgb(201, 201, 201), -3px 3px 5px rgb(201, 201, 201);
}
.content {
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
}

.created-at {
  font-size: 12px;
  margin-right: 20px;
  margin-bottom: 5px;
}

.card > button {
  margin-right: 5px;
}
</style>
