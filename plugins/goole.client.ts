// plugins/google.client.ts

export default defineNuxtPlugin((nuxtApp) => {
  // 封装一个加载 Google Identity 的函数
  const loadGoogleIdentity = () => {
    return new Promise<void>((resolve, reject) => {
      // 只在浏览器端处理
      if (typeof window === 'undefined') {
        resolve()
        return
      }

      // 已经加载过了就直接返回
      if ((window as any).google?.accounts?.id) {
        resolve()
        return
      }

      const script = document.createElement('script')
      // hl=zh-CN：强制 Google 登录 UI 为中文
      script.src = 'https://accounts.google.com/gsi/client?hl=zh-CN'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('加载 Google 登录脚本失败'))

      document.head.appendChild(script)
    })
  }

  // 把函数注入到 Nuxt 上，下游可以用 nuxtApp.$loadGoogleIdentity 调用
  nuxtApp.provide('loadGoogleIdentity', loadGoogleIdentity)
})