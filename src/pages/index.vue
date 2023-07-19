<template>
  <div class="pt-16">
    <h2 class="text-3xl md:text-5xl font-bold tracking-tighter">Enjoy posting without all the other people :3</h2>
    <div class="space-y-1 text-xl mt-12 leading-loose">
      <p>im literally not taking any of ur data, i dont care!</p>
      <p>
        everything is saved in ur browser, check ur
        <SenpButton intent="link" size="xs" :classes="{ button: 'text-xl !p-0' }" @click="showLocalStorage = true"
          >localStorage</SenpButton
        >
        if ur curious.
      </p>
    </div>
    <NuxtLink to="/feed">
      <SenpButton class="mt-12" size="xl" trailing="mdi:arrow-right"> Start Posting </SenpButton>
    </NuxtLink>
  </div>
  <SenpDrawer
    v-model:open="showLocalStorage"
    side="bottom"
    class="[&_div.px-6.pb-6.h-full]:!px-3"
    :classes="{
      maxSize: { extend: '!h-[90vh] !overflow-hidden rounded-t-xl !max-h-screen w-[calc(100%-2rem)] !bg-gray-900' },
    }"
  >
    <div class="grid grid-rows-[auto,1fr] gap-4 h-full overflow-y-scroll">
      <header
        class="flex h-16 z-50 items-center px-2 justify-between sticky top-0 bg-gray-900/80 backdrop-blur border-b border-gray-800"
      >
        <h3 class="text-lg tracking-tight font-semibold">stuff we store in ur browser</h3>
        <SenpButton
          @click="showLocalStorage = false"
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
        <div v-show="showLocalStorage" class="h-full overflow-hidden grid grid-rows-[auto,1fr]">
          <SenpTab :options="['profile', 'posts']" v-slot="{ active }">
            <div class="pt-4 h-full overflow-auto">
              <SenpHighlight
                class="h-full overflow-hidden bg-gray-800"
                :classes="{ pre: { extend: 'h-full' } }"
                v-if="active === 'posts'"
                theme="nord"
                language="json"
                :value="$posts.value"
              ></SenpHighlight>
              <SenpHighlight
                class="h-full overflow-hidden bg-gray-800"
                :classes="{ pre: { extend: 'h-full' } }"
                v-if="active === 'profile'"
                theme="nord"
                language="json"
                :value="$profile.value"
              ></SenpHighlight>
            </div>
          </SenpTab>
        </div>
      </Transition>
    </div>
    <template #close>
      <div class="hidden"></div>
    </template>
  </SenpDrawer>
</template>

<script setup lang="ts">
const showLocalStorage = ref(false)
</script>
