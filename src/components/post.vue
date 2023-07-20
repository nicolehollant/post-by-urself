<template>
  <NuxtLink v-if="size === 'base'" custom v-slot="{ href, navigate }" :to="`/profile/post/${post.postID}`">
    <button
      :href="href"
      @click.self="navigate"
      class="text-left cursor-pointer grid grid-cols-[auto,minmax(0,1fr)] gap-4 border-b-2 border-gray-900 px-0 py-4"
    >
      <NuxtLink to="/profile">
        <SenpAvatar :src="$profile.avatar" :seed="$profile.userName || '1'" :alt="$profile.userName" />
      </NuxtLink>
      <div class="flex flex-col pt-1 text-lg">
        <div class="flex items-center justify-between">
          <div @click="navigate" class="text-sm sm:text-base flex gap-2 overflow-hidden leading-none text-gray-50">
            <p class="line-clamp-1 font-bold">
              {{ $profile?.displayName }}
            </p>
            <p class="line-clamp-1 w-max text-gray-500">@{{ $profile?.userName.split('@')[0] }}</p>
            <p class="text-gray-500">&middot;</p>
            <p class="shrink-0 text-gray-500">
              {{
                new Date(post.createdAt).toLocaleString(undefined, {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })
              }}
            </p>
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
            <template #trigger
              ><SenpButton size="2xs" intent="ghost" class="!text-gray-400" square leading="mdi:menu"
            /></template>
          </SenpMenu>
        </div>
        <p @click="navigate" class="pt-1.5 leading-tight" v-if="post.text">{{ post.text }}</p>
        <PostMedia :media="post.media"></PostMedia>
        <div class="flex justify-between pt-4 text-gray-500" @click="navigate">
          <div class="flex items-end gap-2">
            <Icon name="ant-design:comment-outlined" />
            <p class="text-sm">
              {{ post.replies.length }}
            </p>
          </div>
          <button
            class="group flex items-end gap-2"
            @click.prevent.stop="repostPost"
            :class="{
              'text-green-500': post.reposts.some((a) => a.accountID === $profile?.accountID),
            }"
          >
            <Icon
              name="ant-design:retweet-outlined"
              class="rounded-full group-hover:bg-green-500/30 group-hover:ring-4 group-hover:ring-green-500/30"
            />
            <p class="text-sm">{{ post.reposts.length }}</p>
          </button>
          <button
            class="group flex items-end gap-2"
            @click.prevent.stop="likePost"
            :class="{
              'text-red-500': post.likes.some((a) => a.accountID === $profile?.accountID),
            }"
          >
            <Icon
              name="ant-design:heart-outlined"
              class="rounded-full group-hover:bg-red-500/30 group-hover:ring-4 group-hover:ring-red-500/30"
            />
            <p class="text-sm">{{ post.likes.length }}</p>
          </button>
          <button class="group" @click.prevent.stop="share">
            <Icon
              name="ant-design:share-alt-outlined"
              class="rounded-full group-hover:bg-blue-500/30 group-hover:ring-4 group-hover:ring-blue-500/30"
            />
          </button>
        </div>
      </div>
      <textarea
        name="template"
        id=""
        class="sr-only whitespace-pre-wrap"
        aria-hidden
        ref="clipboardEl"
        :value="postHref"
      />
    </button>
  </NuxtLink>
  <div v-else class="flex flex-col gap-4 py-4 w-full overflow-hidden">
    <div class="flex items-center gap-4">
      <NuxtLink to="/profile">
        <SenpAvatar :src="$profile.avatar" :seed="$profile.userName || '1'" :alt="$profile.userName" />
      </NuxtLink>
      <div>
        <p class="font-bold">
          {{ $profile?.displayName }}
        </p>
        <p class="text-gray-500">@{{ $profile?.userName.split('@')[0] }}</p>
      </div>
    </div>
    <p class="pt-1.5 text-2xl leading-tight" v-if="post.text">{{ post.text }}</p>

    <PostMedia :media="post.media"></PostMedia>
    <div class="flex items-center gap-2 text-lg text-gray-500">
      <p>
        {{
          new Date(post.createdAt).toLocaleTimeString(undefined, {
            timeStyle: 'short',
          })
        }}
      </p>
      <p>&middot;</p>
      <p>
        {{
          new Date(post.createdAt).toLocaleDateString(undefined, {
            dateStyle: 'medium',
          })
        }}
      </p>
    </div>
    <hr class="border-gray-800" />
    <section class="flex gap-6">
      <div class="flex items-baseline justify-between gap-2">
        <p class="font-bold">{{ post.reposts.length }}</p>
        <p class="text-sm text-gray-500">Reposts</p>
      </div>
      <div class="flex items-baseline justify-between gap-2">
        <p class="font-bold">{{ post.likes.length }}</p>
        <p class="text-sm text-gray-500">Likes</p>
      </div>
    </section>
    <hr class="border-gray-800" />
    <!-- <div
      class="grid gap-1 pt-2"
      :class="{
        'grid-rows-2': post.media.length > 2,
        'grid-cols-2': post.media.length > 1,
      }"
      v-if="post.media.length"
    >
      <div
        v-for="(pic, i) in post.media"
        :class="{
          'row-span-2': post.media.length === 3 && i === 0,
          ' aspect-h-8 aspect-w-7': post.media.length === 2 || (post.media.length === 3 && i === 0),
          ' aspect-h-4 aspect-w-7': post.media.length === 3 && i > 0,
          ' aspect-h-2 aspect-w-1': post.media.length === 4,
        }"
      >
        <img :src="pic.url" alt="" class="rounded-lg border-2 border-gray-800/50 object-cover" />
      </div>
    </div> -->
    <div class="flex justify-around items-center text-lg text-gray-500">
      <Icon name="ant-design:comment-outlined" />
      <button
        class="group flex items-end gap-2"
        @click.prevent.stop="repostPost"
        :class="{
          'text-green-500': post.reposts.some((a) => a.accountID === $profile?.accountID),
        }"
      >
        <Icon
          name="ant-design:retweet-outlined"
          class="rounded-full group-hover:bg-green-500/30 group-hover:ring-4 group-hover:ring-green-500/30"
        />
      </button>
      <button
        class="group flex items-end gap-2"
        @click.prevent.stop="likePost"
        :class="{
          'text-red-500': post.likes.some((a) => a.accountID === $profile?.accountID),
        }"
      >
        <Icon
          name="ant-design:heart-outlined"
          class="rounded-full group-hover:bg-red-500/30 group-hover:ring-4 group-hover:ring-red-500/30"
        />
      </button>
      <button class="group" @click.prevent.stop="share">
        <Icon
          name="ant-design:share-alt-outlined"
          class="rounded-full group-hover:bg-blue-500/30 group-hover:ring-4 group-hover:ring-blue-500/30"
        />
      </button>
    </div>
    <hr class="border-gray-800" />
    <section v-if="$profile">
      <div class="flex items-start gap-4">
        <NuxtLink to="/profile" class="h-max w-max rounded-full">
          <SenpAvatar :src="$profile.avatar" :seed="$profile.userName || '1'" :alt="$profile.userName" />
        </NuxtLink>
        <div class="grid gap-2 w-full">
          <label>
            <SenpTextInput multiline v-model="reply.content" placeholder="Write your reply..."></SenpTextInput>
          </label>
          <SenpButton @click="replyToPost">Reply</SenpButton>
        </div>
      </div>
    </section>
    <section class="-mx-6 grid">
      <Reply v-for="reply in post.replies" :key="reply.id" :reply="reply"></Reply>
    </section>
    <textarea
      name="template"
      id=""
      class="sr-only whitespace-pre-wrap"
      aria-hidden
      ref="clipboardEl"
      :value="postHref"
    />
  </div>
