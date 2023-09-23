<script setup lang="ts">
import { ref, watch } from 'vue';

  const infoResolveData = ref<ResolveObj|null>();
  const infoRejectData  = ref<RejectObj|null>();
  const refId           = ref<string>();
  const looding         = ref<boolean>();

  type searchAccountInfoMold = (event:MouseEvent) => void;
  const searchAccountInfo:searchAccountInfoMold = (event) => {
    const input = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;

    refId.value = input.value;

  }

  watch(refId,(newId) => {
    if( newId !== '' && typeof(newId) == 'string' ){
      getAcountInfo(newId).then(res => {
        if('name' in res){
          infoRejectData.value = null;
          infoResolveData.value = res;
        }else {
          infoResolveData.value = null;
          infoRejectData.value = res;
        }
      })
      .catch(error => {
        alert('通信が失敗しました');
      })
      
    }else {
      alert('idが入力されていません');
    }
  })

  type ResolveObj = {
    name:string;
    avatar_url:string;
    html_url:string;
    public_repos:string;
  }
  type RejectObj = {
    message:string;
  }
  type GetAcountInfoMold = (id:string) => Promise<ResolveObj|RejectObj>;
  const getAcountInfo:GetAcountInfoMold = async(id:string) => {
    try {

      await new Promise((resolve,reject) => {
        looding.value = true;
        resolve('');
      })

      await new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve('');
        }, 1000);
      })

      const result = await fetch(`https://api.github.com/users/${id}`);
      result ? looding.value = false : looding.value = true;
      
      return result.json();

    }catch(error) {
      alert('通信が失敗しました');
    }
  }

</script>

<template>
  <div className="search-account-list wrap">
      <span className="github-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">{/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
      </span>
      Githubアカウント検索
      <div class="search-account-wrap">
        <div class="search-input-wrap">
          <input type="text" placeholder="ユーザーIDを入力してください">
          <button type="button" @click="searchAccountInfo($event)">検索</button>
        </div>
        <div v-if="looding">
          <div className="load-wrap">
            <p className="load-text">Loading</p>
            <div className="load-icon">
              <svg width="100%" height="100%" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(2 1)"  stroke-width="1.5"><circle cx="42.601" cy="11.462" r="5" fill-opacity="1" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="1;0;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="49.063" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;1;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="42.601" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;1;0;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="27" cy="49.125" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;1;0;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="11.399" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;1;0;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="4.938" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;1;0;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="11.399" cy="11.462" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;1;0" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="27" cy="5" r="5" fill-opacity="0" ><animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;0;1" calcMode="linear" repeatCount="indefinite" /></circle></g></g></svg>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="account-information" v-if="infoResolveData">
            <div class="info-img"><img :src="infoResolveData.avatar_url"></div>
            <div class="info-text">
              <p class="info-name" v-if="infoResolveData.name">{{ infoResolveData.name }}</p><p class="info-name" v-else>名前なし</p>
              <p class="info-item">URL：<a :href="infoResolveData.html_url" target="_blank" class="info-text-url" v-if="infoResolveData.html_url">{{ infoResolveData.html_url }}</a><a class="info-text-url" v-else>なし</a></p>
              <p class="info-item">公開リポジトリ：<span class="info-text-content" v-if="infoResolveData.public_repos">{{ infoResolveData.public_repos }}</span><span class="info-text-content" v-else>なし</span></p>
            </div>
          </div>
          <div class="account-information" v-else-if="infoRejectData">
            <p>アカウントが存在しません</p>
          </div>
        </div>

        </div>
  </div>
</template>

<style>
.search-account-list .github-icon {
  width: 25px;
  display: inline-block;
  vertical-align: middle;
}
.search-account-list svg {
  width: 100%;
}
.search-account-list button {
  margin-left: 10px;
}
.search-account-list input {
  width: 230px;
}
.search-account-list .account-information {
  display: flex;
  margin-top: 15px;
}
.search-account-list .info-name {
  font-size: 1.8rem;
  font-weight: bold;
}
.search-account-list .info-text-content {
  font-weight: bold;
}
.search-account-list .info-item {
  margin-top: 2px;
}
.search-account-list .info-text {
  margin-left: 15px;
}
.info-img {
  width: 60px;
  height: 100%;
  border-radius: 100px;
  border: solid 1px #c4c4c4;
}
.info-img img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
}
.load-wrap {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.load-icon {
  width: 20px;
  height: 17px;
  margin-left: 5px;
}
.load-icon svg {
  stroke: #009688;
}
.load-text {
  color: #009688;
  font-weight: bold;
}
.load-icon svg circle {
  fill: #009688;
}

</style>