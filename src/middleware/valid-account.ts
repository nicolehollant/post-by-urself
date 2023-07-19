export default defineNuxtRouteMiddleware(async () => {
  try {
    const { $profileIsValid, $toast, $profile } = useNuxtApp()
    if (!$profileIsValid.value) {
      if ($profile.value.hasUsedPlatform) {
        $toast.add({
          placement: 'top-right',
          type: 'error',
          durationMs: 5000,
          content: 'Account is invalid, please fix before continuing',
          title: 'Error',
        })
      }
      return navigateTo('/profile/edit')
    }
    return
  } catch (error) {
    return
  }
})
