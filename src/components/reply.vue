<template>
  <div class="grid grid-cols-[auto,minmax(0,1fr)] gap-4 border-t-2 border-gray-900 px-6 py-4">
    <NuxtLink to="/profile">
      <img
        :src="$profile.value?.avatar"
        class="h-14 w-14 rounded-full bg-gradient-to-br from-black to-blue-900 object-cover"
        alt="My Avatar"
        onerror="this.src = ''"
      />
    </NuxtLink>
    <div class="flex flex-col pt-1 text-lg">
      <div class="flex gap-2 overflow-hidden leading-none text-gray-50">
        <p class="line-clamp-1 font-bold">
          {{ $profile.value?.displayName }}
        </p>
        <p class="line-clamp-1 w-min text-gray-500">@{{ $profile.value?.userName.split('@')[0] }}</p>
        <p class="text-gray-500">&middot;</p>
        <p class="shrink-0 text-gray-500">
          {{
            new Date(reply.createdAt).toLocaleString(undefined, {
              dateStyle: 'short',
              timeStyle: 'short',
            })
          }}
        </p>
      </div>
      <!-- <p class="pt-1.5 leading-tight">{{ reply.content }}</p> -->
      <p class="pt-1.5 leading-tight">{{ reply.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  reply: {
    accountID: string
    text: string
    createdAt: string
  }
}>()
</script>
