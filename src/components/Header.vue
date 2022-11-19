<template>
  <div class="header">
    <el-button class="menu">
      <img class="menu-img" src="@/assets/icon_menu.svg" />
    </el-button>
  </div>
</template>

<script setup>
import _theme from '../theme'
const theme = _theme()
const goto = function (link) {
  window.open(link)
}
</script>

<style scoped lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $def-header-height;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 4%;

  .menu {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: v-bind('theme.current.bg_color');
    .menu-img {
      width: 16px;
      height: 16px;
    }
  }

  .menu:active {
    border: 0;
  }

  .menu:hover {
    background-color: v-bind('theme.current.menu_btn_hover_color');
    border: 0;
  }

  .nav-item {
    margin-right: 24px;
  }
}
</style>
