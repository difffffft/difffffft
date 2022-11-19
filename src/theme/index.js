import { defineStore } from 'pinia'

//引入主题
import dark from './dark'
import light from './light'

//默认主题
let DEFAULT_THEME = 'light'

let timeNow = new Date()
let hours = timeNow.getHours()
// 18点-08点默认为暗黑模式
if ((hours >= 18 && hours <= 24) || (hours >= 0 && hours <= 8)) {
  localStorage.setItem('app_theme', 'dark')
} else {
  localStorage.setItem('app_theme', 'light')
}

let theme = localStorage.getItem('app_theme')
if (!theme) {
  localStorage.setItem('app_theme', DEFAULT_THEME)
  theme = DEFAULT_THEME
}

const themeStore = defineStore('theme', {
  state: () => {
    return {
      //定义当前主题
      theme,

      //注册所有主题
      themes: { light, dark },
    }
  },
  getters: {
    //获得当前主题
    current() {
      return this.themes[this.theme]
    },
  },
  actions: {
    //改变主题的方法
    change(params) {
      let _theme = null
      if (params && typeof params == 'string' && this.themes[params]) {
        _theme = params
        if (this.theme == _theme) {
          return
        }
      } else {
        _theme = this.theme == 'dark' ? 'light' : 'dark'
      }
      localStorage.setItem('app_theme', _theme)
      this.theme = _theme
    },
  },
})

export default themeStore
