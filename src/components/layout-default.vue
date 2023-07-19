<template>
  <SenpLayoutBasic
    fixedHeader
    fixedFooter
    :classes="
      defu(classes, {
        wrapper: {
          extend: '!grid-rows-[1fr,auto]',
        },
        content: {
          extend: '!grid auto-rows-max w-full overflow-x-hidden pt-16 h-full ',
        },
        header: {
          extend:
            '!fixed w-full text-xl bg-gray-950/70 bg-gradient-to-r from-gray-950/50 to-gray-900/50 backdrop-blur border-b border-gray-800',
        },
        footer: {
          extend:
            ' bg-gray-950/70 bg-gradient-to-r flex items-center justify-around from-gray-950/50 to-gray-900/50 backdrop-blur border-t border-gray-800',
        },
        sidebarLeft: { extend: 'border-r border-gray-800' },
        sidebarRight: { extend: 'border-l border-gray-800' },
      })
    "
    class="border border-gray-800"
  >
    <template #header>
      <slot name="heading">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/favicon.png" alt="PostByUrself Logo" class="w-12 h-12" />
          <h1>PostByUrself</h1>
        </NuxtLink>
      </slot>
    </template>
    <template #content>
      <slot></slot>
    </template>
    <template #footer>
      <NuxtLink to="/feed" custom v-slot="{ isActive, href, navigate }">
        <SenpButton
          :intent="isActive ? 'primary' : 'ghost'"
          rounded="full"
          :href="href"
          @click="navigate"
          :disabled="isActive"
          square
          leading="mdi:home"
        ></SenpButton>
      </NuxtLink>
      <NuxtLink to="/profile" custom v-slot="{ isActive, href, navigate }">
        <SenpButton
          :intent="isActive ? 'primary' : 'ghost'"
          rounded="full"
          :href="href"
          @click="navigate"
          :disabled="isActive"
          square
          leading="mdi:account"
        ></SenpButton>
      </NuxtLink>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
import { defu } from 'defu'
defineProps<{
  classes?: any
}>()
</script>
