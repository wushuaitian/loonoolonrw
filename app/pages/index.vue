<template>
  <div class="home-page">
    <!-- ========== 顶部导航 ========== -->
    <header class="navbar">
      <div class="navbar-inner">
        <!-- 左侧 Logo + 文本 -->
        <div class="nav-left">
          <img src="/imag/logo.png" alt="Loonool Logo" class="logo-img" />
          <span class="logo-text">Loonool</span>
        </div>

        <!-- 中间导航 -->
        <nav class="nav-center">
          <NuxtLink to="/" class="nav-link">首页</NuxtLink>
          <NuxtLink to="/detect" class="nav-link">检测查重</NuxtLink>
          <NuxtLink to="/history" class="nav-link">历史结果</NuxtLink>
          <NuxtLink to="/help" class="nav-link">了解更多</NuxtLink>
        </nav>

        <!-- 右侧：登陆 / 注册 或 已登录信息 -->
        <div class="nav-right">
          <!-- 已登录：显示头像 + 名称 + 退出 -->
          <template v-if="user">
            <div class="user-info">
              <img
                v-if="user.picture"
                :src="user.picture"
                alt="avatar"
                class="avatar"
              />
              <span class="user-name">{{ user.name }}</span>
              <button type="button" class="btn-outline" @click="logout">
                退出登录
              </button>
            </div>
          </template>

          <!-- 未登录：显示登陆 / 注册按钮（都走 Google 流程） -->
          <template v-else>
            <button type="button" class="btn-outline" @click="loginWithGoogle">
              登陆
            </button>
            <button type="button" class="btn-solid" @click="loginWithGoogle">
              注册
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- ========== Hero ========== -->
    <main class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">
          视觉内容进入商业<br />
          世界前的安全层。
        </h1>

        <p class="hero-subtitle">
          查重 · 存证 · 维权 —— 一站式原创设计保护平台
        </p >

        <!-- 上传条 -->
        <div class="upload-bar">
          <div class="upload-left">
            <!-- 缩略图 -->
            <div class="thumb">
              <div class="thumb-img"></div>
              <span class="badge">1</span>
            </div>

            <!-- 加号 -->
            <button class="btn-add">+</button>
          </div>

          <!-- 发送按钮 -->
          <button class="btn-send">✈</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 使用我们封装好的 Google 登录 composable
import { useGoogleAuth } from '../../composables/useGoogleAuth'

const { user, loginWithGoogle, logout } = useGoogleAuth()

</script>

<style>
/* ========== 全局页面背景 ========== */
.home-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 70% 80%, #d4e9ff 0%, transparent 45%),
    radial-gradient(circle at 30% 85%, #ffddee 0%, transparent 50%),
    radial-gradient(circle at 50% 95%, #e9ddff 0%, transparent 55%),
    #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}

/* ========== 顶部导航 ========== */
.navbar {
  width: 100%;
  height: 66px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  padding: 0 20px;
}

.navbar-inner {
  width: 100%;
  max-width: 1280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 左侧：Logo + 字 */
.nav-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* logo 格式 */
.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: contain;
  display: block;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 0.5px;
}

/* 中间导航 */
.nav-center {
  display: flex;
  align-items: center;
  gap: 32px;
}

/* 默认状态：全部灰色 */
.nav-center .nav-link {
  text-decoration: none;
  font-size: 16px;
  color: #6b7280;
  position: relative;
  padding: 5px 0;
  cursor: pointer;
}

/* hover 时稍微加深 */
.nav-center .nav-link:hover {
  color: #111827;
}

/* 当前路由：Nuxt3 自动加的类 —— 变蓝色 + 加下划线 */
.nav-center .nav-link.router-link-exact-active {
  color: #2563eb !important;
  font-weight: 600;
}

.nav-center .nav-link.router-link-exact-active::after {
  content: "";
  height: 2px;
  width: 100%;
  background: #2563eb;
  position: absolute;
  bottom: -6px;
  left: 0;
  border-radius: 999px;
}

/* 右侧：登陆 / 注册按钮 or 用户信息 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 14px;
  color: #374151;
}

/* 头像样式（登录后展示） */
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 999px;
}

/* 按钮样式 */
.btn-outline {
  padding: 7px 20px;
  border-radius: 999px;
  border: 1px solid #2563eb;
  font-size: 14px;
  color: #2563eb;
  background: #ffffff;
  cursor: pointer;
}

.btn-outline:hover {
  background: #eff6ff;
}

.btn-solid {
  padding: 7px 20px;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  border: 1px solid #2563eb;
  box-shadow: 0 6px 14px rgba(37,99,235,0.28);
  cursor: pointer;
}

.btn-solid:hover {
  background: #1d4ed8;
}

/* ========== Hero 区域 ========== */
.hero {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

.hero-inner {
  text-align: center;
  max-width: 900px;
  margin-top: 30px;
}

.hero-title {
  font-size: 60px;
  font-weight: 700;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 26px;
}

.hero-subtitle {
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 40px;
}

/* ========== 上传条 ========== */
.upload-bar {
  width: 640px;
  height: 64px;
  background: #ffffff;
  border-radius: 999px;
  margin: 0 auto;
  padding: 10px 14px;
  box-shadow:
    0 20px 42px rgba(0,0,0,0.10),
    0 0 0 1px rgba(148,163,184,0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 缩略图 */
.thumb {
  width: 72px;
  height: 44px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
}

.thumb-img {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ff49a1, #8b5cf6);
}

.badge {
  position: absolute;
  right: 4px;
  top: 4px;
  background: #111827;
  color: #ffffff;
  font-size: 11px;
  border-radius: 999px;
  min-width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
}

/* 加号 */
.btn-add {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f3f4f6;
  border: 1px dashed #d1d5db;
  font-size: 22px;
  color: #9ca3af;
}

/* 发送按钮 */
.btn-send {
  width: 48px;
  height: 48px;
  background: #2563eb;
  border-radius: 999px;
  color: white;
  font-size: 20px;
  box-shadow: 0 10px 24px rgba(37,99,235,0.32);
}
</style>