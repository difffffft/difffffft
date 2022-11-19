<template>
  <router-view />
</template>

<script setup>
console.log(`
  ____ ___ _____ _____ _____ _____ _____ _____ _____ 
 |  _ \_ _|  ___|  ___|  ___|  ___|  ___|  ___|_   _|
 | | | | || |_  | |_  | |_  | |_  | |_  | |_    | |  
 | |_| | ||  _| |  _| |  _| |  _| |  _| |  _|   | |  
 |____/___|_|   |_|   |_|   |_|   |_|   |_|     |_|  
                                                     
`);
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html,
#app {
  width: 100%;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

input {
  background: none;
  outline: none;
  border: none;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
