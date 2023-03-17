<script setup lang="ts">

import {useDark} from "@vueuse/core";
import {computed, h} from "vue";
import {
  darkTheme,
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NMenu,
  NLoadingBarProvider,
  NDropdown,
  NButton,
  NIcon,

} from "naive-ui";
import type {MenuOption} from "naive-ui";
import {RouterLink} from "vue-router";
import logoDarkUrl from "./assets/logo.svg";
import logoLightUrl from "./assets/logo_dark.svg";
import {Bars} from "@vicons/fa";

const isDark = useDark();

const logoUrl = computed(() => {
  if (isDark.value) {
    return logoDarkUrl;
  }
  return logoLightUrl;
});

const theme = computed(() => {
  if (isDark.value) {
    return darkTheme;
  }
  return null;
});

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {
      to: {
        path: "/",
      },
    }, {default: () => "Home"}),
    key: "home",
  },
  {
    label: "Galaxies",
    key: "galaxies",
    children: [
      {
        label: () => h(RouterLink, {
          to: {
            path: "/galaxies/all",
          },
        }, {default: () => "View all galaxies"}),
        key: "all-galaxies",
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/galaxies/filter",
          },
        }, {default: () => "View filtered galaxies"}),
        key: "filtered-galaxies",
      },
    ],
  },
  {
    label: () => h(RouterLink, {
      to: {
        path: "/settings",
      },
    }, {default: () => "Settings"}),
  },
];

</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider placement="bottom">
      <n-loading-bar-provider>
        <n-global-style></n-global-style>
        <div class="flex items-center mx-3 content-between">
          <img :src="logoUrl" alt="novasearch logo" class="max-h-[20px] m-5 flex">
          <div class="hidden lg:block">
            <n-menu :options="menuOptions" mode="horizontal" class="text-lg" default-value="home"></n-menu>
          </div>
          <div class="lg:hidden flex">
            <n-dropdown trigger="click" placement="bottom-end" :options="menuOptions">
              <n-button>
                <n-icon :component="Bars"></n-icon>
              </n-button>
            </n-dropdown>
          </div>
        </div>
        <main class="min-h-screen m-5">
          <Suspense>
            <router-view></router-view>
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </main>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>
