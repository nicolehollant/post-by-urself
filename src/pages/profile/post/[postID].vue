<template>
  <LayoutDefault>
    <template #heading>
      <div class="w-full flex items-center gap-4 text-xl md:gap-8 justify-between">
        <div class="flex items-center gap-4 text-xl md:gap-8">
          <NuxtLink to="/feed" class="flex items-center">
            <Icon name="ant-design:arrow-left-outlined" />
          </NuxtLink>

          <p>Post</p>
        </div>
        <SenpMenu
          side="right"
          class="[&_.px-1.py-1_button:last-of-type]:!text-xs [&_.px-1.py-1_button:last-of-type]:!text-gray-400"
          :options="[
            { label: 'Delete Post', emits: 'deletePost' },
            { label: 'Cancel', emits: '' },
          ]"
          @select="
            (key: string) => {
              if (key === 'deletePost') {
                deletePost()
              }
            }
          "
        >
          <template #trigger><SenpButton leading="mdi:menu" /></template>
        </SenpMenu>
      </div>
    </template>
    <Post :post="activePost" v-if="activePost" size="lg"></Post>
  </LayoutDefault>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['valid-account'],
})
const route = useRoute()
const router = useRouter()
const { $posts } = useNuxtApp()

const activePost = computed(() => $posts?.value.find((post) => post.postID === route.params.postID + ''))
const deletePost = () => {
  const index = $posts?.value.findIndex((post) => post.postID === route.params.postID + '')
  $posts.value.splice(index, 1)
  router.push('/feed')
}
</script>
