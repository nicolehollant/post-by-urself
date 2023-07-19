<template>
  <SenpModal :open="open" @update:open="(v: boolean) => $emit('update:open', v)" title="Upload Media">
    <template #title>
      <div class="flex items-center justify-between sticky top-0 bg-gray-800/50 backdrop-blur shadow p-6">
        <HeadlessDialogTitle as="h3" class="text-lg font-medium leading-6"> Upload Media </HeadlessDialogTitle>
        <SenpButton
          @click="$emit('update:open', false)"
          intent="link"
          :classes="{ button: 'p-1' }"
          label="Cancel"
        ></SenpButton>
      </div>
    </template>
    <SenpTab :options="['local', 'hosted']" v-slot="{ active }">
      <div class="mt-4">
        <div v-if="active === 'local'">
          <p class="mb-4 bg-gray-950/30 px-4 py-2 rounded text-sm text-gray-300">
            local images are more secure than hosted ones, but are lower quality and take up more space on your device
          </p>
          <FileToBase64 previewClass="max-h-40" v-model="state.mediaUrlLocal" :resized-width="512"> </FileToBase64>
          <SenpButton class="mt-4" @click="$emit('addMedia', state.mediaUrlLocal)" :disabled="!state.mediaUrlLocal"
            >Add Image</SenpButton
          >
        </div>
        <div v-if="active === 'hosted'">
          <p class="mb-4 bg-gray-950/30 px-4 py-2 rounded text-sm text-gray-300">
            hosted images are accessible outside of this site, use at your discretion
          </p>
          <SenpTextInput v-model="state.mediaUrlHosted" placeholder="image url..."></SenpTextInput>
          <iframe
            src="https://imaj.app"
            class="w-full h-[32rem] mt-4 rounded-lg"
            allow="clipboard-read; clipboard-write"
            frameborder="0"
          ></iframe>
          <SenpButton class="mt-4" @click="$emit('addMedia', state.mediaUrlHosted)" :disabled="!state.mediaUrlHosted"
            >Add Image</SenpButton
          >
        </div>
      </div>
    </SenpTab>
  </SenpModal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()
defineEmits<{
  (event: 'addMedia', val: string): void
  (event: 'update:open', val: boolean): void
}>()
const state = reactive({
  mediaUrlLocal: '',
  mediaUrlHosted: '',
  media: [] as string[],
})
</script>
