<template>
  <div class="faq-page">
    <!-- 顶部导航：保持原来的 -->
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
      <NuxtLink to="/help" class="nav-link nav-lin k-active">了解更多</NuxtLink>
    </nav>

    <!-- 右侧头像 -->
    <!-- <div class="nav-right">
      <div class="avatar"></div>
    </div> -->

    <!-- 右侧：登陆 / 注册按钮 -->
    <div class="nav-right">
      <button type="button" class="btn-outline">登陆</button>
      <button type="button" class="btn-solid">注册</button>
    </div>

  </div>
</header>
    <!-- 中间 Morisot 风格区域 -->
    <main class="faq-main">
      <section class="faq-container">
        <h1 class="faq-title">常见问答</h1>
        <p class="faq-subtitle">
          如需帮助或仍有疑问，欢迎发送邮件至 jinxiqian43@gmail.com，我们很乐意帮你解答。
        </p >

        <ul class="faq-list">
          <li
            v-for="item in faqs"
            :key="item.id"
            class="faq-item"
          >
            <!-- 问题行 -->
            <button
              class="faq-question-row"
              type="button"
              @click="toggle(item.id)"
            >
              <div class="faq-icon-circle">?</div>
              <span class="faq-question-text">
                {{ item.question }}
              </span>
              <span
                class="faq-chevron"
                :class="{ open: activeId === item.id }"
              >
                ˅
              </span>
            </button>

            <!-- 答案卡片：用 max-height + opacity 过渡，体验更顺滑 -->
            <div
              class="faq-answer-wrapper"
              :class="{ open: activeId === item.id }"
            >
              <div class="faq-answer-card">
                <p
                  v-for="(line, index) in item.answer"
                  :key="index"
                  class="faq-answer-text"
                >
                  {{ line }}
                </p >

                <div class="faq-answer-icon">
                  <div class="answer-icon-circle"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FaqItem {
  id: number
  question: string
  answer: string[]
}

const faqs = ref<FaqItem[]>([
  {
    id: 1,
    question: 'LOONOOL 是什么？',
    answer: [
      'LOONOOL 是一款帮助你判断图片是否适合商用（Safe-to-Use）的工具。',
      '你上传一张图片，我们会自动分析视觉、文案和基础行业规则，并生成一份清晰易懂的可用性报告。'
    ]
  },
  {
    id: 2,
    question: 'LOONOOL 和普通相似度工具有什么不同？',
    answer: [
      '大多数相似度工具只告诉你“这张图和别人像不像”。LOONOOL 的关注点不是“像”，而是：',
      '这张图是否适合商用？有没有可能造成视觉误解或误读？',
      '我们会从可用性的角度分析图片，例如：',
      '· 是否存在让人看不清、误读、误解的视觉结构；',
      '· 是否有容易和常见问题混淆的关键元素；',
      '· 图形的构图是否明确，外观提示是否足够；',
      '· 哪些地方可能在电商或市场宣传中出现问题。',
      '简单来说：',
      '相似度工具告诉你像不像，',
      'LOONOOL 告诉你“能不能用，哪里要注意，怎么改更稳”。'
    ]
  },
  {
    id: 3,
    question: 'LOONOOL 适合什么人使用？',
    answer: [
      'LOONOOL 更适合需要经常输出视觉物料的用户：设计师、电商运营、品牌方、市场团队、内容创作者等。',
      '在图片上线前，通过结构化报告提前发现潜在问题，可以减少返工和沟通成本。'
    ]
  },
  {
    id: 4,
    question: 'Safe-to-Use 报告里面有什么？',
    answer: [
      'Safe-to-Use 报告一般包括：',
      '· 视觉结构与构图分析；',
      '· 文案和关键信息的提示；',
      '· 基础行业规则的检查；',
      '· 以及可操作的修改建议。',
      '报告只从视觉可用性角度提供参考，不等同于法律意见。'
    ]
  },
  {
    id: 5,
    question: 'LOONOOL 会保存我的图片吗？',
    answer: [
      '不会长期保存。',
      '原图仅用于分析，最多保留 72 小时，之后自动删除。',
      ' 开启“保存历史”时，保存的也只是报告和缩略图，不是原图。'
    ]
  },
  {
    id: 6,
    question: '图片可以商用吗？你们会给结论吗？',
    answer: [
      '我们提供的是 技术层面的可用性分析与提示，',
      ' 最终能否商用，还需要结合你的使用场景、地区、文案和实际业务决定。'
    ]
  },
  {
    id: 7,
    question: '支持哪些类型的图片？',
    answer: [
      '•	支持 JPG / PNG / WebP',
      '•	适用于 Logo、图形主视觉、包装图、电商主图等',
      '•	不支持文档、视频、人脸识别或违法违规图像'
    ]
  },
  {
    id: 8,
    question: '需要登录才能生成报告吗？',
    answer: [
      ' 需要。',
      ' 登录后可保存报告、同步历史记录、持续跟踪你的修改版本。'
    ]
  },
  {
    id: 9,
    question: '一张图片可以生成几种报告？',
    answer: [
      '默认会生成 Safe-to-Use 报告。',
      '你也可以选择查看：',
      '•	原创度报告(Originality,逐步开放',
      '•	行业报告（如 Amazon / Food / Beauty 等，逐步开放）'
    ]
  },
  {
    id: 10,
    question: '报告可以分享和下载吗？',
    answer: [
      '可以。',
      '支持：',
      '•	PDF 下载',
      '•	分享只读链接给团队、客户、供应商查看'
    ]
  },
  {
    id: 11,
    question: '如果分析失败会怎么处理？',
    answer: [
      '系统会给出明确提示，你可以重新上传或稍后重试。',
      ' 不会影响你的其他图片或报告。'
    ]
  },
  {
    id: 12,
    question: ' 之后会增加哪些功能？',
    answer: [
      '我们正在开发：',
      '•	更多行业规范检测',
      '•	更深入的原创度/差异度分析',
      '•	团队协作和企业版',
      '•	私有图库比对（企业专属）',
    ]
  }
])

