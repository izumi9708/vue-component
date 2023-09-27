<script setup lang="ts">
import './CSS/Common.css';
import Counter from './components/Counter.vue';
import { ref } from 'vue';
import Todo from './components/Todo.vue';
import PostList from './components/PostList.vue';
import SearchGithubAccount from './components/SearchGithubAccount.vue';
import SearchAnime from './components/SearchAnime.vue';


</script>

<template>
  <div class="app-wrapper">
    <Counter/>
    <Todo/>
    <PostList/>
    <SearchGithubAccount/>
    <SearchAnime/>
  </div>
</template>

<style scoped>
 
</style>
