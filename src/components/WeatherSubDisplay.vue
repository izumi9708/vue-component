<script setup lang="ts">
import { ref, watch } from 'vue';

  const props = defineProps<{
    futureData:any
  }>()

  const propsData = ref();

  watch(() => props.futureData,(newData) => {
    propsData.value = newData
  })

  watch(propsData,(newData) => {
    console.log(newData)
  })

  propsData.value = props.futureData;
  
</script>

<template>
<div class="sub-weather">

</div>
</template>

<style>

</style>