const activeId = ref<number | null>(1)

const toggle = (id: number) => {
  activeId.value = activeId.value === id ? null : id
}
</script>

<style scoped>
/* 整体背景 */
.faq-page {
   background:
    radial-gradient(circle at 70% 80%, #d4e9ff 0%, transparent 45%),
    radial-gradient(circle at 30% 85%, #ffddee 0%, transparent 50%),
    radial-gradient(circle at 50% 95%, #e9ddff 0%, transparent 55%),
    #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui,
    sans-serif;
}

/* 顶部导航（保留原来的样式） */
/* ========== 顶部导航 ========== */
/* 默认状态：全部灰色 */
.nav-link {
  color: #6b7280;
  text-decoration: none;
  padding-bottom: 3px;
  cursor: pointer;
  position: relative;
}

/* 当前路由：Nuxt3 自动加的类 —— 变蓝色 + 加下划线 */
.nav-link.router-link-exact-active {
  color: #2563eb !important;
  font-weight: 600;
}

.nav-link.router-link-exact-active::after {
  content: "";
  height: 2px;
  width: 100%;
  background: #2563eb;
  position: absolute;
  bottom: -6px;
  left: 0;
  border-radius: 999px;
}

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

.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: contain;
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

.nav-center .nav-link {
  text-decoration: none;
  font-size: 16px;
  color: #6b7280;
  position: relative;
  padding: 5px 0;
}

.nav-center .nav-link:hover {
  color: #111827;
}

.nav-center .nav-link.nav-link-active {
  color: #2563eb;
  font-weight: 600;
}

.nav-center .nav-link.nav-link-active::after {
  content: "";
  height: 2px;
  width: 100%;
  background: #2563eb;
  position: absolute;
  bottom: -6px;
  left: 0;
  border-radius: 999px;
}

/* 右侧头像 */
.nav-right {
  display: flex;
  align-items: center;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background-image: radial-gradient(circle at 30% 30%, #f9fafb 0, #9ca3af 40%, #111827 100%);
}

/* 右侧：登陆 / 注册按钮 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

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

/* 中部布局 */
.faq-main {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 40px 16px 64px;
}

.faq-container {
  max-width: 820px;
  width: 100%;
}

.faq-title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 15px;
}

.faq-subtitle {
  text-align: center;
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 32px;
}

/* FAQ 列表 */
.faq-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.faq-item {
  display: flex;
  flex-direction: column;
}

/* 问题行样式 */
.faq-question-row {
  width: 100%;
  border: none;
  outline: none;
  background: #ffffff;
  border-radius: 18px;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow:
    0 10px 20px rgba(15, 23, 42, 0.06),
    0 0 0 1px rgba(229, 231, 235, 0.6);
  cursor: pointer;
}

.faq-icon-circle {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #6b7280;
}

.faq-question-text {
  flex: 1;
  text-align: left;
  font-size: 18px;
  color: #111827;
}

.faq-chevron {
  font-size: 16px;
  color: #9ca3af;
  transition: transform 0.18s ease;
}

.faq-chevron.open {
  transform: rotate(180deg);
}

/* 答案容器：使用 max-height + opacity 动画 */
.faq-answer-wrapper {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    max-height 0.22s ease,
    opacity 0.18s ease,
    transform 0.22s ease,
    padding-top 0.22s ease;
  padding-top: 0;
}

.faq-answer-wrapper.open {
  max-height: 400px; /* 足够容纳最长答案 */
  opacity: 1;
  transform: translateY(0);
  padding-top: 10px;
}

/* 答案卡片 */
.faq-answer-card {
  position: relative;
  margin-left: 52px;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow:
    0 10px 22px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(229, 231, 235, 0.7);
}

.faq-answer-icon {
  position: absolute;
  right: 18px;
  top: 18px;
}

.answer-icon-circle {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid #d4d4d8;
  background: #f9fafb;
}

/* 文本 */
.faq-answer-text {
  margin: 0 0 6px;
  font-size: 16px;
  color: #4b5563;
  line-height: 1.8;
}

/* 响应式 */
@media (max-width: 900px) {
  .navbar {
    padding: 0 16px;
  }
  .nav-center {
    display: none;
  }
  .faq-main {
    padding: 24px 12px 40px;
  }
  .faq-container {
    max-width: 100%;
  }
  .faq-answer-card {
    margin-left: 44px;
  }
}
</style>