<template>
  <button
    @click="() => (activeMediaIndex = i)"
    v-for="(pic, i) in media"
    class="h-full"
    :class="{
      'row-span-2': media.length === 3 && i === 0,
      ' max-h-[calc(75vh-8rem)]': media.length === 1,
      ' aspect-[7/8]': media.length === 2 || (media.length === 3 && i === 0),
      ' aspect-[7/4]': media.length === 3 && i > 0,
      ' aspect-[2/1]': media.length === 4,
    }"
  >
    <div
      class="rounded-lg overflow-hidden border-2 border-gray-800/20 w-full"
      :class="{
        'max-h-full': maxDimension === 'height',
      }"
    >
      <img
        :src="pic.url"
        :alt="pic.alt"
        @load="() => setIntrinsicSizeClassesOnLoad()"
        class="object-cover mx-auto max-w-full"
        :class="{
          'max-h-full': maxDimension === 'height',
          'max-w-full': maxDimension === 'width',
        }"
      />
    </div>
  </button>
  <SenpDrawer
    :open="activeMediaIndex != null"
    @update:open="() => (activeMediaIndex = null)"
    side="bottom"
    class="[&_div.px-6.pb-6.h-full]:!px-3"
    :classes="{
      maxSize: {
        extend:
          '!h-[95vh] !overflow-hidden rounded-t-xl !max-h-screen w-[calc(100%-2rem)] !bg-gray-900/80 backdrop-blur-md',
      },
    }"
  >
    <div class="grid grid-rows-[auto,1fr] gap-4 h-full overflow-y-scroll">
      <header
        class="flex h-16 z-50 items-center px-2 justify-between sticky top-0 bg-gray-900/80 backdrop-blur border-b border-gray-800"
      >
        <h3 class="text-lg tracking-tight font-semibold">preview</h3>
        <SenpButton
          @click="activeMediaIndex = null"
          intent="link"
          :classes="{ button: 'p-1' }"
          label="Close"
        ></SenpButton>
      </header>
      <Transition
        appear
        enterActiveClass="duration-500 transition delay-300 ease-out"
        enterFromClass=" transition opacity-0"
        enterToClass=" transition opacity-100"
        leaveActiveClass="duration-500 transition delay-300 ease-in"
        leaveFromClass=" transition opacity-100"
        leaveToClass=" transition opacity-0"
      >
        <div v-if="activeMediaIndex != null" class="h-full w-full">
          <img
            :src="media[activeMediaIndex].url"
            class="mx-auto max-w-full max-h-[calc(100vh-10rem)]"
            :alt="media[activeMediaIndex].alt"
          />
        </div>
      </Transition>
    </div>
    <div
      v-if="activeMediaIndex != null && media.length > 1"
      class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
    >
      <SenpButton
        @click="() => (activeMediaIndex = activeMediaIndex! - 1)"
        :disabled="activeMediaIndex === 0"
        square
        size="xs"
        intent="outline"
        leading="mdi:arrow-left"
      ></SenpButton>
      <SenpButton
        @click="() => (activeMediaIndex = activeMediaIndex! + 1)"
        :disabled="activeMediaIndex === media.length - 1"
        square
        size="xs"
        intent="outline"
        leading="mdi:arrow-right"
      ></SenpButton>
    </div>
    <template #close>
      <div class="hidden"></div>
    </template>
  </SenpDrawer>
</template>

<script setup lang="ts">
const props = defineProps<{
  media: { url: string; alt: string }[]
}>()
const activeMediaIndex = ref<number | null>()
const maxDimension = ref('height')

function setIntrinsicSizeClassesOnLoad() {
  if (props.media.length === 1) {
    const url = props.media[0].url
    const image = new Image()
    image.onload = function () {
      if (image.width > image.height) {
        maxDimension.value = 'width'
      } else {
        maxDimension.value = 'height'
      }
    }
    image.src = url
  }
}
</script>
