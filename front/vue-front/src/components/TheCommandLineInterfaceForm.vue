<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const command = ref<string>('')

async function clickTest(event: Event) {
  event.preventDefault()
  command.value = command.value.replace(/ /g, '').toLocaleUpperCase();

  try {
    const res = await axios.get(command.value);
    //const res = await axios.get("privet");
    const data = res.data;
    console.log(data);
  } catch (error) {
    return null;
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <form>
      <textarea
        v-model.lazy="command"
        rows="10"
        class="block p-2.5 mt-10 w-full text-sm text-gray-900 border border-gray-300 focus:border-blue-500"
        placeholder="Командная строка..."
      ></textarea>
      <div class="mt-10">
        <div>
          <input
            id="aoncheckbox"
            type="checkbox"
            class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4"
            checked
          />
          <label for="checkbox-1" class="text-sm ml-3 font-medium text-gray-900"
            >аон (ozon/yandex)</label
          >
        </div>
        <div>
          <input
            id="dpi"
            type="checkbox"
            class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4"
            checked
          />
          <label for="checkbox-1" class="text-sm ml-3 font-medium text-gray-900"
            >дпи (ozon/yandex)</label
          >
        </div>
        <button
          @click="clickTest"
          class="mt-10 hover:shadow-form hover:bg-blue-700 bg-blue-500 py-1 px-8 text-center text-base text-white outline-none"
        >
          Отправить
        </button>
      </div>
    </form>
    {{ command }}
  </div>
</template>
