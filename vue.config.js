module.exports = {
  //关闭eslint语法校验
  lintOnSave: false,
  //项目打包路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //打包不生成map
  productionSourceMap: false,
  //关闭Host检查
  devServer: {
    disableHostCheck: true,
  },
  //配置全局sass
  css: {
    loaderOptions: {
      sass: {
        prependData: `
              @import "@/styles/scss/app.scss";
              `,
      },
    },
  },
};
