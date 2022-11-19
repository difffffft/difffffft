<template>
  <div class="footer">
    <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer"
      >蜀ICP备2021033158号</a
    >
    <a href="javascript:void(0)">隐私政策</a>
  </div>
</template>

<script setup>
import _theme from '../theme';
let theme = _theme();
</script>

<style scoped lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $def-footer-height;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: v-bind('theme.current.footer_a_color') !important;
    margin-left: 15px;
    cursor: pointer;
    position: relative;
    line-height: 1.28;
    touch-action: manipulation;
    background-color: transparent;
    outline: 0;
    transition: color 0.3s;
    text-align: center;
    font-size: 12px;
    font-family: Roboto, arial, sans-serif;
  }
  a:link {
    text-decoration: none;
  }
}
</style>
