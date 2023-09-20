<script setup lang="ts">
// Vue.jsとTypeScriptを使用して、簡単なカウンターアプリケーションを作成してください。
// カウンターアプリケーションのコンポーネントを作成します。コンポーネントの名前は Counter とします。
// コンポーネント内には、カウンターの現在の値を表示するためのテキストが表示されます。
// ボタンを2つ配置し、1つはカウントを増やすための「増やす」ボタン、もう1つはカウントを減らすための「減らす」ボタンとします。
// ページを開いたときにカウンターの値は0から始まります。
// 「増やす」ボタンをクリックすると、カウンターの値が1ずつ増加します。
// 「減らす」ボタンをクリックすると、カウンターの値が1ずつ減少します。
// カウンターの値は0未満にはならないようにします。
// カウンターの値が変更されるたびに、その値が表示されるテキストも更新されます。

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
