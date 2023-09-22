<script setup lang="ts">
import './CSS/Common.css';
import Counter from './components/Counter.vue';
import { ref } from 'vue';
import Todo from './components/Todo.vue';
import PostList from './components/PostList.vue';


</script>

<template>
  <div class="app-wrapper">
    <Counter/>
    <Todo/>
    <PostList/>
  </div>
</template>

<style scoped>

</style>
