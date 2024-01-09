import{_ as s,c as n,o as a,R as p}from"./chunks/framework.43nt70q0.js";const b=JSON.parse('{"title":"极小编译器","description":"","frontmatter":{"title":"极小编译器","date":"2023-12-11","categories":["前端"]},"headers":[],"relativePath":"mds/arithmetic/编译器/index.md","filePath":"mds/arithmetic/编译器/index.md","lastUpdated":null}'),e={name:"mds/arithmetic/编译器/index.md"},l=p(`<p>今天我们一起动手写一个编译器，但不是我们平常所说的编译器，而是一个超级超级小的编译器，小到如果你把本文件的所有注释都删了，真正的代码也就200多行。</p><p>我们将把<code>lisp</code>风格的函数调用编译成<code>C</code>风格的函数调用，如果你对这两个不熟悉的话，让我来简单介绍一下。</p><p>如果我们有两个函数：<code>add</code>和<code>subtract</code>，它们会写成下面的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>               LISP                      C</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2 + 2          (add 2 2)                 add(2, 2)</span></span>
<span class="line"><span>4 - 2          (subtract 4 2)            subtract(4, 2)</span></span>
<span class="line"><span>2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))</span></span></code></pre></div><p>是不是很简单？</p><p>很好，这就是我们要编译的，虽然这并不是一个完整的<code>LISP</code>或<code>C</code>语法，但是这小部分的语法足以向我们展示一个现代编译器的主要部分。</p><p>大多数的编译器都会分成三个主要的阶段：解析（Parsing）、转换（Transformation）以及生成代码（Code Generation）。</p><p>1._Parsing_会将源代码转换成更抽象的代码表示；</p><p>2._Transformation_会对这个抽象的代码表示进行任何它想要的操作；</p><p>3._Code Generation_会把操作完的代码抽象表示生成新代码；</p><h2 id="解析-parsing" tabindex="-1">解析（Parsing） <a class="header-anchor" href="#解析-parsing" aria-label="Permalink to &quot;解析（Parsing）&quot;">​</a></h2><p>解析通常分为两个阶段：词法分析和语法分析。</p><p>1._词法分析_会使用一个叫做分词器（tokenizer）的东西来把源代码切割成一个个叫做标记（token）的东西；</p><p>​ <code>tokens</code>是一个数组，里面每项都是用来描述语法中一个独立块的最小对象，它们可以是数字、标签、标点、运算符等等。</p><p>2._语法分析_会把标记重新组合，用来描述语法的每个部分，并建立起它们之间的联系，这一般被称作为“抽象语法树”。</p><p>​ 一个抽象语法树（简称为<code>AST</code>），是一个深层嵌套的对象，以一种又简单又能告诉我们大量信息的方式来表示代码。</p><p>对于下面的语法：</p><p>（add 2 (subtract 4 2)）</p><p><code>token</code>列表是下面这样的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[</span></span>
<span class="line"><span>     { type: &#39;paren&#39;,  value: &#39;(&#39;        },</span></span>
<span class="line"><span>     { type: &#39;name&#39;,   value: &#39;add&#39;      },</span></span>
<span class="line"><span>     { type: &#39;number&#39;, value: &#39;2&#39;        },</span></span>
<span class="line"><span>     { type: &#39;paren&#39;,  value: &#39;(&#39;        },</span></span>
<span class="line"><span>     { type: &#39;name&#39;,   value: &#39;subtract&#39; },</span></span>
<span class="line"><span>     { type: &#39;number&#39;, value: &#39;4&#39;        },</span></span>
<span class="line"><span>     { type: &#39;number&#39;, value: &#39;2&#39;        },</span></span>
<span class="line"><span>     { type: &#39;paren&#39;,  value: &#39;)&#39;        },</span></span>
<span class="line"><span>     { type: &#39;paren&#39;,  value: &#39;)&#39;        },</span></span>
<span class="line"><span>   ]</span></span></code></pre></div><p><code>AST</code>是这样的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>     type: &#39;Program&#39;,</span></span>
<span class="line"><span>     body: [{</span></span>
<span class="line"><span>       type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>       name: &#39;add&#39;,</span></span>
<span class="line"><span>       params: [{</span></span>
<span class="line"><span>         type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>         value: &#39;2&#39;,</span></span>
<span class="line"><span>         }, {</span></span>
<span class="line"><span>         type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>         name: &#39;subtract&#39;,</span></span>
<span class="line"><span>         params: [{</span></span>
<span class="line"><span>           type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>           value: &#39;4&#39;,</span></span>
<span class="line"><span>         }, {</span></span>
<span class="line"><span>           type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>           value: &#39;2&#39;,</span></span>
<span class="line"><span>         }]</span></span>
<span class="line"><span>       }]</span></span>
<span class="line"><span>     }]</span></span>
<span class="line"><span>   }</span></span></code></pre></div><h2 id="转换-transformation" tabindex="-1">转换（Transformation） <a class="header-anchor" href="#转换-transformation" aria-label="Permalink to &quot;转换（Transformation）&quot;">​</a></h2><p>编译器的下一个阶段是转换，再强调一次，这个阶段只是把上个阶段生成的<code>AST</code>拿来进行一些修改，它可以保持原来的语言，也可以把它翻译成全新的语言。</p><p>让我们看看如何转换<code>AST</code>。</p><p>你可能会注意到我们<code>AST</code>里的元素看起来都非常相似，这些对象都有一个<code>type</code>属性，每个节点都被称为<code>AST</code>节点，这些节点上都定义了一些属性，用来描述树的一个部分。</p><p>我们可以为<code>NumberLiteral</code>创建一个节点：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>     type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>     value: &#39;2&#39;,</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>或者为<code>CallExpression</code>创建一个节点：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>     type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>     name: &#39;subtract&#39;,</span></span>
<span class="line"><span>     params: [...嵌套节点...],</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当转换<code>AST</code>的时候，我们可以通过这些方式来操作节点：<code>添加</code>、<code>移除</code>、<code>替换</code>属性，我们可以添加新节点，或者我们可以不管现有的<code>AST</code>，直接在它的基础上创建一个新的<code>AST</code>。</p><p>因为我们的目标是一个新语言，所以我们将基于目标语言创建一个全新的<code>AST</code>。</p><h2 id="遍历-traversal" tabindex="-1">遍历（Traversal） <a class="header-anchor" href="#遍历-traversal" aria-label="Permalink to &quot;遍历（Traversal）&quot;">​</a></h2><p>为了在所有节点中穿梭，我们需要能够遍历它们，这个遍历的过程会以深度优先的方式到达每个节点。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>     type: &#39;Program&#39;,</span></span>
<span class="line"><span>     body: [{</span></span>
<span class="line"><span>       type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>       name: &#39;add&#39;,</span></span>
<span class="line"><span>       params: [{</span></span>
<span class="line"><span>         type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>         value: &#39;2&#39;</span></span>
<span class="line"><span>       }, {</span></span>
<span class="line"><span>         type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>         name: &#39;subtract&#39;,</span></span>
<span class="line"><span>         params: [{</span></span>
<span class="line"><span>           type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>           value: &#39;4&#39;</span></span>
<span class="line"><span>         }, {</span></span>
<span class="line"><span>           type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>           value: &#39;2&#39;</span></span>
<span class="line"><span>         }]</span></span>
<span class="line"><span>       }]</span></span>
<span class="line"><span>     }]</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>对于上述<code>AST</code>，我们将依次访问：</p><blockquote><p>1.Program - 从<code>AST</code>的顶层开始<br> 2.CallExpression (add) - 移动到Program的body列表的第一个元素<br> 3.NumberLiteral (2) - 移动到CallExpression的params列表的第一个元素<br> 4.CallExpression (subtract) - 移动到CallExpression的params列表的第二个元素<br> 5.NumberLiteral (4) - 移动到CallExpression (subtract)的params列表的第一个元素<br> 6.NumberLiteral (2) - 移动到CallExpression (subtract)的params列表的第二个元素</p></blockquote><p>如果我们直接操作这个<code>AST</code>，而不是重新创建一个，我们可能会在这里引入各种抽象概念。但其实直接访问（visiting）树的每个节点就够我们使用了。</p><p>我之所以使用“访问”（visiting）这个词，是因为这里存在这样一种模式，即如何表示对对象结构上的元素的操作。</p><h2 id="访问者-visitors" tabindex="-1">访问者（Visitors） <a class="header-anchor" href="#访问者-visitors" aria-label="Permalink to &quot;访问者（Visitors）&quot;">​</a></h2><p>基本思路是创建一个<code>visitor</code>访问器对象，提供一些接受不同节点类型的方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var visitor = {</span></span>
<span class="line"><span>    NumberLiteral() {},</span></span>
<span class="line"><span>    CallExpression() {},</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>当我们遍历<code>AST</code>，每当遇到一个匹配的节点时，我们会调用这个访问器上对应节点类型的方法。</p><p>为了能让这些方法更有用，我们会传入两个参数，当前遍历到的节点，以及它的父节点。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var visitor = {</span></span>
<span class="line"><span>    NumberLiteral(node, parent) {},</span></span>
<span class="line"><span>    CallExpression(node, parent) {},</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>然而，当退出时也存在需要访问的可能性，想象一下我们之前列表形式的树结构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- Program</span></span>
<span class="line"><span>     - CallExpression</span></span>
<span class="line"><span>       - NumberLiteral</span></span>
<span class="line"><span>       - CallExpression</span></span>
<span class="line"><span>         - NumberLiteral</span></span>
<span class="line"><span>         - NumberLiteral</span></span></code></pre></div><p>当我们向下遍历时，很容易在一个分支上走到头，当我们遍历完某个分支了我们就会退出它，所以往下走的时候我们会“进入”每个节点，往上走时会“退出”节点。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>-&gt; Program (enter)</span></span>
<span class="line"><span>     -&gt; CallExpression (enter)</span></span>
<span class="line"><span>       -&gt; Number Literal (enter)</span></span>
<span class="line"><span>       &lt;- Number Literal (exit)</span></span>
<span class="line"><span>       -&gt; Call Expression (enter)</span></span>
<span class="line"><span>          -&gt; Number Literal (enter)</span></span>
<span class="line"><span>          &lt;- Number Literal (exit)</span></span>
<span class="line"><span>          -&gt; Number Literal (enter)</span></span>
<span class="line"><span>          &lt;- Number Literal (exit)</span></span>
<span class="line"><span>       &lt;- CallExpression (exit)</span></span>
<span class="line"><span>     &lt;- CallExpression (exit)</span></span>
<span class="line"><span>   &lt;- Program (exit)</span></span></code></pre></div><p>为了支持这种情况，最终的访问器是这样的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var visitor = {</span></span>
<span class="line"><span>    NumberLiteral: {</span></span>
<span class="line"><span>        enter(node, parent) {},</span></span>
<span class="line"><span>        exit(node, parent) {},</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span></code></pre></div><h2 id="生成代码-code-generation" tabindex="-1">生成代码（Code Generation） <a class="header-anchor" href="#生成代码-code-generation" aria-label="Permalink to &quot;生成代码（Code Generation）&quot;">​</a></h2><p>编译器的最后一个阶段是生成代码，有时编译器会做一些和转换重合的事情，但大多数情况下，生成代码只是意味着把<code>AST</code>转换回代码字符串。</p><p>代码生成器有几种不同的工作方式，一些编译器会重用之前的<code>token</code>，其他的会创建一个独立的代码表示，这样就可以线性的打印节点，但据我所知，大多数的都会直接使用我们刚刚创建的<code>AST</code>，我们也会这么干。</p><p>实际上我们的代码生成器知道如何去打印<code>AST</code>上所有不同类型的节点，它会递归调用自己去打印所有嵌套节点，直到所有内容都被打印到一个长长的代码字符串中。</p><h2 id="小结一下" tabindex="-1">小结一下 <a class="header-anchor" href="#小结一下" aria-label="Permalink to &quot;小结一下&quot;">​</a></h2><p>上面就是我们要做的编译器，它包含了一个真正编译器的所有部分。</p><p>但这并不意味着所有编译器都和我上面描述的一样，每个编译器可能都有不同的用途，所以它们除了我上面提到的内容外，可能它们还会有更多的步骤。</p><p>但是你现在应该会对大多数编译器有一个总体的基本的认识。</p><p>既然我已经把编译器的内容都介绍完了，现在你是否能自己写一个编译器了呢？</p><p>开个玩笑了，下面让我来帮你一起完成它。</p><p>开始吧。。。</p><h2 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h2><h2 id="分词器" tabindex="-1">分词器 <a class="header-anchor" href="#分词器" aria-label="Permalink to &quot;分词器&quot;">​</a></h2><p>我们将从解析的第一个阶段开始，使用分词器进行词法分析。</p><p>我们要做的只是把代码字符串分解成一个token数组：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(add 2 (subtract 4 2))   =&gt;   [{ type: &#39;paren&#39;, value: &#39;(&#39; }, ...]</span></span></code></pre></div><p>函数接收一个代码字符串为入参，我们要做两件事：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function tokenizer(input) {</span></span>
<span class="line"><span>    // \`current\`变量就像一个游标，跟踪我们在代码中当前的位置</span></span>
<span class="line"><span>    let current = 0;</span></span>
<span class="line"><span>    // \`tokens\`数组用来存放生成的token</span></span>
<span class="line"><span>    let tokens = [];</span></span>
<span class="line"><span>    // 我们从创建一个while循环开始，在循环中会按照我们想要的递增量来更新current</span></span>
<span class="line"><span>    // 这样做是因为可能一个循环里会多次更新current，因为一个token的长度是任意的</span></span>
<span class="line"><span>    while (current &lt; input.length) {</span></span>
<span class="line"><span>        // 当前位置的字符</span></span>
<span class="line"><span>        let char = input[current];</span></span>
<span class="line"><span>        // 首先要检查的是左括号\`（\`，后面会用于\`CallExpression\`，但是现在我们只关心字符</span></span>
<span class="line"><span>        // 检查是否是左括号：</span></span>
<span class="line"><span>        if (char === &#39;(&#39;) {</span></span>
<span class="line"><span>            // 如果匹配到了，添加一个类型为\`paren\`的token，设置它的值为\`(\`</span></span>
<span class="line"><span>            tokens.push({</span></span>
<span class="line"><span>                type: &#39;paren&#39;,</span></span>
<span class="line"><span>                value: &#39;(&#39;,</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>            // 递增\`current\`</span></span>
<span class="line"><span>            current++;</span></span>
<span class="line"><span>            // 跳过当前循环，进入下一个循环</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 接下来检查是否是右括号\`)\`，和刚才一样：匹配到右括号，添加一个新的token，递增current，最后跳过当前循环进入下一个循环</span></span>
<span class="line"><span>        if (char === &#39;)&#39;) {</span></span>
<span class="line"><span>            tokens.push({</span></span>
<span class="line"><span>                type: &#39;paren&#39;,</span></span>
<span class="line"><span>                value: &#39;)&#39;,</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>            current++;</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 继续，接下来我们要检查的是空白符，空白符是用来分隔字符的，但它实际上并不重要，所以不会把它当做一个token进行添加</span></span>
<span class="line"><span>        // 所以这里我们仅仅检查是否匹配到了空白符，匹配到了就跳过</span></span>
<span class="line"><span>        let WHITESPACE = /\\s/;</span></span>
<span class="line"><span>        if (WHITESPACE.test(char)) {</span></span>
<span class="line"><span>            current++;</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 下一个token类型是number，这和之前的几种不一样，因为数字可能有任意长度，我们需要把数字整体作为一个token进行添加</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        //   (add 123 456)</span></span>
<span class="line"><span>        //        ^^^ ^^^</span></span>
<span class="line"><span>        //        虽然有六个字符，但是只算两个单独的token</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // 当遇到序列中的第一个数字时，我们就开始了...</span></span>
<span class="line"><span>        let NUMBERS = /[0-9]/;</span></span>
<span class="line"><span>        if (NUMBERS.test(char)) {</span></span>
<span class="line"><span>            // 创建一个value变量，用来保存整个数字</span></span>
<span class="line"><span>            let value = &#39;&#39;;</span></span>
<span class="line"><span>            // 接下来遍历这之后的每一个字符，直到遇到非数字字符</span></span>
<span class="line"><span>            while (NUMBERS.test(char)) {</span></span>
<span class="line"><span>                // 拼接当前数字</span></span>
<span class="line"><span>                value += char;</span></span>
<span class="line"><span>                // 更新current，移动到下一个字符</span></span>
<span class="line"><span>                char = input[++current];</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 之后我们添加一个number类型的token</span></span>
<span class="line"><span>            tokens.push({ type: &#39;number&#39;, value });</span></span>
<span class="line"><span>            // 继续</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 我们也要增加对字符串的支持，即任何被双引号包裹起来的字符（&quot;）</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        //   (concat &quot;foo&quot; &quot;bar&quot;)</span></span>
<span class="line"><span>        //            ^^^   ^^^ 字符串类型的token</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // 我们先检查一下开头的引号（&quot;）：</span></span>
<span class="line"><span>        if (char === &#39;&quot;&#39;) {</span></span>
<span class="line"><span>            // 创建一个value变量用来保存token的值</span></span>
<span class="line"><span>            let value = &#39;&#39;;</span></span>
<span class="line"><span>            // 跳过开头的双引号</span></span>
<span class="line"><span>            char = input[++current];</span></span>
<span class="line"><span>            // 遍历之后的每一个字符，直到遇到结尾的双引号</span></span>
<span class="line"><span>            while (char !== &#39;&quot;&#39;) {</span></span>
<span class="line"><span>                // 更新value</span></span>
<span class="line"><span>                value += char;</span></span>
<span class="line"><span>                // 移到下一个字符</span></span>
<span class="line"><span>                char = input[++current];</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 跳过结尾的双引号</span></span>
<span class="line"><span>            char = input[++current];</span></span>
<span class="line"><span>            // 添加一个string类型的token</span></span>
<span class="line"><span>            tokens.push({ type: &#39;string&#39;, value });</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 还剩最后一种\`name\`类型的token，这是一个字母形式的字符，不是数字，作为我们的lisp语法里的函数名</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        //   (add 2 4)</span></span>
<span class="line"><span>        //    ^^^</span></span>
<span class="line"><span>        //    Name token</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        let LETTERS = /[a-z]/i;</span></span>
<span class="line"><span>        if (LETTERS.test(char)) {</span></span>
<span class="line"><span>            let value = &#39;&#39;;</span></span>
<span class="line"><span>            // 同样的，还是循环遍历之后的所有字符</span></span>
<span class="line"><span>            while (LETTERS.test(char)) {</span></span>
<span class="line"><span>                value += char;</span></span>
<span class="line"><span>                char = input[++current];</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 添加一个\`name\`类型的token，然后继续到下一个循环</span></span>
<span class="line"><span>            tokens.push({ type: &#39;name&#39;, value });</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 最后，如果到这里还有我们没有匹配到的字符，那就相当于语法有误，我们搞不定了，那么就直接抛错然后中止循环</span></span>
<span class="line"><span>        throw new TypeError(&#39;I dont know what this character is: &#39; + char);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 最后的最后，我们的分词器只要返回token列表就可以了</span></span>
<span class="line"><span>    return tokens;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="解析器" tabindex="-1">解析器 <a class="header-anchor" href="#解析器" aria-label="Permalink to &quot;解析器&quot;">​</a></h2><p>对于解析器来说，要做的是把<code>token</code>列表转换成<code>AST</code>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[{ type: &#39;paren&#39;, value: &#39;(&#39; }, ...]   =&gt;   { type: &#39;Program&#39;, body: [...] }</span></span></code></pre></div><p>定义一个<code>parser</code>函数，接收<code>token</code>列表作为参数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function parser(tokens) {</span></span>
<span class="line"><span>    // 同样的，我们维护一个\`current\`变量作为游标</span></span>
<span class="line"><span>    let current = 0;</span></span>
<span class="line"><span>    // 但是这里我们将使用递归，而不是while循环，定义一个递归函数</span></span>
<span class="line"><span>    function walk() {</span></span>
<span class="line"><span>        // 先获取并保存当前位置的token</span></span>
<span class="line"><span>        let token = tokens[current];</span></span>
<span class="line"><span>        // 我们将把每种类型的token分成不同的代码路径，从\`number\`类型的token开始</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // 判断是否是一个\`number\`类型的token</span></span>
<span class="line"><span>        if (token.type === &#39;number&#39;) {</span></span>
<span class="line"><span>            // 如果是的话，先递增一下current</span></span>
<span class="line"><span>            current++;</span></span>
<span class="line"><span>            // 返回一个新的AST节点，类型是\`NumberLiteral\`，它的value就是token的value</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>                value: token.value,</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // \`string\`类型和\`number\`类型一样，创建一个\`StringLiteral\`类型的节点并返回</span></span>
<span class="line"><span>        if (token.type === &#39;string&#39;) {</span></span>
<span class="line"><span>            current++;</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                type: &#39;StringLiteral&#39;,</span></span>
<span class="line"><span>                value: token.value,</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 接下来，我们要找的是\`CallExpressions\`，这从我们遇到左括号开始</span></span>
<span class="line"><span>        if (</span></span>
<span class="line"><span>            token.type === &#39;paren&#39; &amp;&amp;</span></span>
<span class="line"><span>            token.value === &#39;(&#39;</span></span>
<span class="line"><span>        ) {</span></span>
<span class="line"><span>            // 递增current，跳过左括号，因为它在AST里不需要</span></span>
<span class="line"><span>            token = tokens[++current];</span></span>
<span class="line"><span>            // 创建一个基础的\`CallExpression\`节点，然后把值设置为当前token的value，因为左括号的右边紧接着就是函数名</span></span>
<span class="line"><span>            let node = {</span></span>
<span class="line"><span>                type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>                name: token.value,</span></span>
<span class="line"><span>                params: [],</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>            // 递增current跳过函数名token</span></span>
<span class="line"><span>            token = tokens[++current];</span></span>
<span class="line"><span>            // 接下来遍历后面的节点作为调用表达式\`CallExpression\`的参数\`params\`，直到遇到右括号</span></span>
<span class="line"><span>            //</span></span>
<span class="line"><span>            // 这就是递归的用处，我们将依赖递归来解析一组可能无限嵌套的节点</span></span>
<span class="line"><span>            //</span></span>
<span class="line"><span>            // 为了解释这一点，让我们再看看Lisp代码，你可以看到\`add\`方法有一个数字参数和一个嵌套的\`CallExpression\`，同样它又存在两个数字参数：</span></span>
<span class="line"><span>            //</span></span>
<span class="line"><span>            //   (add 2 (subtract 4 2))</span></span>
<span class="line"><span>            //</span></span>
<span class="line"><span>            // 你也会注意到token列表中存在多个右括号：</span></span>
<span class="line"><span>            //</span></span>
<span class="line"><span>            //   [</span></span>
<span class="line"><span>            //     { type: &#39;paren&#39;,  value: &#39;(&#39;        },</span></span>
<span class="line"><span>            //     { type: &#39;name&#39;,   value: &#39;add&#39;      },</span></span>
<span class="line"><span>            //     { type: &#39;number&#39;, value: &#39;2&#39;        },</span></span>
<span class="line"><span>            //     { type: &#39;paren&#39;,  value: &#39;(&#39;        },</span></span>
<span class="line"><span>            //     { type: &#39;name&#39;,   value: &#39;subtract&#39; },</span></span>
<span class="line"><span>            //     { type: &#39;number&#39;, value: &#39;4&#39;        },</span></span>
<span class="line"><span>            //     { type: &#39;number&#39;, value: &#39;2&#39;        },</span></span>
<span class="line"><span>            //     { type: &#39;paren&#39;,  value: &#39;)&#39;        }, &lt;&lt;&lt; 右括号</span></span>
<span class="line"><span>            //     { type: &#39;paren&#39;,  value: &#39;)&#39;        }, &lt;&lt;&lt; 右括号</span></span>
<span class="line"><span>            //   ]</span></span>
<span class="line"><span>            //</span></span>
<span class="line"><span>            // 我们将依赖嵌套的\`walk\`函数来递增\`current\`，直到所有的\`CallExpression\`之后</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 因此我们创建一个\`while\`循环，递归调用\`walk\`，直到遇到右括号</span></span>
<span class="line"><span>            // 译者注：这里其实就是考察递归思维，如果一个任务可以拆解成更小的子任务，且子任务和大任务的逻辑是一样的就可以使用递归，对于这里来说，add函数的参数的类型是任意的，可以是数字，可以是字符串，也可以是另外一个函数，另一个函数又会遇到和add函数一样的问题，所以直接交给递归函数执行，对于add来说，你只要返回AST节点就可以了。</span></span>
<span class="line"><span>            while (</span></span>
<span class="line"><span>                (token.type !== &#39;paren&#39;) ||</span></span>
<span class="line"><span>                (token.type === &#39;paren&#39; &amp;&amp; token.value !== &#39;)&#39;)</span></span>
<span class="line"><span>            ) {</span></span>
<span class="line"><span>                // 调用递归函数，它将返回一个AST节点，添加到当前的\`params\`列表里</span></span>
<span class="line"><span>                node.params.push(walk());</span></span>
<span class="line"><span>                token = tokens[current];</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 递增current，用来跳过右括号</span></span>
<span class="line"><span>            current++;</span></span>
<span class="line"><span>            // 返回节点</span></span>
<span class="line"><span>            return node;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 同样的，如果遇到我们无法识别的token就抛错</span></span>
<span class="line"><span>        throw new TypeError(token.type);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 创建一个\`AST\`的根节点\`Program\`</span></span>
<span class="line"><span>    let ast = {</span></span>
<span class="line"><span>        type: &#39;Program&#39;,</span></span>
<span class="line"><span>        body: [],</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    // 接下来开启一个循环，来添加节点到\`ast.body\`数组里</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 这里使用循环是因为可能有多个并列的\`CallExpression\`</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    //   (add 2 2)</span></span>
<span class="line"><span>    //   (subtract 4 2)</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    while (current &lt; tokens.length) {</span></span>
<span class="line"><span>        ast.body.push(walk());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 最后返回ast即可</span></span>
<span class="line"><span>    return ast;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="遍历" tabindex="-1">遍历 <a class="header-anchor" href="#遍历" aria-label="Permalink to &quot;遍历&quot;">​</a></h2><p>到这里我们已经有<code>AST</code>了，我们想能通过访问器来访问不同类型的节点。我们需要能够在遇到匹配类型的节点时调用访问器上的方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>traverse(ast, {</span></span>
<span class="line"><span>     Program: {</span></span>
<span class="line"><span>       enter(node, parent) {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>       exit(node, parent) {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>     },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     CallExpression: {</span></span>
<span class="line"><span>       enter(node, parent) {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>       exit(node, parent) {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>     },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     NumberLiteral: {</span></span>
<span class="line"><span>       enter(node, parent) {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>       exit(node, parent) {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>     },</span></span>
<span class="line"><span>   });</span></span></code></pre></div><p>所以我们定义一个<code>traverser</code>函数，接收一个<code>AST</code>和一个访问器，内部还会再定义两个函数...</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function traverser(ast, visitor) {</span></span>
<span class="line"><span>    // \`traverseArray\`函数用来遍历数组，里面会调用下面定义的\`traverseNode\`函数</span></span>
<span class="line"><span>    function traverseArray(array, parent) {</span></span>
<span class="line"><span>        array.forEach(child =&gt; {</span></span>
<span class="line"><span>            traverseNode(child, parent);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // \`traverseNode\`接收一个\`node\`和它的父节点</span></span>
<span class="line"><span>    function traverseNode(node, parent) {</span></span>
<span class="line"><span>        //  首先确认匹配到的\`type\`是否在访问器里有对应方法</span></span>
<span class="line"><span>        let methods = visitor[node.type];</span></span>
<span class="line"><span>        // 如果存在\`enter\`方法，那么就调用它，传入当前节点和父节点</span></span>
<span class="line"><span>        if (methods &amp;&amp; methods.enter) {</span></span>
<span class="line"><span>            methods.enter(node, parent);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 接下来根据类型类型来分别处理</span></span>
<span class="line"><span>        switch (node.type) {</span></span>
<span class="line"><span>                // 从顶层节点\`Program\`开始，因为Program节点的属性\`body\`是数组类型，所以调用\`traverseArray\`方法来遍历</span></span>
<span class="line"><span>                // (记住\`traverseArray\`方法内部会依次调用\`traverseNode\`，所以会递归遍历树)</span></span>
<span class="line"><span>            case &#39;Program&#39;:</span></span>
<span class="line"><span>                traverseArray(node.body, node);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                // \`CallExpression\`类型也是一样的，只不过遍历的是它的\`params\`属性</span></span>
<span class="line"><span>            case &#39;CallExpression&#39;:</span></span>
<span class="line"><span>                traverseArray(node.params, node);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                // \`NumberLiteral\`和\`StringLiteral\`类型的节点没有子节点，所以直接跳过</span></span>
<span class="line"><span>            case &#39;NumberLiteral&#39;:</span></span>
<span class="line"><span>            case &#39;StringLiteral&#39;:</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                // 还是同样的，如果出现了我们无法识别的节点就抛错</span></span>
<span class="line"><span>            default:</span></span>
<span class="line"><span>                throw new TypeError(node.type);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 如果存在\`exit\`方法，在这里调用，传入\`node\`和它的\`parent\`</span></span>
<span class="line"><span>        if (methods &amp;&amp; methods.exit) {</span></span>
<span class="line"><span>            methods.exit(node, parent);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 最后我们调用\`traverseNode\`来开启遍历，传入ast，因为顶层节点没有\`parent\`，所以传null</span></span>
<span class="line"><span>    traverseNode(ast, null);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>译者注：这个方法其实就是树的深度优先遍历，然后在前序遍历的位置调用访问器的<code>enter</code>方法，在后序遍历位置调用访问器的<code>exit</code>方法。</p><h2 id="转换" tabindex="-1">转换 <a class="header-anchor" href="#转换" aria-label="Permalink to &quot;转换&quot;">​</a></h2><p>接下来，转换器（transformer），它会把我们构建的<code>AST</code>，再加上一个访问器<code>visitor</code>，一起传给<code>traverser</code>函数，然后返回一个新的<code>AST</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>----------------------------------------------------------------------------</span></span>
<span class="line"><span>   原 AST                           |   转换后的 AST</span></span>
<span class="line"><span>----------------------------------------------------------------------------</span></span>
<span class="line"><span>   {                                |   {</span></span>
<span class="line"><span>     type: &#39;Program&#39;,               |     type: &#39;Program&#39;,</span></span>
<span class="line"><span>     body: [{                       |     body: [{</span></span>
<span class="line"><span>       type: &#39;CallExpression&#39;,      |       type: &#39;ExpressionStatement&#39;,</span></span>
<span class="line"><span>       name: &#39;add&#39;,                 |       expression: {</span></span>
<span class="line"><span>       params: [{                   |         type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>         type: &#39;NumberLiteral&#39;,     |         callee: {</span></span>
<span class="line"><span>         value: &#39;2&#39;                 |           type: &#39;Identifier&#39;,</span></span>
<span class="line"><span>       }, {                         |           name: &#39;add&#39;</span></span>
<span class="line"><span>         type: &#39;CallExpression&#39;,    |         },</span></span>
<span class="line"><span>         name: &#39;subtract&#39;,          |         arguments: [{</span></span>
<span class="line"><span>         params: [{                 |           type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>           type: &#39;NumberLiteral&#39;,   |           value: &#39;2&#39;</span></span>
<span class="line"><span>           value: &#39;4&#39;               |         }, {</span></span>
<span class="line"><span>         }, {                       |           type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>           type: &#39;NumberLiteral&#39;,   |           callee: {</span></span>
<span class="line"><span>           value: &#39;2&#39;               |             type: &#39;Identifier&#39;,</span></span>
<span class="line"><span>         }]                         |             name: &#39;subtract&#39;</span></span>
<span class="line"><span>       }]                           |           },</span></span>
<span class="line"><span>     }]                             |           arguments: [{</span></span>
<span class="line"><span>   }                                |             type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>                                    |             value: &#39;4&#39;</span></span>
<span class="line"><span> ---------------------------------- |           }, {</span></span>
<span class="line"><span>                                    |             type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>                                    |             value: &#39;2&#39;</span></span>
<span class="line"><span>                                    |           }]</span></span>
<span class="line"><span>  (不好意思，右边的比较长)              |         }</span></span>
<span class="line"><span>                                    |       }</span></span>
<span class="line"><span>                                    |     }]</span></span>
<span class="line"><span>                                    |   }</span></span>
<span class="line"><span> ----------------------------------------------------------------------------</span></span></code></pre></div><p>所以我们的<code>transformer</code>函数会接受一个<code>lisp</code>的<code>AST</code>作为参数：</p><p>（译者注：要理解下面这个函数，还是先要搞清楚从旧的到新的都做了哪些转换，回到上面的对比，可以看到<code>CallExpression</code>节点的<code>type</code>没变，但是把<code>name</code>属性修改成了<code>callee</code>，另外参数列表由<code>params</code>变成了<code>arguments</code>，最后如果<code>CallExpression</code>节点的父节点不是<code>CallExpression</code>节点的话那么会创建一个<code>ExpressionStatement</code>节点来包裹，所以转换过程是这样的，我们首先创建一个新的<code>AST</code>根节点，但是我们遍历的是旧的<code>AST</code>，所以怎么能在新的<code>AST</code>上添加节点呢，可以通过在旧的<code>AST</code>节点上创建一个属性来引用新的<code>AST</code>上的列表属性，这样就可以在遍历旧的树时往新的树的列表里添加节点。）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function transformer(ast) {</span></span>
<span class="line"><span>    // 新AST，和之前的AST一样，也要有一个Program节点</span></span>
<span class="line"><span>    let newAst = {</span></span>
<span class="line"><span>        type: &#39;Program&#39;,</span></span>
<span class="line"><span>        body: [],</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 接下来我要做一个小改动，在父节点上添加一个\`context\`属性，然后会把每个节点都添加到它们父节点的\`context\`里，通常情况下你会有一个更好的抽象，但是为了我们的目的，这样做更简单</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    // 需要注意的是旧的AST里的context属性只是新AST属性的一个引用</span></span>
<span class="line"><span>    ast._context = newAst.body;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 接下来调用traverser方法，传入AST和一个访问器对象</span></span>
<span class="line"><span>    traverser(ast, {</span></span>
<span class="line"><span>        // 第一个访问者接收\`NumberLiteral\`类型的节点</span></span>
<span class="line"><span>        NumberLiteral: {</span></span>
<span class="line"><span>            // 进入时</span></span>
<span class="line"><span>            enter(node, parent) {</span></span>
<span class="line"><span>                // 创建一个新的\`NumberLiteral\`节点，添加到父节点的context里</span></span>
<span class="line"><span>                parent._context.push({</span></span>
<span class="line"><span>                    type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>                    value: node.value,</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 接下来是\`StringLiteral\`</span></span>
<span class="line"><span>        StringLiteral: {</span></span>
<span class="line"><span>            enter(node, parent) {</span></span>
<span class="line"><span>                parent._context.push({</span></span>
<span class="line"><span>                    type: &#39;StringLiteral&#39;,</span></span>
<span class="line"><span>                    value: node.value,</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 然后是\`CallExpression\`</span></span>
<span class="line"><span>        CallExpression: {</span></span>
<span class="line"><span>            enter(node, parent) {</span></span>
<span class="line"><span>                // 创建一个新节点\`CallExpression\`，里面嵌套一个\`Identifier\`节点</span></span>
<span class="line"><span>                let expression = {</span></span>
<span class="line"><span>                    type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>                    callee: {</span></span>
<span class="line"><span>                        type: &#39;Identifier&#39;,</span></span>
<span class="line"><span>                        name: node.name,</span></span>
<span class="line"><span>                    },</span></span>
<span class="line"><span>                    arguments: [],</span></span>
<span class="line"><span>                };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 接下来我们给原\`CallExpression\`节点定义一个新的context属性，引用我们刚才新创建的节点的arguments属性，这样在遍历旧节点的参数时就可以给新的节点添加参数了</span></span>
<span class="line"><span>                node._context = expression.arguments;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 接下来检查一下父节点是否是\`CallExpression\`节点</span></span>
<span class="line"><span>                // 如果不是的话...</span></span>
<span class="line"><span>                if (parent.type !== &#39;CallExpression&#39;) {</span></span>
<span class="line"><span>                    // 创建一点\`ExpressionStatement\`节点来包裹\`CallExpression\`节点，这样做是因为顶层的\`CallExpression\`在JavaScript里实际上是语句</span></span>
<span class="line"><span>                    expression = {</span></span>
<span class="line"><span>                        type: &#39;ExpressionStatement&#39;,</span></span>
<span class="line"><span>                        expression: expression,</span></span>
<span class="line"><span>                    };</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 最后，把(可能是被包裹的) \`CallExpression\`节点添加到父节点的\`context\`里</span></span>
<span class="line"><span>                parent._context.push(expression);</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 函数的最后返回新创建的AST</span></span>
<span class="line"><span>    return newAst;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="生成代码" tabindex="-1">生成代码 <a class="header-anchor" href="#生成代码" aria-label="Permalink to &quot;生成代码&quot;">​</a></h2><p>现在让我们来看最后一个阶段：生成代码。</p><p>我们的代码生成器会递归的调用自己，把树中的每个节点都打印到一个巨大的字符里。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function codeGenerator(node) {</span></span>
<span class="line"><span>    // 我们将按节点类型进行分别处理</span></span>
<span class="line"><span>    switch (node.type) {</span></span>
<span class="line"><span>            // 如果是\`Program\`节点，那就遍历它的\`body\`列表，对每个节点调用codeGenerator方法，然后把它们用换行符拼接起来</span></span>
<span class="line"><span>        case &#39;Program&#39;:</span></span>
<span class="line"><span>            return node.body.map(codeGenerator)</span></span>
<span class="line"><span>                .join(&#39;\\n&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 对于\`ExpressionStatement\`节点，对它的expression节点调用对每个节点调用codeGenerator方法方法，然后再添加一个分号...</span></span>
<span class="line"><span>        case &#39;ExpressionStatement&#39;:</span></span>
<span class="line"><span>            return (</span></span>
<span class="line"><span>                codeGenerator(node.expression) +</span></span>
<span class="line"><span>                &#39;;&#39; // &lt;&lt; (...在一个语句的末尾添加分号是符合标准的)</span></span>
<span class="line"><span>            );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 对于\`CallExpression\`节点，我们要打印的是\`callee\`，然后拼接一个左括号，然后遍历参数\`arguments\`的每个节点，调用codeGenerator方法把它们转成字符串，然后用逗号拼接起来，最后再添加一个右括号</span></span>
<span class="line"><span>        case &#39;CallExpression&#39;:</span></span>
<span class="line"><span>            return (</span></span>
<span class="line"><span>                codeGenerator(node.callee) +</span></span>
<span class="line"><span>                &#39;(&#39; +</span></span>
<span class="line"><span>                node.arguments.map(codeGenerator)</span></span>
<span class="line"><span>                .join(&#39;, &#39;) +</span></span>
<span class="line"><span>                &#39;)&#39;</span></span>
<span class="line"><span>            );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 对于\`Identifier\`节点，只要返回name属性的值即可</span></span>
<span class="line"><span>        case &#39;Identifier&#39;:</span></span>
<span class="line"><span>            return node.name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 对于\`NumberLiteral\`节点，返回它的value属性值</span></span>
<span class="line"><span>        case &#39;NumberLiteral&#39;:</span></span>
<span class="line"><span>            return node.value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 对于\`StringLiteral\`节点，需要使用双引号来包裹它的value值</span></span>
<span class="line"><span>        case &#39;StringLiteral&#39;:</span></span>
<span class="line"><span>            return &#39;&quot;&#39; + node.value + &#39;&quot;&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 如果遇到无法识别的节点，那么抛错</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            throw new TypeError(node.type);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="最终的编译器" tabindex="-1">最终的编译器~ <a class="header-anchor" href="#最终的编译器" aria-label="Permalink to &quot;最终的编译器~&quot;">​</a></h2><p>最后让我们来创建一个<code>compiler</code>函数，在这个函数里把上面的所有流程串起来：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. input  =&gt; tokenizer   =&gt; tokens</span></span>
<span class="line"><span>2. tokens =&gt; parser      =&gt; ast</span></span>
<span class="line"><span>3. ast    =&gt; transformer =&gt; newAst</span></span>
<span class="line"><span>4. newAst =&gt; generator   =&gt; output</span></span>
<span class="line"><span>function compiler(input) {</span></span>
<span class="line"><span>  let tokens = tokenizer(input);</span></span>
<span class="line"><span>  let ast    = parser(tokens);</span></span>
<span class="line"><span>  let newAst = transformer(ast);</span></span>
<span class="line"><span>  let output = codeGenerator(newAst);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 把代码生成结果返回就ok了</span></span>
<span class="line"><span>  return output;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="大功告成" tabindex="-1">大功告成 <a class="header-anchor" href="#大功告成" aria-label="Permalink to &quot;大功告成&quot;">​</a></h2><p>现在，让我们把上面所有的函数导出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    tokenizer,</span></span>
<span class="line"><span>    parser,</span></span>
<span class="line"><span>    traverser,</span></span>
<span class="line"><span>    transformer,</span></span>
<span class="line"><span>    codeGenerator,</span></span>
<span class="line"><span>    compiler,</span></span>
<span class="line"><span>};</span></span></code></pre></div><h2 id="作者-仓库" tabindex="-1">作者/仓库 <a class="header-anchor" href="#作者-仓库" aria-label="Permalink to &quot;作者/仓库&quot;">​</a></h2><p><a href="https://github.com/jamiebuilds/the-super-tiny-compiler" target="_blank" rel="noreferrer">jamiebuilds/the-super-tiny-compiler: ⛄ Possibly the smallest compiler ever (github.com)</a></p><p>作者是Babel的作者喔！</p>`,99),i=[l];function c(t,r,o,d,u,h){return a(),n("div",null,i)}const v=s(e,[["render",c]]);export{b as __pageData,v as default};
