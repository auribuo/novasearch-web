<script async setup lang="ts">
import {useMessage, useLoadingBar} from "naive-ui";
import GalaxyList from "../components/GalaxyList.vue";
import {Galaxy} from "../shared/types/Galaxy";
import {ChunkFetcher} from "../shared/ChunkFetcher";
import {useGalaxyRepo} from "../shared/GalaxyRepo";
import {AxiosError} from "axios";

const loadingBar = useLoadingBar();

let fetcher: ChunkFetcher<Galaxy> | undefined;

const {getGalaxies} = useGalaxyRepo();

loadingBar.start();

const galaxyResponse = await getGalaxies();

const message = useMessage();

if (galaxyResponse instanceof Error) {
  message.error("Failed to load galaxies: " + (galaxyResponse as AxiosError).message);
  loadingBar.error();
} else {
  fetcher = ChunkFetcher.new(galaxyResponse.galaxies);
  loadingBar.finish();
}

</script>

<template>
  <Suspense>
    <GalaxyList :fetcher="fetcher"/>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <!--  <n-tabs type="line" default-value="list" size="large" justify-content="space-evenly" animated>
      <n-tab-pane name="list" tab="List">

      </n-tab-pane>
      <n-tab-pane name="plot" tab="Plot">
        <Suspense>
          <GalaxyPlot/>
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </n-tab-pane>
    </n-tabs>-->
</template>