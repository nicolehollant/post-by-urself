import { useStorage } from '@vueuse/core'
import { Post, Profile } from 'utils/post'

export default defineNuxtPlugin(() => {
  const profile = useStorage<Profile>('profile', {
    accountID: '1',
    createdAt: '',
    avatar: '',
    banner: '',
    displayName: '',
    userName: '',
    bio: '',
    id: '1',
    hasUsedPlatform: false,
  })
  const posts = useStorage<Post[]>('posts', [])
  const profileIsValid = computed(() => {
    return profile.value?.displayName && profile.value?.userName
  })
  return {
    provide: {
      posts,
      profile,
      profileIsValid,
    },
  }
})
