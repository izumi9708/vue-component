<script setup lang="ts">
import { ref } from "vue";

const taskList = ref([
  { "id": 1, "title": "タスク1" },
  { "id": 2, "title": "タスク2" },
  { "id": 3, "title": "タスク3" }
]);

type CompletedTask = (event:MouseEvent,str:string) => void
const completedTask:CompletedTask = (event,str) => {
  const completedNum =(event.target as HTMLElement).closest('li');
  const changeArr = taskList.value.filter(item => item.id !== Number(completedNum?.id));

  if(str === 'complete'){
    setTimeout(() => {
      taskList.value = changeArr;
    }, 500);

  }else {
    taskList.value = changeArr;
  }
}


type AddTask = (event:MouseEvent) => void;
const addTask:AddTask = (event) => {
  const inputValue = (document.querySelector('.todo-list input[type="text"]') as HTMLInputElement)?.value;

  if(inputValue.replace(/\s+/g, "") !== ''){
    const addId = (taskList.value[taskList.value.length - 1].id) + 1;

    taskList.value.push({id:addId,title:inputValue});
  }else {
    alert('タスク名を入力してください');
  }
}

</script>

<template>
  <div className="todo-list wrap">
      Todo
      <div class="task-wrap">
        <div class="todo-add-wrap">
          <input type="text" placeholder="タスクを追加">
          <button type="button" class="todo-add-btn" @click="addTask">追加</button>
        </div>
        <ul>
          <li v-for="todo in taskList" :key="todo.id" :id="String(todo.id)">
            <input type="checkbox" @change="completedTask($event,'complete')">
            {{todo.title}}
            <span class="task-delete" @click="completedTask($event,'delte')">×</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<style scoped>
.todo-list li {
    list-style: none;
    border: solid 1px #bebebe;
    padding: 3px 5px;
    border-radius: 5px;
    margin-top: 10px;
    position: relative;
}
.todo-list input[type="checkbox"] {
  accent-color: #009688;
}
.todo-list button {
  margin-left: 10px;
}
.todo-list input[type="text"] {
  background-color: #ececec;
  border-radius: 5px;
  border: solid 1px #a5a5a5;
}
.todo-list .task-delete {
  padding: 0 5px;
  border-radius: 3px;
  background-color: #0d6159;
  color: #fff;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
}
</style>