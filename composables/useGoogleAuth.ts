// app/composables/useGoogleAuth.ts
import { jwtDecode } from 'jwt-decode'

interface GoogleUser {
  sub: string
  email: string
  name: string
  picture?: string
}

export const useGoogleAuth = () => {
  const user = useState<GoogleUser | null>('googleUser', () => null)
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const loadGoogleIdentity = nuxtApp.$loadGoogleIdentity as () => Promise<void>

  onMounted(() => {
    if (!process.client) return
    const saved = localStorage.getItem('loonool_google_user')
    if (saved) {
      try {
        user.value = JSON.parse(saved)
      } catch (e) {
        console.error('解析本地用户失败', e)
      }
    }
  })

  const saveUser = (u: GoogleUser | null) => {
    user.value = u
    if (!process.client) return
    if (u) {
      localStorage.setItem('loonool_google_user', JSON.stringify(u))
    } else {
      localStorage.removeItem('loonool_google_user')
    }
  }

  const handleCredential = (credential: string) => {
    const payload: any = jwtDecode(credential)
    const u: GoogleUser = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    }
    saveUser(u)
  }

  const loginWithGoogle = async () => {
    try {
      if (!loadGoogleIdentity) {
        console.error('Google 插件未正确注入（$loadGoogleIdentity 不存在）')
        return
      }

      // 先加载脚本
      await loadGoogleIdentity()

      ;(window as any).google.accounts.id.initialize({
        client_id: config.public.googleClientId,
        callback: (res: any) => {
          if (res.credential) {
            handleCredential(res.credential)
          }
        }
      })

      ;(window as any).google.accounts.id.prompt()
    } catch (e) {
      console.error('Google 登录失败', e)
    }
  }

  const logout = () => {
    if (user.value?.email && (window as any).google?.accounts?.id) {
      ;(window as any).google.accounts.id.revoke(user.value.email, () => {
        saveUser(null)
      })
    } else {
      saveUser(null)
    }
  }

  return {
    user,
    loginWithGoogle,
    logout
  }
}