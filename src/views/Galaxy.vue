<script async setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, ref, Ref} from "vue";
import {NResult, NButton, useLoadingBar, NDescriptions, NDescriptionsItem, NDivider} from "naive-ui";
import {Galaxy} from "../shared/types/Galaxy";
import {useGalaxyRepo} from "../shared/GalaxyRepo";

const route = useRoute();
const router = useRouter();
const galaxyId = route.params.id as string;

const loadingBar = useLoadingBar();
const galaxy: Ref<Galaxy | undefined> = ref();

const galaxyIdProvided = computed(() => galaxyId != undefined && galaxyId !== "none");

const galaxyLoaded = ref(false);

const {getGalaxy} = useGalaxyRepo();

if (galaxyIdProvided.value) {
  loadingBar.start();
  const response = await getGalaxy(galaxyId);
  if (response instanceof Error) {
    loadingBar.error();
  } else {
    galaxy.value = response.galaxies[0];
    loadingBar.finish();
  }
  galaxyLoaded.value = true;
  console.log(galaxy.value);
}
</script>

<template>
  <div v-if="galaxyIdProvided && galaxyLoaded">
    <div class="font-bold text-3xl">
      Galaxy UGC{{ galaxy?.id }} ({{ galaxy?.preferredName }})
    </div>
    <n-divider></n-divider>
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
    <div class="mt-5">
      <n-button @click="() => router.push('/galaxies/all')">Go back</n-button>
    </div>
  </div>
  <n-result v-if="!galaxyIdProvided && galaxyLoaded" status="404" title="Galaxy not found"
            :description="`Galaxy with id ${galaxyId === '' ? 'none' : galaxyId} not found`">
    <template #footer>
      <n-button @click="() => router.push('/galaxies/all')">Take me back</n-button>
    </template>
  </n-result>
</template>