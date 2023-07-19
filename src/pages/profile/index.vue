<template>
  <LayoutDefault
    name="default"
    :classes="{
      content: {
        extend: '!grid auto-rows-max w-full overflow-x-hidden h-full !pt-0 !px-0',
      },
    }"
  >
    <template #heading>
      <div class="w-full flex items-center gap-4 text-xl md:gap-8 justify-between">
        <div class="flex items-center gap-4 text-xl md:gap-8">
          <NuxtLink to="/feed">
            <Icon name="ant-design:arrow-left-outlined" />
          </NuxtLink>
          <div class="grid gap-1">
            <p>{{ $profile?.value?.displayName }}</p>
            <p class="text-sm text-gray-500">{{ $posts?.value?.length }} Posts</p>
          </div>
        </div>
        <NuxtLink to="/profile/edit">
          <SenpButton trailing="mdi:pen" label="Edit" />
        </NuxtLink>
      </div>
    </template>
    <section class="relative border-b-2 border-gray-800">
      <div class="pt-24 sm:pt-32" :style="{ background: $profile?.value?.banner ?? '#1e3a8a' }">
        <div class="h-16"></div>
      </div>
      <div class="absolute flex w-full -translate-y-1/2 transform items-end justify-between px-6">
        <SenpAvatar
          :src="$profile.value?.avatar"
          :seed="$profile.value?.userName || '1'"
          :alt="$profile.value?.userName"
          :classes="{
            avatar:
              'h-28 w-28 rounded-full border-4 border-black bg-gradient-to-br from-black to-blue-900 object-cover',
          }"
        ></SenpAvatar>
      </div>
      <div class="px-6 pt-20 pb-4">
        <div>
          <p>{{ $profile?.value?.displayName }}</p>
          <p class="text-gray-500">@{{ $profile?.value?.userName.split('@')[0] }}</p>
        </div>
        <p>
          {{ $profile?.value?.bio }}
        </p>
        <div v-if="$profile?.value?.createdAt" class="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="ant-design:calendar-outlined" />
          <p>
            Joined
            {{ new Date($profile?.value.createdAt).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </section>
    <div class="grid gap-4 px-4">
      <Post v-for="post in $posts.value" :post="post"></Post>
    </div>
  </LayoutDefault>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: 'valid-account',
})
</script>
