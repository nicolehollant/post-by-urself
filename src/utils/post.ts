import { z } from 'zod'
export const postValidator = z.object({
  postID: z.string(),
  accountID: z.string(),
  createdAt: z.string(),
  media: z.array(
    z.object({
      alt: z.string(),
      url: z.string(),
    })
  ),
  text: z.string(),
  likes: z.array(
    z.object({
      accountID: z.string(),
    })
  ),
  reposts: z.array(
    z.object({
      accountID: z.string(),
    })
  ),
  replies: z.array(z.any()),
})
export type Post = typeof postValidator._input
export type Profile = {
  accountID: string
  createdAt: string
  avatar: string
  banner: string
  displayName: string
  userName: string
  bio: string
  id: string
  hasUsedPlatform: boolean
}
