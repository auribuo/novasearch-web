<script async setup lang="ts">
import {Galaxy} from "../shared/types/Galaxy";
import {NList, NListItem, NThing, NPagination, NBackTop, NDrawer, NDrawerContent} from "naive-ui";
import {computed, ref} from "vue";
import {ChunkFetcher} from "../shared/ChunkFetcher";
import GalaxyDetail from "./GalaxyDetail.vue";

const searchValue = ref("");

const detailGalaxy = ref<Galaxy | undefined>();

const props = defineProps<{
  fetcher: ChunkFetcher<Galaxy> | undefined;
}>();

let galaxies = computed(() => [] as Galaxy[]);
const page = ref(1);

const fetcher = props.fetcher;

if (fetcher) {
  fetcher.reset();
  galaxies = computed(() => {
    return props.fetcher ? fetcher.getPage(page.value) : [];
  });
}

const show = ref(false);

function showDetails(id: number) {
  detailGalaxy.value = fetcher?.all()
                              .find(g => g.id === id);
  show.value = true;
}

</script>

<template>
  <n-back-top :right="20"/>
  <div v-if="fetcher != null">
    <div class="text-2xl mb-5">
      Total galaxies: {{ fetcher.size() }}
    </div>
    <n-drawer v-model:show="show" :default-width="300" resizable>
      <n-drawer-content :title="'UGC '+detailGalaxy?.id" closable>
        <GalaxyDetail :galaxy="detailGalaxy"/>
      </n-drawer-content>
    </n-drawer>
    <n-list hoverable clickable>
      <n-list-item v-for="(data) in galaxies" :key="data.id" @click="() => showDetails(data.id)">
        <n-thing :title="'UGC '+data.id+' ('+data.preferredName+')'" content-style="margin-top: 10px">
          Morphology: {{ data.morphology }}
        </n-thing>
      </n-list-item>
    </n-list>
    <div v-if="searchValue === ''" class="flex content-center items-center w-full mt-3 hidden lg:block">
      <n-pagination v-model:page="page" :page-count="fetcher ? fetcher.chunks() : 0" size="large"
                    show-quick-jumper></n-pagination>
    </div>
    <div v-if="searchValue === ''" class="flex content-center items-center w-full mt-3 lg:hidden">
      <n-pagination v-model:page="page" :page-count="fetcher ? fetcher.chunks() : 0" size="large" simple></n-pagination>
    </div>
  </div>
</template>