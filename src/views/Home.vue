<template>
  <div>
    <header>Mi Blog </header>
    <div class="container">
      <div v-for="post in postStore.posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img :src="'https://picsum.photos/' + post.id" alt="Imagen de ejemplo" />

        <div class="buttons">
          <!-- Botón de Subir PDF (Personalizado) -->
          <label :for="'pdf-upload-' + post.id" class="upload-btn">
            📄 Subir PDF
          </label>
          <input
            type="file"
            :id="'pdf-upload-' + post.id"
            accept="application/pdf"
            style="display: none"
            @change="handleFileUpload($event, post.id)"
          />

          <!-- Botón de Ver más -->
          <router-link :to="'/post/' + post.id">
            <button class="view-more-btn">Ver más</button>
          </router-link>
        </div>

        <!-- Muestra el nombre del archivo si ya se subió -->
        <p v-if="pdfFiles[post.id]" class="pdf-info">
          Archivo subido: {{ pdfFiles[post.id]?.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePostStore } from '../stores/posts';

const postStore = usePostStore();
const pdfFiles = ref<{ [key: number]: File | null }>({});

onMounted(() => postStore.fetchPosts());

// Función para manejar la subida del archivo
const handleFileUpload = (event: Event, postId: number) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    // Verificar que el archivo no exceda los 4MB
    if (file.size > 4 * 1024 * 1024) {
      alert("El archivo PDF no debe superar los 4MB.");
      return;
    }

    pdfFiles.value[postId] = file;

    // Simulación de subida
    alert(`PDF "${file.name}" subido correctamente para el post ${postId}.`);
  }
};
</script>
