<template>
  <div class="home">
    <Header />
    <el-drawer v-model="drawer" :show-close="false" :withHeader="false">
      <div v-for="(v, k) in data.list" :key="k" class="nav-box-item">
        <h4 class="nav-box-title">{{ v.title }}</h4>
        <div class="nav-box">
          <div
            class="nav-item hvr-wobble-vertical"
            @click="open(j.link)"
            v-for="(j, i) in v.list"
            :key="'nav_item' + i"
          >
            <img :src="j.icon" />
            <h4>{{ j.title }}</h4>
            <p>{{ j.desc }}</p>
            <div class="vpn" v-if="j.vpn">vpn</div>
          </div>
        </div>
      </div>
    </el-drawer>
    <div class="search-box">
      <h1 class="logo" @click="handleDrawerClick">
        <img src="@/assets/logo.png" alt="DIFFFFFFT" />
      </h1>
      <div class="search">
        <div class="search-input-box">
          <img
            class="platform-icon"
            :src="searchEngineList.list[searchDefaultEngine].icon"
            @click="handleSelectEngine"
          />
          <input
            v-model="searchStr"
            type="text"
            autocomplete="off"
            autofocus
            @input="searchChange"
            @focus="focus"
            @blur="blur"
          />
          <img
            v-show="showDelete"
            class="delete-icon"
            src="../assets/icon_delete.png"
            @click="delClick"
          />
          <img
            class="search-icon"
            src="../assets/icon_search.png"
            @click="search(searchStr)"
          />
        </div>

        <ul v-show="sugs.list.length != 0 && blurFlag">
          <li
            v-for="(v, k) in sugs.list"
            :key="'sug' + k"
            :class="{ 'sug-select': sugsIndex == k }"
            @mousedown="sugClick(v.q)"
          >
            {{ v.q }}
          </li>
        </ul>
      </div>
      <div class="center" v-if="sugs.list.length == 0 || !blurFlag">
        <a @click="handleDeveloperClick">
          Developer
        </a>
        <a @click="handleDesignerClick">
          Designer
        </a>
      </div>
    </div>
    <Footer v-show="footerIsShow" />
  </div>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import $ from 'jquery'
import { Debounce } from '@/utils/debounce'
import { onMounted, reactive, ref, watch } from 'vue'
import useKeyboard from '@/hooks/useKeyboard'
import _theme from '../theme'
import { ElNotification } from 'element-plus'

let theme = _theme()

let searchDefaultEngine = ref(0)
let searchEngineList = reactive({
  list: [
    {
      name: '百度',
      url: 'https://www.baidu.com/s?wd=',
      icon: require('@/assets/search_engine/baidu.png'),
    },
    {
      name: '谷歌',
      url: 'https://www.google.com/search?q=',
      icon: require('@/assets/search_engine/google.png'),
    },
    {
      name: '知乎',
      url: 'https://www.zhihu.com/search?type=content&q=',
      icon: require('@/assets/search_engine/zhihu.png'),
    },
  ],
})

let showDelete = ref(false)
let drawer = ref(false)
let searchStr = ref('')
let sugsIndex = ref(-1)
let blurFlag = ref(false)
let sugs = reactive({
  list: [],
})
let { footerIsShow } = useKeyboard()
let data = reactive({
  list: [],
})

document.onkeydown = (event) => {
  let e = event || window.event || arguments.callee.caller.arguments[0]
  if (e && e.keyCode == 13) {
    if (sugsIndex.value == -1) {
      search(searchStr.value)
    } else {
      search(sugs.list[sugsIndex.value].q)
    }
  }
  if (e && e.keyCode == 38) {
    sugsIndex.value--
    if (sugsIndex.value < 0) {
      sugsIndex.value = sugs.list.length - 1
    }
  }
  if (e && e.keyCode == 40) {
    sugsIndex.value++
    if (sugsIndex.value > sugs.list.length - 1) {
      sugsIndex.value = -1
    }
  }
}
const focus = function () {
  blurFlag.value = true
}
const blur = function () {
  blurFlag.value = false
}
const search = function (str) {
  window.open(searchEngineList.list[searchDefaultEngine.value].url + str)
}
const startSug = function (str) {
  if (str != searchStr.value) {
    return
  }
  let url = 'https://www.baidu.com/sugrec'
  $.ajax({
    async: false,
    url,
    type: 'GET',
    dataType: 'jsonp',
    data: {
      wd: str,
      json: 1,
      prod: 'pc',
    },
    success: (res) => {
      if (res.g) {
        sugs.list = res.g
        sugsIndex.value = -1
      }
    },
    error: (err) => {
      console.log(err)
    },
  })
}
const searchChange = function (e) {
  if (e.target.value === '') {
    sugs.list = []
    if (!showDelete.value) {
      return
    }
    showDelete.value = false
  } else {
    Debounce(startSug, e.target.value)
    if (showDelete.value) {
      return
    }
    showDelete.value = true
  }
}
const sugClick = function (str) {
  search(str)
}
const delClick = function () {
  searchStr.value = ''
  sugs.list = []
  showDelete.value = false
}
const open = function (link) {
  window.open(link)
}
const handleDrawerClick = function () {
  data.list = require('../data/me.js')
  drawer.value = !drawer.value
}
const handleDeveloperClick = function () {
  data.list = require('../data/development.js')
  drawer.value = !drawer.value
}
const handleDesignerClick = function () {
  data.list = require('../data/design.js')
  drawer.value = !drawer.value
}
const handleSelectEngine = function () {
  if (searchDefaultEngine.value + 1 == searchEngineList.list.length) {
    searchDefaultEngine.value = 0
  } else {
    searchDefaultEngine.value++
  }
  ElNotification.success({
    message: `切换搜索引擎为${
      searchEngineList.list[searchDefaultEngine.value].name
    }`,
  })
}
</script>

