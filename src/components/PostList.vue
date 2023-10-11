<script setup lang="ts">
import {ref,watchEffect} from 'vue';
import { getList } from './getList';

type Data = {
  body:string;
  userId:number;
  title:string;
  id:number;
}

  const data = ref<Data[]>([]);

  watchEffect(() => {
    getList().then(res => {
      res.filter((val,id) => id < 11 ? data.value.push(val) : '');
    })
  })

  const toggleList = (event:MouseEvent) => {
    const detailWrap = (event.target as HTMLElement).closest('li')?.querySelector('.list-detail-wrap')!;

    if(detailWrap.classList.contains('hide-wrap')){
      detailWrap.classList.remove('hide-wrap');
    }else {
      detailWrap.classList.add('hide-wrap');
    }
  }
</script>

<template>
  <div className="todo-list wrap">
      投稿リスト
      <p class="list-explanation">リストをクリックすると詳細が表示されます</p>
      <ul>
        <li v-for="list in data">
          <p class="list-title" @click="toggleList">{{ list.title }}</p>
          <div class="list-detail-wrap hide-wrap">
            <p class="list-user-id">userId:{{ list.userId }}</p>
            <p>{{ list.body }}</p>
          </div>
        </li>
      </ul>
  </div>
</template>

<style scoped>
  .todo-list li {
    list-style: none;
    border: solid 1px #b5b5b5;
    padding: 5px;
    border-radius: 5px;
    margin-top: 10px;
  }
  .list-explanation {
    font-size: 1.4rem;
    color: #7d7d7d;
  }
  .list-title {
    font-weight: bold;
    margin: 3px 0;
    cursor: pointer;
  }
  .list-user-id {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  .hide-wrap {
    display: none;
  }
</style>