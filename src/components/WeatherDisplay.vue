<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import WeatherSubDisplay from './WeatherSubDisplay.vue';
import type { WeatherType } from './SearchWeather.vue';

  interface FutureList {
    list:{
      dt_txt:string;
      main:{
        temp:number;
        temp_max:number;
        temp_min:number;
      };
      weather:{
        icon:string
      }[]
    }[]
  }
  export type { FutureList };
  type GetFutureData = (lat:number,lon:number) => Promise<FutureList>;

  const props = defineProps<{
    currentData:WeatherType
  }>()

  const futureData = ref<FutureList>();

  const date  = new Date();
  const month = date.getMonth() + 1;
  const day   = date.getDate();
  const iconUrl = `https:/\/openweathermap.org/img/wn/${props.currentData.weather[0].icon}@2x.png`;

  const getFutureData:GetFutureData = async(lat,lon) => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&&appid=5e97d352a6506604ac5ad5d7e3635764`)

      return result.json();
    }catch(error){
      console.error(error)
    }
  }
  
  watchEffect(() => {
    getFutureData(props.currentData.coord.lat,props.currentData.coord.lon)
    .then(res => futureData.value = res);
  })
  
</script>

<template>
  <div class="weather-display-wrap">
    <div class="current-weather">
      <div class="main-weather">
        <div class="main-container">
          <span class="current-date">{{ `${month}月${day}日` }}</span>
          <h2 class="city-name">{{ props.currentData.name }}</h2>
          <div class="main-container-item">
            <div class="main-weather-icon"><img :src="iconUrl"></div>
            <p class="main-weather-temp">{{ Math.round(props.currentData.main.temp) }}℃</p>
          </div>
        </div>
        <div class="sub-container">
          <div class="sub-container-item">
            <div class="wind">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>
              {{ props.currentData.wind.speed }}m/s
            </div>
            <div class="location">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
              {{ props.currentData.coord.lat }},{{ props.currentData.coord.lon }}
            </div>
          </div>
          <div class="sub-container-item">
            <div class="high-temp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M680-520v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM320-120q-83 0-141.5-58.5T120-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T320-120Zm-40-440h80v-160q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720v160Z"/></svg>
              {{ Math.round(props.currentData.main.temp_max) }}℃
            </div>
            <div class="low-temp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-640v-80h320v80H560ZM320-120q-83 0-141.5-58.5T120-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T320-120ZM200-320h240q0-29-12.5-54T392-416l-32-24v-280q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720v280l-32 24q-23 17-35.5 42T200-320Z"/></svg>
              {{ Math.round(props.currentData.main.temp_min) }}℃
            </div>
          </div>
        </div>
      </div>
      <WeatherSubDisplay
        v-if="futureData && futureData !== null"
        :currentDate="date"
        :futureData="futureData"
      />
    </div>
  </div>
</template>

<style>
  .weather-display-wrap .main-weather {
    margin-top: 10px;
  }
  .weather-display-wrap .current-date {
    font-size: 1.4rem;
    color: #d67d0e;
  }
  .weather-display-wrap .main-weather {
    display: flex;
    align-items: center;
    background-color: #e3e3e3;
    padding: 10px;
    border-radius: 10px;
  }
  .weather-display-wrap h2 {
    font-size: 2rem;
  }
  .weather-display-wrap .main-container-item {
    display: flex;
    align-items: center;
  }
  .weather-display-wrap .main-weather-icon {
    width: 50px;
  }
  .weather-display-wrap .main-weather-temp {
    font-size: 2.5rem;
  }
  .weather-display-wrap svg {
    width: 18px;
    vertical-align: text-bottom;
  }
  .weather-display-wrap .sub-container {
    margin-left: 30px;
    border-left: solid 3px #d67d0f;
    padding-left: 5px;
  }
  .weather-display-wrap .sub-container-item {
    display: flex;
    align-items: center;
  }
  .weather-display-wrap .sub-container .sub-container-item:last-of-type {
    margin-top: 5px;
  }
  .weather-display-wrap .sub-container-item div:last-of-type {
    margin-left: 10px;
  }
</style>