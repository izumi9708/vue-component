<script setup lang="ts">
import { ref, watch } from 'vue';
import WeatherDisplay from './WeatherDisplay.vue';

  interface WeatherType {
    cod:number;
    coord:{
      lat:number
      lon:number
    };
    main:{
      temp:number
      temp_min:number
      temp_max:number
    };
    name:string;
    weather:[{
      id:number
      icon:string
    }];
    wind:{
      speed:number
      deg:number
    };
  }
  interface NotFoundCity {
    cod:string;
    message:string
  }
  export type {WeatherType,NotFoundCity};
  type GetCurrentWeather = (val:string) => Promise<WeatherType|NotFoundCity>;
  type ClickSearch = (event:MouseEvent) => void; 

  const input = ref<string>();
  const currentData = ref<WeatherType>();
  const notFoundData = ref<NotFoundCity>()
  const looding = ref();

  const getCurrentWeather:GetCurrentWeather = async(inputValue) => {
    try{
      await new Promise<void>((resolve, reject) => {
        looding.value = true;
        resolve();
      })

      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })

      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&lang=ja&appid=5e97d352a6506604ac5ad5d7e3635764`)

      
      looding.value = false;

      return result.json();

    }catch(error){
      alert('通信に失敗しました');
    }
  }

  const clickSearch:ClickSearch = (event) => {
    const inputElem = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;

    if(inputElem.value.replace(/\s+/g, "") !== ''){
      input.value = inputElem.value;

    }else {
      alert('都市名を入力してください');
    }
  }


  watch(input,(value) => {
    if(value){
      getCurrentWeather(value).then(res => {
        if('cod' in res && res.cod == 200){
          currentData.value = res as WeatherType;
          notFoundData.value = undefined;
        }else {
          notFoundData.value = res as NotFoundCity;
        }
      })
    }
  })
  
  
</script>

<template>
  <div className="weather-forecast wrap">
    天気予報アプリケーション
    <div class="weather-content">
      <div class="input-wrap">
        <input type="text" placeholder="例）東京またはtokyo">
        <button type="button" @click="clickSearch">検索</button>
      </div>
      <div v-if="looding">
        <div className="load-wrap">
          <div className="load-icon">
            <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd" stroke-width="3"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg>
          </div>
          <p className="load-text">天気情報を取得しています</p>
        </div>
      </div>
      <div v-else>
        <div v-if="notFoundData && notFoundData !== null">
          入力されたキーワードの地名が見つかりませんでした。<br>
          日本語で入力している場合は半角英字で入力すると検索できる場合があります。
        </div>
        <div v-else>
          <WeatherDisplay v-if="currentData && currentData !== null" :currentData="currentData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.weather-forecast button {
  margin-left: 10px;
}
.weather-forecast .load-wrap {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.weather-forecast .load-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.weather-forecast .load-icon svg {
  stroke: #009688;
}
.weather-forecast .load-text {
  color: #009688;
  font-weight: normal;
  font-size: 1.4rem;
}
.weather-forecast .load-icon svg circle {
  fill: none;
}

</style>