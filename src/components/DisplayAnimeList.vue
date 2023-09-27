<script setup lang="ts">
import { ref, watch , onMounted } from 'vue';
type PropsDataList = {
  data: {
    url: string;
    images: { jpg: { image_url: string } };
    year: string;
    type: string;
    title_japanese: string;
    mal_id: number;
  }[];
}
type DataList = {
  data: {
    url: string;
    images: { jpg: { image_url: string } };
    year: string;
    type: string;
    title_japanese: string;
    mal_id: number;
  }[];
}

const props = defineProps<{
  dataList: PropsDataList;
}>()

const localDataList = ref<PropsDataList | null>(null);

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
</script>

<template>
  <div className="display-list">
    <div  className="anime-item">
      <div className="anime-img"><img></div>
      <div className="anime-item-text">
        <div className="anime-container">
          <p></p>
          <p></p>
        </div>
        <h2 className="anime-title"></h2>
      </div>
    </div>
  </div>
</template>

<style>

</style>