</template>

<script setup lang="ts">
import { postValidator } from '../utils/post'
import { Post } from 'utils/post'
import { v4 } from 'uuid'
const props = withDefaults(
  defineProps<{
    post: Post
    size?: 'base' | 'lg'
  }>(),
  {
    size: 'base',
  }
)

const { $posts, $profile, $toast } = useNuxtApp()

const reply = reactive({
  content: '',
})
const clipboardEl = ref(null)
const postHref = computed(() => {
  return window.location.origin + `/${$profile.value.userName.split('@')[0]}/post/${props.post.postID}`
})

const share = () => {
  if (navigator && navigator.share) {
    navigator
      .share({
        text: postHref.value,
      })
      .then(() => {
        console.log('Thanks for sharing!')
        $toast.add({
          placement: 'top-right',
          type: 'info',
          durationMs: 2000,
          title: 'Copied post url to clipboard',
        })
      })
      .catch(console.error)
  } else {
    ;(clipboardEl.value as any).select()
    document.execCommand('copy')
    $toast.add({
      placement: 'top-right',
      type: 'info',
      durationMs: 2000,
      title: 'Copied post url to clipboard',
    })
  }
}

const indexOfPost = computed(() => $posts.value.findIndex((a) => a.postID === props.post.postID))

const replyToPost = () => {
  const current = postValidator.parse({
    postID: v4(),
    accountID: $profile.value.accountID,
    createdAt: new Date().toISOString(),
    media: [],
    text: reply.content,
    likes: [],
    reposts: [],
    replies: [],
  })
  $posts.value[indexOfPost.value].replies.push(current)
}
const likePost = () => {
  if ($posts.value[indexOfPost.value].likes.some((a) => a.accountID === $profile.value.accountID)) {
    $posts.value[indexOfPost.value].likes = $posts.value[indexOfPost.value].likes.filter(
      (a) => a.accountID !== $profile.value.accountID
    )
  } else {
    $posts.value[indexOfPost.value].likes.push({ accountID: $profile.value.accountID })
  }
}
const repostPost = () => {
  if ($posts.value[indexOfPost.value].reposts.some((a) => a.accountID === $profile.value.accountID)) {
    $posts.value[indexOfPost.value].reposts = $posts.value[indexOfPost.value].reposts.filter(
      (a) => a.accountID !== $profile.value.accountID
    )
  } else {
    $posts.value[indexOfPost.value].reposts.push({ accountID: $profile.value.accountID })
  }
}
const deletePost = () => {
  const index = $posts?.value.findIndex((post) => post.postID === props.post.postID)
  $posts.value.splice(index, 1)
}
</script>
