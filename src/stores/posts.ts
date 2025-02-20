import { defineStore } from 'pinia';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UploadedFile {
  [key: number]: File;
}

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [] as Post[],
    uploadedFiles: {} as UploadedFile
  }),
  actions: {
    async fetchPosts() {
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
      this.posts = response.data;
    },
    uploadFile(postId: number, file: File) {
      this.uploadedFiles[postId] = file;
    }
  }
});
