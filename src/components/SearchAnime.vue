<script setup lang="ts">
import { ref, watch } from 'vue';
import DisplayAnimeList from './DisplayAnimeList.vue';
import '../CSS/SearchAnime .css';

  type DataList = {
      data: {
      url:string;
      images:{jpg:{image_url:string}};
      year:string;
      type:string;
      title_japanese:string;
      mal_id:number
    }[]
  }
  type GetAnimeList = (name:string) => Promise<DataList>;
  type SearchAnime = (event:MouseEvent) => void;

  export type {DataList};

  const list    = ref<DataList>();
  const looding = ref<boolean>();
  const searchVal   = ref<string>();

  const getAnimeList:GetAnimeList = async(name) => {
    try {
      // ロードアニメーション用
      await new Promise((resolve,reject) => {
        looding.value = true;
        resolve('');
      })

      await new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve('');
        }, 500);
      })

      const result = await fetch(`https://api.jikan.moe/v4/anime?q=${name}&sfw`);
      result ? looding.value = false : looding.value = true;

      return result.json();

    }catch(err){
      console.error(err)
    }
  }

  
  const searchAnime:SearchAnime = (event) => {
    const input = (event.target as HTMLElement).closest('div')?.querySelector('input') as HTMLInputElement;

    if(input.value.replace(/\s+/g, "") !== ''){
      searchVal.value = input.value;

    }else {
      alert('検索したいアニメの名前を入力してください');
    }
  }

  watch(searchVal,(newVal) => {
    if(typeof(newVal) == 'string'){
      getAnimeList(newVal).then(res => {
        list.value = res;
      })
    }
  })

  watch(list,() => {
    console.log(list)
  })


</script>

<!-- <script lang="ts">
export type DataList = {
      data: {
      url:string;
      images:{jpg:{image_url:string}};
      year:string;
      type:string;
      title_japanese:string;
      mal_id:number
    }[]
  }

</script> -->

<template>
  <div className="search-anime wrap">
      アニメ検索アプリケーション(MyAnimeListより)
        <div className="search-anime-content">
          <p className="anime-content-text">検索したいアニメの名前を入力してください</p>
          <input type="text" placeholder="例）ドラゴンボール"/>
          <button type="button" className="search-btn" @click="searchAnime">
            検索
          </button>
          <div v-if="looding" className="load-wrap">
            <p className="load-text">Loading</p>
            <div className="load-icon">
              <svg width="58" height="58" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(2 1)"  stroke-width="1.5"><circle cx="42.601" cy="11.462" r="5" fill-opacity="1" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="1;0;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="49.063" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;1;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="42.601" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;1;0;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="27" cy="49.125" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;1;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="11.399" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;1;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="4.938" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;1;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="11.399" cy="11.462" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;1;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="27" cy="5" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;0;1" calcMode="linear" repeatCount="indefinite" /></circle></g></g></svg>
            </div>
          </div>
          <div v-else>
            <DisplayAnimeList v-if="list && list !== null" :dataList="list"/>
          </div>
        </div>
      </div>
</template>

<style>
  .search-btn {
    margin-left: 10px;
  }
</style>