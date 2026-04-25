<script setup lang="ts">
// 1. Imports
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 2. Props / Refs / State
const { $i18n } = useNuxtApp()
const locale = computed(() => $i18n.locale.value === 'zh-TW' ? zhTw : en)

// 3. Watch / Event Handlers
// 4. Flow Control
// 5. Helpers
// 6. API Requests
// 7. Lifecycle
// 8. Emits
// 9. Expose
</script>

<template lang="pug">
ElConfigProvider(:locale="locale")
  .DefaultLayout
    //- Header
    header.DefaultLayout__header
      .container
        .DefaultLayout__headerContent
          .DefaultLayout__logo
            NuxtLink(to="/") Destination-Anywhere
          
          .DefaultLayout__nav
            nav.DefaultLayout__navMenu
              NuxtLink.DefaultLayout__navItem(to="/") {{ $t('navigation.home') }}
              NuxtLink.DefaultLayout__navItem(to="/destinations") {{ $t('navigation.destinations') }}
              NuxtLink.DefaultLayout__navItem(to="/booking") {{ $t('navigation.booking') }}
              NuxtLink.DefaultLayout__navItem(to="/profile") {{ $t('navigation.profile') }}
          
          .DefaultLayout__actions
            .DefaultLayout__language
              el-select(v-model="$i18n.locale" placeholder="Language")
                el-option(value="zh-TW" label="繁體中文")
                el-option(value="en" label="English")
            
            .DefaultLayout__auth
              el-button(type="primary" @click="$router.push('/login')") {{ $t('navigation.login') }}
              el-button(@click="$router.push('/register')") {{ $t('navigation.register') }}
    
    //- Main Content
    main.DefaultLayout__main
      .container
        slot
    
    //- Footer
    footer.DefaultLayout__footer
      .container
        .DefaultLayout__footerContent
          .DefaultLayout__footerSection
            h3.DefaultLayout__footerTitle Destination-Anywhere
            p.DefaultLayout__footerText {{ $t('common.info') }} - 旅遊目的地預訂平台
          
          .DefaultLayout__footerSection
            h3.DefaultLayout__footerTitle {{ $t('navigation.destinations') }}
            ul.DefaultLayout__footerLinks
              li: NuxtLink(to="/destinations/popular") 熱門目的地
              li: NuxtLink(to="/destinations/recommended") 推薦目的地
              li: NuxtLink(to="/destinations/search") 搜尋目的地
          
          .DefaultLayout__footerSection
            h3.DefaultLayout__footerTitle {{ $t('navigation.booking') }}
            ul.DefaultLayout__footerLinks
              li: NuxtLink(to="/booking/create") 建立預訂
              li: NuxtLink(to="/booking/history") 預訂記錄
              li: NuxtLink(to="/booking/cancel") 取消預訂
          
          .DefaultLayout__footerSection
            h3.DefaultLayout__footerTitle {{ $t('navigation.profile') }}
            ul.DefaultLayout__footerLinks
              li: NuxtLink(to="/profile/info") 個人資訊
              li: NuxtLink(to="/profile/settings") 設定
              li: NuxtLink(to="/profile/security") 安全設定
        
        .DefaultLayout__footerBottom
          p.DefaultLayout__copyright © 2026 Destination-Anywhere. All rights reserved.
</template>

<style lang="scss" scoped>
.DefaultLayout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.DefaultLayout__header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.DefaultLayout__headerContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.DefaultLayout__logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409eff;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #337ecc;
    }
  }
}

.DefaultLayout__navMenu {
  display: flex;
  gap: 2rem;
}

.DefaultLayout__navItem {
  color: #606266;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #409eff;
    background: #ecf5ff;
  }
  
  &--active {
    color: #409eff;
    background: #ecf5ff;
  }
}

.DefaultLayout__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.DefaultLayout__language {
  width: 120px;
}

.DefaultLayout__main {
  flex: 1;
  padding: 2rem 0;
}

.DefaultLayout__footer {
  background: #f5f7fa;
  border-top: 1px solid #e4e7ed;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.DefaultLayout__footerContent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.DefaultLayout__footerSection {
  h3 {
    color: #303133;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}

.DefaultLayout__footerLinks {
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #606266;
    text-decoration: none;
    
    &:hover {
      color: #409eff;
    }
  }
}

.DefaultLayout__footerBottom {
  border-top: 1px solid #e4e7ed;
  padding-top: 1rem;
  text-align: center;
  color: #909399;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
