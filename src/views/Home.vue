<template>
  <div>
    <header>Mi Blog Minimalista</header>
    <div class="container">
      <div v-for="post in postStore.posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img src="https://via.placeholder.com/600x300" alt="Imagen de ejemplo" />

        <router-link :to="'/post/' + post.id">
          <button>Ver más</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostStore } from '../stores/posts';

const postStore = usePostStore();
onMounted(() => postStore.fetchPosts());
</script>

