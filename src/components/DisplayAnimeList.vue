<script setup lang="ts">
import { ref, watch , onMounted } from 'vue';
import '../CSS/SearchAnime .css';
import type {DataList} from './SearchAnime.vue';


const props = defineProps<{
  dataList: DataList;
}>()

const localDataList = ref<DataList | null>(null);

// props.dataListが変更されたときにローカルのデータにコピー
watch(() => props.dataList, (newVal) => {
  localDataList.value = newVal;
});

// localDataListが変更されたときにコンソールに出力
watch(localDataList, (newVal) => {
  console.log(newVal);
});

// コンポーネントがマウントされたときに初期データをセット
localDataList.value = props.dataList;


function openWindow(url:string):void{
  window.open(url);
}
</script>

<template>
  <div className="display-list">
    <div v-for="list in props.dataList.data" 
    :key="list.mal_id"  className="anime-item"
    @click="openWindow(list.url)"
    >
      <div className="anime-img"><img :src="list.images.jpg.image_url"></div>
      <div className="anime-item-text">
        <div className="anime-container">
          <p>{{ list.year }}</p>
          <p>{{ list.type }}</p>
        </div>
        <h2 className="anime-title">{{ list.title_japanese }}</h2>
      </div>
    </div>
  </div>
</template>

<style>

</style>