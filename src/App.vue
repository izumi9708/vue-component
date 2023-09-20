<script setup lang="ts">
import './CSS/Common.css';
import Counter from './components/Counter.vue';
import { ref } from 'vue';
import Todo from './components/Todo.vue';


</script>

<template>
  <div class="app-wrapper">
    <Counter/>
    <Todo/>
  </div>
</template>

<style scoped>

</style>
