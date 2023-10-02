<script setup lang="ts">
import { ref, watch } from 'vue';

  const props = defineProps<{
    futureData:any
    currentDate:any
  }>()

  const propsData = ref();
  const futureData = ref([]);

  const createFutureObj = (newData:any) => {
    futureData.value = [];
    const futureObj:any = {};

    const futureDateArray = newData.list.filter(item => {
      const futureDate = new Date(item.dt_txt);
      
      if(futureDate.getDate() > props.currentDate.getDate()){
        return item;
      }
    })

    futureDateArray.forEach(item => {
      const dateString = item.dt_txt.substr(0,item.dt_txt.indexOf(' '));

      if(!futureObj[dateString]){
        futureObj[dateString] = [item];
      }else {
        futureObj[dateString] = [...futureObj[dateString],item];
      }
    });

    Object.keys(futureObj).forEach(objItem => {
      const TempArray:number[] = [];
      const value = futureObj[objItem]
      
      Object.keys(value).forEach(childItem => {
        TempArray.push(value[childItem].main.temp);
      })

      const maxTemp = TempArray.reduce((prev,next) => Math.max(prev,next));
      const minTemp = TempArray.reduce((prev,next) => Math.min(prev,next));
      
      if(value[4]){
        const valueDate = new Date(value[4].dt_txt);
        const valueMonth = valueDate.getMonth() + 1;
        const valueDay   = valueDate.getDate();

        value[4].dt_txt = `${valueMonth}月${valueDay}日`;
        value[4].weather[0].icon = `https:/\/openweathermap.org/img/wn/${value[4].weather[0].icon}@2x.png`
        value[4].main.temp_max = maxTemp;
        value[4].main.temp_min = minTemp;

        futureData.value.push(value[4]);
      }
    })
  }

  watch(() => props.futureData,(newData) => {
    propsData.value = newData
  })

  watch(propsData,(newData) => {
    createFutureObj(newData)
  })

  propsData.value = props.futureData;
  console.log(futureData.value)
  
</script>

<template>
<div class="sub-weather">
  <p class="sub-text">翌日以降の天気</p>
  <div class="sub-weather-item" v-for="data in futureData">
    {{ console.log(data)}}
    <p class="future-date">{{ data.dt_txt }}</p>
    <div class="future-icon"><img :src="data.weather[0].icon"></div>
    <p class="future-temp">{{ Math.round(data.main.temp_max) }}/{{ Math.round(data.main.temp_min) }}℃</p>
  </div>
</div>
</template>

<style>
.sub-weather {
  margin-top: 20px;
}
.sub-weather .future-icon {
  width: 40px;
  margin-left: 40px;
}
.sub-weather .sub-weather-item {
  display: flex;
  align-items: center;
  background-color: #e3e3e3;
  padding: 0px 5px;
  border-radius: 6px;
  margin-top: 10px;
}
.sub-weather .future-temp {
  margin-left: 10px;
}
</style>