<script setup lang="ts">
import { ref, watch } from 'vue';
import WeatherDisplay from './WeatherDisplay.vue';

  const input = ref();
  const currentData = ref();
  const looding = ref();

  const getCurrentWeather = async(inputValue:string) => {
    try{
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&lang=ja&appid=5e97d352a6506604ac5ad5d7e3635764`)

      return result.json();

    }catch(error){
      console.error(error);
    }
  }

  const clickSearch = (event:MouseEvent) => {
    const inputElem = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;

    if(inputElem.value.replace(/\s+/g, "") !== ''){
      input.value = inputElem.value;

    }else {
      alert('都市名を入力してください');
    }
  }


  watch(input,(value) => {
    getCurrentWeather(value).then(res => {
      currentData.value = res;
    })
  })
  
  
</script>

<template>
  <div className="weather-forecast wrap">
    天気予報アプリケーション
    <div class="weather-content">
      <div class="input-wrap">
        <input type="text" placeholder="例）tokyo">
        <button type="button" @click="clickSearch">検索</button>
      </div>
      <WeatherDisplay v-if="currentData && currentData !== null" :currentData="currentData"/>
    </div>
  </div>
</template>

<style>
.weather-forecast button {
  margin-left: 10px;
}
</style>