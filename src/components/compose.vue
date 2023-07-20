<template>
  <section class="md:hidden">
    <div class="fixed bottom-[5.5rem] right-4" v-if="!state.menuOpen">
      <SenpButton
        @click="state.menuOpen = true"
        leading="mdi:pen-plus"
        rounded="full"
        :classes="{
          button: '!p-4 shadow-2xl ring-2 ring-black/10 outline outline-gray-900/50 opacity-90',
        }"
        square
        size="xl"
      ></SenpButton>
    </div>
    <Teleport to="body">
      <Transition
        appear
        enterActiveClass="duration-200 transition transform ease-in"
        enterFromClass=" transition transform translate-y-full"
        enterToClass=" transition transform  translate-y-0"
        leaveActiveClass="duration-200 transition transform  ease-in"
        leaveFromClass=" transition transform  translate-y-0"
        leaveToClass=" transition transform translate-y-full"
      >
        <div
          v-if="state.menuOpen"
          class="h-screen max-h-screen w-full bg-gray-950 px-3 fixed top-0 left-0 bottom-0 pb-6 right-0 z-50 md:hidden"
        >
          <div class="grid grid-rows-[auto,auto,1fr] gap-4 h-full overflow-y-scroll">
            <header
              class="flex h-16 items-center px-2 justify-between sticky top-0 bg-gray-950/80 backdrop-blur border-b border-gray-900"
            >
              <SenpButton
                @click="state.menuOpen = false"
                intent="link"
                :classes="{ button: 'p-1' }"
                label="Cancel"
              ></SenpButton>
              <SenpButton :loading="loading" @click="submit" label="Post" rounded="full"></SenpButton>
            </header>
            <div class="flex items-center gap-4 px-2 w-full overflow-auto pt-2 pb-4 border-b border-gray-900">
              <SenpButton
                @click="state.imageMenuOpen = true"
                class="mr-4"
                intent="outline"
                leading="mdi:image-plus"
              ></SenpButton>
              <div v-for="(media, i) in state.media" class="relative shrink-0">
                <img :src="media" class="h-32 max-w-[12rem] w-max rounded-lg" alt="" />
                <SenpButton
                  intent="destructive"
                  size="xs"
                  square
                  class="absolute -top-2 -right-2 opacity-90"
                  leading="mdi:trash-can"
                  @click="() => state.media.splice(i, 1)"
                ></SenpButton>
              </div>
            </div>
            <label for="postbox" class="grid px-2 grid-cols-[auto,1fr] gap-4 place-items-start">
              <SenpAvatar
                :src="$profile.value?.avatar"
                :seed="$profile.value?.userName || '1'"
                :alt="$profile.value?.userName"
              />
              <textarea
                class="p-0 bg-transparent border-none outline-none resize-none whitespace-pre-wrap w-full h-full"
                name="postbox"
                id="postbox"
                v-model="state.content"
                multiline
              ></textarea>
            </label>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
  <section class="hidden md:block">
    <div class="grid grid-cols-[auto,minmax(0,1fr)] gap-4 py-4 border-b-2 border-gray-900">
      <NuxtLink to="/profile" class="h-max w-max rounded-full">
        <SenpAvatar :src="$profile.avatar" :seed="$profile.userName || '1'" :alt="$profile.userName" />
      </NuxtLink>
      <div class="flex flex-col gap-4">
        <label for="username" class="grid gap-1">
          <SenpTextInput
            multiline
            v-model="state.content"
            name="whatsHappening"
            placeholder="What's happening?"
          ></SenpTextInput>
        </label>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <SenpButton @click="state.imageMenuOpen = true" intent="outline" leading="mdi:image-plus"></SenpButton>
          </div>

          <SenpButton :loading="loading" @click="submit" class="ml-auto" size="xl">Post</SenpButton>
        </div>
        <div class="flex items-center gap-4">
          <div v-for="(media, i) in state.media" class="w-max relative">
            <img :src="media" class="h-32 max-w-48 rounded-lg" alt="" />
            <SenpButton
              intent="destructive"
              size="xs"
              square
              class="absolute -top-2 -right-2 opacity-90"
              leading="mdi:trash-can"
              @click="() => state.media.splice(i, 1)"
            ></SenpButton>
          </div>
        </div>
      </div>
    </div>
  </section>
  <MediaUpload v-model:open="state.imageMenuOpen" @add-media="(media) => state.media.push(media)"></MediaUpload>
</template>

<script setup lang="ts">
import { postValidator } from '../utils/post'
import { v4 } from 'uuid'

const { $posts, $profile } = useNuxtApp()
const state = reactive({
  username: '',
  content: '',
  menuOpen: false,
  imageMenuOpen: false,
  media: [] as string[],
})
const loading = ref(false)

const submit = async () => {
  try {
    loading.value = true
    const current = postValidator.parse({
      postID: v4(),
      accountID: $profile.value.accountID,
      createdAt: new Date().toISOString(),
      media: state.media.map((a) => ({ url: a, alt: '' })),
      text: state.content,
      likes: [],
      reposts: [],
      replies: [],
    })
    $posts.value.unshift(current)

    setTimeout(() => {
      loading.value = false
      state.menuOpen = false
      state.imageMenuOpen = false
      state.content = ''
      state.media = []
    }, 300)
  } catch (error) {
    loading.value = false
    alert(error)
  }
}

watch(
  () => state.menuOpen,
  () => {
    nextTick(() => {
      nextTick(() => {
        setTimeout(() => {
          if (document) {
            ;(document.querySelector('textarea#postbox') as HTMLTextAreaElement | null)?.focus()
          }
        }, 800)
      })
    })
  }
)
</script>
