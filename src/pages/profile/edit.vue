<template>
  <ClientOnly>
    <section class="m-auto grid w-full gap-4 pt-4 pb-40">
      <label for="email" class="grid gap-1">
        <p class="text-sm">Handle</p>
        <SenpTextInput :error="validation?.userName?.error" type="text" name="email" v-model="$profile.userName" />
      </label>
      <label for="email" class="grid gap-1">
        <p class="text-sm">Display Name</p>
        <SenpTextInput
          :error="validation?.displayName?.error"
          type="text"
          name="email"
          v-model="$profile.displayName"
        />
      </label>
      <label for="email" class="grid gap-1">
        <p class="text-sm">Bio</p>
        <SenpTextInput :error="validation?.bio?.error" type="text" multiline name="email" v-model="$profile.bio" />
      </label>
      <label class="grid gap-1">
        <p class="text-sm">Avatar</p>
        <SenpAvatar
          class="mr-auto"
          :src="$profile.avatar"
          :seed="$profile.userName || '1'"
          :alt="$profile.userName"
          :classes="{
            avatar:
              'h-28 w-28 rounded-full border-4 border-black bg-gradient-to-br from-black to-blue-900 object-cover',
          }"
        ></SenpAvatar>
        <div class="relative w-max" v-if="$profile.avatar">
          <img :src="$profile.avatar" class="h-32 max-w-48 rounded-lg" alt="" />
          <SenpButton
            intent="destructive"
            size="xs"
            square
            class="absolute -top-2 -right-2 opacity-90"
            leading="mdi:trash-can"
            @click="() => ($profile.avatar = '')"
          ></SenpButton>
        </div>
        <div class="flex items-center gap-4" v-else>
          <SenpButton
            @click="state.imageMenuOpen = true"
            intent="outline"
            leading="mdi:image-plus"
            label="Upload Avatar"
          ></SenpButton>
        </div>
      </label>
      <label class="grid gap-1">
        <p class="text-sm">Banner Color</p>
        <div
          class="h-12 w-full cursor-pointer rounded-lg border-2 border-gray-700 focus-within:ring"
          :style="{ background: $profile.banner }"
        >
          <SenpTextInput type="color" v-model="$profile.banner" class="sr-only" />
        </div>
      </label>
      <div class="py-4">
        <hr class="border-gray-800" />
      </div>
      <NuxtLink to="/profile" custom v-slot="{ href, navigate }">
        <SenpButton
          size="xl"
          label="View Profile"
          trailing="mdi:shimmer"
          :href="href"
          @click="navigate"
          :disabled="validation?.userName?.error || validation?.displayName?.error"
        ></SenpButton>
      </NuxtLink>
    </section>
    <MediaUpload v-model:open="state.imageMenuOpen" @add-media="(media) => ($profile.avatar = media)"></MediaUpload>
  </ClientOnly>
</template>

<script setup lang="ts">
import { z } from 'zod'
const { $profile } = useNuxtApp()

const state = reactive({
  imageMenuOpen: false,
})

const tryZodParse = (schema: z.ZodOptional<z.ZodString> | z.ZodString, value: string) => {
  try {
    schema.parse(value)
    return { error: null }
  } catch (error) {
    console.log({ error })
    return { error: (error as z.ZodError)?.issues?.at(0)?.message }
  }
}

const validation = computed(() => {
  return {
    userName: tryZodParse(
      z
        .string({ required_error: 'Username is required', invalid_type_error: 'Username is required' })
        .max(12, 'Username must be at most 12 characters')
        .min(1, 'Username must be at least 1 character')
        .regex(/^\S+$/, 'Username cannot include whitespace'),
      $profile.value.userName
    ),
    displayName: tryZodParse(
      z
        .string({ required_error: 'Display name is required', invalid_type_error: 'Display name is required' })
        .max(20, 'Display name must be at most 20 characters')
        .min(1, 'Display name must be at least 1 character'),
      $profile.value.displayName
    ),
    bio: tryZodParse(
      z.string({ required_error: 'Bio is required', invalid_type_error: 'Bio is required' }).optional(),
      $profile.value.bio
    ),
    avatar: tryZodParse(z.string().optional(), $profile.value.avatar),
    banner: tryZodParse(z.string().optional(), $profile.value.banner),
  }
})

onMounted(() => {
  if (!$profile?.value?.createdAt) {
    $profile.value.createdAt = new Date().toISOString()
  }
  $profile.value.hasUsedPlatform = true
})
</script>
