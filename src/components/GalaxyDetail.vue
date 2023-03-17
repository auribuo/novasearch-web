<script setup lang="ts">
import {NDescriptions, NDescriptionsItem} from "naive-ui";
import {Galaxy} from "../shared/types/Galaxy";
import {computed} from "vue";

const props = defineProps<{
  galaxy: Galaxy | undefined;
}>();

const galaxy = computed(() => {
  return props.galaxy;
});
</script>

<template>
  <n-descriptions size="large" label-placement="top" title="Specifications" :columns="1">
    <n-descriptions-item label="UGC Number">{{ galaxy?.id }}</n-descriptions-item>
    <n-descriptions-item label="Preferred name">{{ galaxy?.preferredName }}</n-descriptions-item>
    <n-descriptions-item label="Morphology">{{ galaxy?.morphology }}</n-descriptions-item>
    <n-descriptions-item label="Coordinates">
      Elevation:
      {{ galaxy?.azimuthalCoordinates?.elevation === 0 ? "unknown" : galaxy?.azimuthalCoordinates?.elevation }}
      <br>
      Azimuth:
      {{ galaxy?.azimuthalCoordinates.azimuth === 0 ? "unknown" : galaxy?.azimuthalCoordinates.azimuth }}
    </n-descriptions-item>
    <n-descriptions-item label="Magnitude">{{ galaxy?.magnitude }}</n-descriptions-item>
    <n-descriptions-item label="Semi Axis">
      Semi major axis:
      {{ galaxy?.semiMajorAxis }}
      <br>
      Semi minor axis:
      {{ galaxy?.semiMinorAxis }}
    </n-descriptions-item>
  </n-descriptions>
</template>