<style lang="scss">
@import '~@/styles/css/hover.css';

.rtl {
  width: 36% !important;
  min-height: 100% !important;
  background-color: v-bind('theme.current.drawer_bg_color') !important;
  padding: 12px;
}

.el-drawer__body::-webkit-scrollbar {
  display: none;
}

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: v-bind('theme.current.bg_color');

  .nav-box-item {
    margin-bottom: 40px;
    .nav-box-title {
      font-weight: 900;
      margin-bottom: 12px;
      color: v-bind('theme.current.font_color');
    }
  }

  .nav-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 12px;
    position: relative;

    .nav-item {
      overflow: hidden;
      padding: 16px 0;
      cursor: pointer;
      animation-fill-mode: forwards;
      background-color: v-bind('theme.current.drawer_nav_bg_color');
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      img {
        height: 36px;
        border-radius: 999px;
        background-color: v-bind('theme.current.drawer_nav_bg_color');
        padding: 2px;
      }
      h4 {
        width: 80%;
        line-height: 1;
        height: 14px;
        font-size: 14px;
        color: v-bind('theme.current.drawer_nav_title_color');
        margin-top: 8px;
      }
      p {
        margin-top: 4px;
        line-height: 1;
        height: 12px;
        font-size: 12px;
        width: 80%;
        text-align: center;
        color: v-bind('theme.current.drawer_nav_desc_color');
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .vpn {
      position: absolute;
      top: 0;
      right: 0;
      background-color: v-bind('theme.current.drawer_nav_vpn_bg_color');
      border-bottom-left-radius: 6px;
      padding: 2px 6px;
      font-size: 12px;
      color: v-bind('theme.current.drawer_nav_vpn_font_color');
      letter-spacing: 0.5px;
    }

    .nav-item:hover {
      transition: all 0.4s;
    }
  }

  .search-box {
    width: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 18vh;

    .logo {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        height: 100%;
      }
    }

    $search-height: 46px;
    .search {
      max-width: 580px;
      width: 100%;
      min-height: $search-height;
      border-radius: 23px;

      margin-top: 60px;
      display: flex;
      border: 1px solid v-bind('theme.current.search_border_color');
      flex-direction: column;

      .search-input-box {
        display: flex;
        align-items: center;

        .search-icon,
        .delete-icon,
        .platform-icon {
          width: $search-height;
          height: $search-height;
          padding: 15px;
          cursor: pointer;
        }
        input {
          width: 100%;
          min-height: $search-height;
          padding: 0 0;
          font-size: 16px;
          letter-spacing: 1px;
          color: v-bind('theme.current.search_font_color');
        }
      }
      ul {
        padding: 8px 0;
        li {
          text-align: left;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          padding: 0 $search-height;
          color: v-bind('theme.current.search_font_color');
          cursor: pointer;
        }
        .sug-select {
          color: v-bind('theme.current.search_sug_select_color');
        }
      }
    }
  }

  .center {
    display: flex;
    margin-top: 24px;

    a {
      background-color: v-bind('theme.current.quick_btn_bg_color');
      border: 1px solid v-bind('theme.current.quick_btn_bg_color');
      color: v-bind('theme.current.quick_btn_font_color');
      border-radius: 4px;
      font-size: 14px;
      margin: 0 6px;
      padding: 0 16px;
      line-height: 36px;
      height: 36px;
      min-width: 54px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
    }

    a:link {
      text-decoration: none;
    }
    a:visited {
      text-decoration: none;
    }
    a:hover {
      text-decoration: none;
    }
    a:active {
      text-decoration: none;
    }
  }
}

.el-popper {
  width: auto !important;
  background-color: v-bind('theme.current.popper_bg_color') !important;
  border-color: v-bind('theme.current.popper_border_color') !important;
  .content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 12px;
    place-items: center;

    .content-item {
      width: $def-header-height;
      height: $def-header-height;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .img {
        width: 50%;
        height: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 100%;
        text-align: center;
        margin-top: 4px;
        font-size: 12px;
        color: v-bind('theme.current.popper_font_color');
      }
    }
  }

  .el-popper__arrow::before {
    opacity: 0;
    background-color: v-bind('theme.current.popper_bg_color') !important;
  }
}

@media all and (orientation: portrait) {
  .rtl {
    width: 80% !important;
  }
  .nav-box {
    grid-template-columns: 1fr 1fr !important;
  }
}
</style>
