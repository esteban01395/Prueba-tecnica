import { defineStore } from "pinia";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UploadedFile {
  [key: number]: string; 
}

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [] as Post[],
    uploadedFiles: JSON.parse(localStorage.getItem("uploadedFiles") || "{}") as UploadedFile, 
  }),

  actions: {
    async fetchPosts() {
      const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
      this.posts = response.data;
    },

    uploadFile(postId: number, file: File) {
      // Crear una URL para el archivo PDF
      const fileUrl = URL.createObjectURL(file);
      this.uploadedFiles[postId] = fileUrl;

      // Guardar en localStorage para persistencia
      localStorage.setItem("uploadedFiles", JSON.stringify(this.uploadedFiles));
    },

    loadUploadedFiles() {
      this.uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "{}");
    }
  }
});
