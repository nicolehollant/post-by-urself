<template>
  <div class="relative w-full" ref="container">
    <div
      class="grid grid-flow-col items auto-cols-max w-full overflow-auto gap-2 shrink-0 pt-2 snap-x"
      v-if="media.length"
      :key="lastImageWidth"
      :style="{
        paddingRight: media.length > 1 && lastImageWidth > 0 ? `${containerWidth - lastImageWidth}px` : '',
      }"
    >
      <button
        @click="() => (activeMediaIndex = i)"
        v-for="(pic, i) in media"
        class="h-max w-max snap-start"
        :style="{
          maxWidth: `${containerWidth}px`,
        }"
      >
        <div class="rounded-lg overflow-hidden max-h-[calc(75vh-8rem)] border-2 border-gray-800/20 max-w-full h-full">
          <img
            :src="pic.url"
            :alt="pic.alt"
            @load="() => setIntrinsicSizeClassesOnLoad()"
            class="object-cover mx-auto max-w-full max-h-[calc(75vh-8rem)] aspect-auto"
            :class="{
              'h-full': maxDimension === 'height',
            }"
          />
        </div>
      </button>
    </div>
  </div>
  <!-- <div
    class="relative grid grid-flow-col auto-cols-[fit-content(100%)] w-full overflow-auto gap-2 shrink-0 pt-2 snap-x"
    v-if="media.length"
    ref="container"
    :style="{
      paddingRight: media.length > 1 && lastImageWidth > 0 ? `calc(100% - ${lastImageWidth}px)` : '',
    }"
  >
    <button @click="() => (activeMediaIndex = i)" v-for="(pic, i) in media" class="h-max w-max max-w-full snap-start">
      <div class="rounded-lg overflow-hidden max-h-[calc(75vh-8rem)] border-2 border-gray-800/20 max-w-full h-full">
        <img
          :src="pic.url"
          :alt="pic.alt"
          @load="() => setIntrinsicSizeClassesOnLoad()"
          class="object-cover mx-auto max-w-full max-h-[calc(75vh-8rem)] aspect-auto"
          :class="{
            'h-full': maxDimension === 'height',
          }"
        />
      </div>
    </button>
  </div> -->
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
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  media: { url: string; alt: string }[]
}>()
defineEmits<{
  (event: 'update:lastImageWidth', value: number): void
}>()
const activeMediaIndex = ref<number | null>()
const maxDimension = ref('height')
const lastImageWidth = ref(0)
const container = ref<null | HTMLDivElement>(null)
const { width: containerWidth } = useElementSize(container)

function setIntrinsicSizeClassesOnLoad() {
  if (props.media.length === props.media.length - 1) {
    const url = props.media[props.media.length - 1].url
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

watch(
  () => containerWidth.value,
  () => {
    nextTick(() => {
      nextTick(() => {
        lastImageWidth.value =
          [...(container.value?.querySelectorAll('button') || [])].at(-1)?.getBoundingClientRect().width ?? 0
      })
    })
  }
)

onMounted(() => {
  nextTick(() => {
    nextTick(() => {
      lastImageWidth.value =
        [...(container.value?.querySelectorAll('button') || [])].at(-1)?.getBoundingClientRect().width ?? 0
    })
  })
})
</script>
