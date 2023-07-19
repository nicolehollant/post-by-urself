<template>
  <Compose></Compose>
  <Post v-for="post in $posts.value" :post="post"></Post>
  <p v-if="$posts.value.length" class="py-12 text-center text-gray-400">no more posts 😕</p>
  <p v-else class="py-12 text-center text-gray-400">no posts... yet</p>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'valid-account',
})
</script>
