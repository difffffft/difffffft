import{_ as e,c as a,o as s,R as t}from"./chunks/framework.43nt70q0.js";const m=JSON.parse('{"title":"NodeJS版本过高导致的OpenSSL3.0报错","description":"","frontmatter":{"title":"NodeJS版本过高导致的OpenSSL3.0报错","date":"2023-07-14","categories":["前端"]},"headers":[],"relativePath":"mds/front/OpenSSL3.0报错/index.md","filePath":"mds/front/OpenSSL3.0报错/index.md","lastUpdated":null}'),n={name:"mds/front/OpenSSL3.0报错/index.md"},o=t(`<h2 id="解决方法" tabindex="-1">解决方法 <a class="header-anchor" href="#解决方法" aria-label="Permalink to &quot;解决方法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>   &quot;serve&quot;: &quot;SET NODE_OPTIONS=--openssl-legacy-provider &amp;&amp; vue-cli-service serve&quot;,</span></span>
<span class="line"><span>   &quot;build&quot;: &quot;SET NODE_OPTIONS=--openssl-legacy-provider &amp;&amp; vue-cli-service build&quot;</span></span>
<span class="line"><span>},</span></span></code></pre></div>`,2),p=[o];function i(c,l,d,r,_,u){return s(),a("div",null,p)}const h=e(n,[["render",i]]);export{m as __pageData,h as default};
