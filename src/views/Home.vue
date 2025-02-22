<template>
  <div>
    <header>Mi Blog</header>
    <div class="container">
      <div v-for="post in postStore.posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <img :src="'https://picsum.photos/' + post.id" alt="Imagen de ejemplo" />

        <div class="buttons">
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

          <router-link :to="'/post/' + post.id">
            <button class="view-more-btn">Ver más</button>
          </router-link>

          <button
            v-if="postStore.uploadedFiles[post.id]"
            class="view-pdf-btn"
            @click="abrirPdf(post.id)"
          >
            📂 Ver PDF
          </button>
        </div>

        <p v-if="postStore.uploadedFiles[post.id]" class="pdf-info">
          Archivo guardado y disponible.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Swal from "sweetalert2";
import { usePostStore } from "../stores/posts";

const postStore = usePostStore();

onMounted(() => {
  postStore.fetchPosts();
  postStore.loadUploadedFiles(); 
});

const handleFileUpload = (event: Event, postId: number) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    if (file.size > 4 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Error al subir el archivo",
        text: "El archivo PDF no debe superar los 4MB.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    postStore.uploadFile(postId, file);

    Swal.fire({
      icon: "success",
      title: "PDF subido con éxito",
      text: `El archivo "${file.name}" ha sido guardado correctamente.`,
      confirmButtonColor: "#3085d6",
    });
  }
};

const abrirPdf = (postId: number) => {
  if (postStore.uploadedFiles[postId]) {
    window.open(postStore.uploadedFiles[postId], "_blank");
  }
};
</script>
