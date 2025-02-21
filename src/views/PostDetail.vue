<template>
  <div class="post-container" v-if="post">
    <!-- Barra de navegación tipo directorio -->
    <nav class="breadcrumb">
      <router-link to="/" class="back-btn">⬅ Volver</router-link>
    </nav>

    <!-- Contenedor principal en forma de tarjeta -->
    <div class="post-card">
      <img class="post-image" src="https://picsum.photos/600/300" alt="Imagen de ejemplo" />
      <div class="post-content">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>
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
