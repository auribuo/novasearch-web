<script setup lang="ts">
import {useDark} from "@vueuse/core";
import {NDivider, NButton, NFormItem, NForm, NSelect, NInput, NInputNumber, useMessage, NThing} from "naive-ui";
import {ref} from "vue";
import {useStore} from "../plugins/pinia";
import axios from "axios";

const message = useMessage();

const store = useStore();

const model = ref({
                    theme: useDark().value ? "dark" : "light",
                    host: store.host(),
                    port: store.port(),
                    protocol: store.protocol(),
                  });

const isDark = useDark();

const availableThemes = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

const availableProtocols = [
  {
    label: "HTTP",
    value: "http",
  },
  {
    label: "HTTPS",
    value: "https",
  },
];

function updateTheme() {
  isDark.value = model.value.theme === "dark";
}

async function saveChanges() {
  isDark.value = model.value.theme === "dark";

  try {
    await axios.get(`${model.value.protocol}://${model.value.host}:${model.value.port}`);
    store.setHost(model.value.host);
    store.setPort(model.value.port);
    store.setProtocol(model.value.protocol);
  } catch (e) {
    message.error(`Could not connect to Novasearch API at ${model.value.protocol}://${model.value.host}:${model.value.port}`,
                  {
                    closable: true,
                    duration: 2000,
                  });
    return;
  }

  message.info("Changes saved", {
    closable: true,
    duration: 2000,
  });
}

</script>

<template>
  <div class="text-2xl">
    Settings
  </div>
  <n-divider></n-divider>
  <n-form
      ref="settingsForm"
      :model="model"
      label-placement="left"
      size="large"
      label-width="auto"
      class="w-1/2">
    <n-form-item label="Theme">
      <n-select
          v-model:value="model.theme"
          placeholder="Select a theme"
          :options="availableThemes"
          @update:value="updateTheme"
      >
      </n-select>
    </n-form-item>
    <n-form-item class="mt-[-20px]">
      <n-thing>Note: Dark mode plots are still experimental</n-thing>
    </n-form-item>
    <n-form-item label="Protocol">
      <n-select
          v-model:value="model.protocol"
          placeholder="Select the protocol"
          :options="availableProtocols">
      </n-select>
    </n-form-item>
    <n-form-item label="Host">
      <n-input v-model:value="model.host" placeholder="Novasearch API host"></n-input>
    </n-form-item>
    <n-form-item label="Port">
      <n-input-number v-model:value="model.port" :show-button="false"
                      placeholder="Novasearch API port"></n-input-number>
    </n-form-item>

    <n-button @click="saveChanges">Save</n-button>
  </n-form>
</template>