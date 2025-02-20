<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <img src="https://via.placeholder.com/600x300" alt="Imagen de ejemplo" />
    <router-link to="/">Volver</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const route = useRoute();
const post = ref<Post | null>(null);

onMounted(async () => {
  const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`);
  post.value = response.data;
});
</script>
