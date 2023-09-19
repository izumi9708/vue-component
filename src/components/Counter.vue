<script setup lang="ts">
import { ref } from "vue";

const countNum = ref(0);

function removeCount(){
  if(countNum.value > 0){
    countNum.value = countNum.value - 1; 
  }
}

function addCount() {
  countNum.value = countNum.value + 1;
}
</script>

<template>
    <div className="number-list wrap">
      カウンター
      <div class="content-wrap">
        <p>{{countNum}}</p>
        <div class="btn-wrap">
          <button type="button" class="remove" @click="removeCount">減らす</button>
          <button type="button" class="add" @click="addCount">増やす</button>
        </div>
      </div>
    </div>
</template>

<style>
.btn-wrap button.add {
  margin-left: 10px;
}
</style>
