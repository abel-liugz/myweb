<template><div><h2 id="html" tabindex="-1"><a class="header-anchor" href="#html" aria-hidden="true">#</a> HTML</h2>
<blockquote>
<p>负责搭建页面结构和内容</p>
</blockquote>
<h3 id="文本相关标签" tabindex="-1"><a class="header-anchor" href="#文本相关标签" aria-hidden="true">#</a> 文本相关标签</h3>
<ul>
<li>h1-h6 文本标题，特点：独占一行，自带上下间距，字体加粗</li>
<li>p 段落标签，特点：独占一行，自带上下间距</li>
<li>hr 水平分割线</li>
<li>br 换行</li>
<li>b 加粗</li>
<li>i 斜体</li>
<li>u 下划线</li>
<li>s 删除线</li>
</ul>
<h3 id="列表标签" tabindex="-1"><a class="header-anchor" href="#列表标签" aria-hidden="true">#</a> 列表标签</h3>
<ul>
<li>无序列表：ul和li组合</li>
<li>有序列表：ol和li组合</li>
<li>列表嵌套：有序列表和无序列表可以任意无限嵌套</li>
</ul>
<h3 id="图片标签-img" tabindex="-1"><a class="header-anchor" href="#图片标签-img" aria-hidden="true">#</a> 图片标签 img</h3>
<ul>
<li>src：资源路径
<ul>
<li>相对路径：访问站内资源
<ul>
<li>图片和页面在同级目录：直接写图片名</li>
<li>图片在页面的上级目录：../图片吗</li>
<li>图片在页面的下级目录：文件夹名/图片</li>
</ul>
</li>
<li>绝对路径：访问站外资源，图片盗链，有找不到图片的风险</li>
</ul>
</li>
<li>alt：图片不能正常显示时显示的文本</li>
<li>title：图片标题</li>
<li>width/height：设置宽高，只设置宽度时高度会自动等比例缩放
<ul>
<li>像素</li>
<li>上级元素百分比</li>
</ul>
</li>
</ul>
<h3 id="超链接-a" tabindex="-1"><a class="header-anchor" href="#超链接-a" aria-hidden="true">#</a> 超链接 a</h3>
<ul>
<li>href：资源路径，作用类似图片标签的src</li>
<li>a标签包裹文本为文本超链接，包裹图片为图片超链接</li>
<li>页面内部跳转，在目的地的元素里面添加 id=xxx，然后在超链接里面添加 href=&quot;#xxx&quot;</li>
</ul>
<h3 id="表格-table" tabindex="-1"><a class="header-anchor" href="#表格-table" aria-hidden="true">#</a> 表格 table</h3>
<ul>
<li>相关标签：
<ul>
<li>table</li>
<li>tr 表示行</li>
<li>td 表示列</li>
<li>th 表头</li>
<li>caption 标题</li>
</ul>
</li>
<li>相关属性：
<ul>
<li>border 边框</li>
<li>colspan 跨列</li>
<li>rowspan 跨行</li>
</ul>
</li>
</ul>
<h3 id="表单-form" tabindex="-1"><a class="header-anchor" href="#表单-form" aria-hidden="true">#</a> 表单 form</h3>
<ul>
<li>
<p>作用：获取用户输入的各种信息，并提交给服务器</p>
</li>
<li>
<p>form相关控件</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.baidu.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!--maxlength最大字符长度
		value设置默认值
		readonly只读--></span>
  用户名:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">maxlength</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>5<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>abc<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span><span class="token punctuation">></span></span>
  密码:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  
  <span class="token comment">&lt;!--value是单选框必须添加的属性 否则提交on    checked默认选中--></span>
  性别:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>gender<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>m<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>r1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>r1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>男<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>gender<span class="token punctuation">"</span></span> <span class="token attr-name">checked</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>w<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>女
  兴趣爱好:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hobby<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>抽烟
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hobby<span class="token punctuation">"</span></span> <span class="token attr-name">checked</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hj<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>喝酒
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hobby<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tt<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>烫头
  生日:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>date<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>birthday<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  靓照:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pic<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  所在地:
  <span class="token comment">&lt;!--value设置提交的内容    selected默认选中--></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bj<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>北京<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sh<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>上海<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>gz<span class="token punctuation">"</span></span> <span class="token attr-name">selected</span><span class="token punctuation">></span></span>广州<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>注册<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="分区标签" tabindex="-1"><a class="header-anchor" href="#分区标签" aria-hidden="true">#</a> 分区标签</h3>
<ul>
<li>作用：可以理解为时一个容器，将多个有相关性的标签进行统一管理</li>
<li>块级分区标签div：特点是独占一行</li>
<li>行内分区标签span：特点是共占一行</li>
<li>页面区域划分
<ul>
<li>至少分为三大区（头、体、脚），每个大的区域再划分n个小的区域</li>
</ul>
</li>
<li>HTML5的标准中新增了一些语义更强的分区标签，为了提高代码的可读性，这几个标签的作用和div一样都是块级分区标签
<ul>
<li>header</li>
<li>footer</li>
<li>main</li>
<li>section</li>
<li>nav</li>
</ul>
</li>
</ul>
<h2 id="css-层叠样式表" tabindex="-1"><a class="header-anchor" href="#css-层叠样式表" aria-hidden="true">#</a> CSS 层叠样式表</h2>
<blockquote>
<p>Cascading Style Sheet</p>
<p>作用：美化页面</p>
</blockquote>
<h3 id="css的三大特性" tabindex="-1"><a class="header-anchor" href="#css的三大特性" aria-hidden="true">#</a> CSS的三大特性</h3>
<ul>
<li>
<p>继承：元素可以继承上级元素文本和字体相关的样式，部分变迁自带的效果不受继承影响，比如超链接字体颜色</p>
</li>
<li>
<p>层叠：多个选择器可能选择到同一个元素，如果添加的样式不同则全部层叠有效，如果作用的样式相同，则由优先级决定哪个生效</p>
</li>
<li>
<p>优先级：指CSS中的选择器具有优先级，左右范围越小优先级越高</p>
<blockquote>
<p>!important&gt;id&gt;class&gt;标签名&gt;继承（属于间接选中）</p>
</blockquote>
</li>
</ul>
<h3 id="如何在html页面中添加css样式代码" tabindex="-1"><a class="header-anchor" href="#如何在html页面中添加css样式代码" aria-hidden="true">#</a> 如何在HTML页面中添加CSS样式代码</h3>
<ul>
<li>
<p>三种引入方式：</p>
<ul>
<li>内联样式：在标签的style属性中添加样式代码，弊端：不能复用</li>
<li>内部样式：在head标签里面添加一个style标签，在标签体内写样式代码，可以实现复用但是只能本页面复用</li>
<li>外部样式：在单独的css样式文件中写样式代码，在HTML页面中通过link标签引入，可以实现多页面复用，可以将HTML代码和CSS样式代码分离</li>
</ul>
</li>
</ul>
<h3 id="选择器" tabindex="-1"><a class="header-anchor" href="#选择器" aria-hidden="true">#</a> 选择器</h3>
<blockquote>
<p>作用：通过选择器找到页面中的元素之后在添加样式</p>
</blockquote>
<ul>
<li>
<p>标签名选择器：选取页面中所有同名标签</p>
<ul>
<li>格式：标签名{样式代码}</li>
</ul>
</li>
<li>
<p>id选择器：当需要选择页面中某一个元素时使用</p>
<ul>
<li>格式：#id{样式代码}</li>
</ul>
</li>
<li>
<p>类选择器：当需要选择多个不相关的元素时，给多个元素添加相同的class属性，然后通过类选择器进行选择</p>
<ul>
<li>格式：.class{样式代码}</li>
</ul>
</li>
<li>
<p>分组选择器：分组选择器可以将多个选择器合并成一个</p>
<ul>
<li>格式：h4,#id,.class{样式代码}</li>
</ul>
</li>
<li>
<p>属性选择器：通过元素的属性选择元素</p>
<ul>
<li>格式：标签名[属性名=&quot;属性值&quot;]{样式代码}</li>
</ul>
</li>
<li>
<p>任意元素选择器：选择页面中所用标签</p>
<ul>
<li>格式：*{样式代码}</li>
</ul>
</li>
<li>
<p>子孙后代选择器：通过元素之间的层级关系选择元素</p>
<ul>
<li>
<p>格式：body div  p{样式代码}</p>
<blockquote>
<p>匹配body里面的div里面的所有p标签（包括后代）</p>
</blockquote>
</li>
</ul>
</li>
<li>
<p>子元素选择器：通过元素之间的层级关系选择元素</p>
<ul>
<li>
<p>格式：body&gt;div&gt;p{元素代码}</p>
<blockquote>
<p>匹配body里面的div里面的p子元素（不包括后代）</p>
</blockquote>
</li>
</ul>
</li>
<li>
<p>伪类选择器：选择的是元素的状态</p>
<blockquote>
<p>元素的状态包括：未访问状态、访问过状态、悬停状态、点击状态</p>
</blockquote>
<ul>
<li>格式：a:link/visited/hover/active:{样式代码}</li>
</ul>
</li>
</ul>
<h3 id="颜色赋值" tabindex="-1"><a class="header-anchor" href="#颜色赋值" aria-hidden="true">#</a> 颜色赋值</h3>
<blockquote>
<p>三原色：红绿蓝（rgb），每个颜色的取值范围0-255</p>
</blockquote>
<ul>
<li>
<p>颜色赋值的方式</p>
<ul>
<li>
<p>颜色单词：常见颜色单词都可以使用</p>
</li>
<li>
<p>6位16进制赋值：#ff0000</p>
</li>
<li>
<p>3位16进制赋值：#f00</p>
</li>
<li>
<p>3位10进制赋值：rgb(255,0,0)</p>
</li>
<li>
<p>4位10进制赋值：rgba(255,0,0,0~1)</p>
<blockquote>
<p>a = alpha 代表透明度</p>
</blockquote>
</li>
</ul>
</li>
</ul>
<h3 id="背景图片" tabindex="-1"><a class="header-anchor" href="#背景图片" aria-hidden="true">#</a> 背景图片</h3>
<ul>
<li>background-image:url(&quot;路径&quot;) 设置背景图片</li>
<li>background-size:100px 200px 设置背景图片尺寸</li>
<li>background-repeat:no-repeat 禁止重复</li>
<li>background-position: 横向 纵向；设置背景图片的位置</li>
</ul>
<h3 id="文本和字体相关样式" tabindex="-1"><a class="header-anchor" href="#文本和字体相关样式" aria-hidden="true">#</a> 文本和字体相关样式</h3>
<ul>
<li>text-align:left/right/center 文本水平对齐方式</li>
<li>line-height:20px 设置行高，多行文本时可以控制行间距，单行文本时可以控制垂直居中（文本默认在当前所在行内居中）</li>
<li>text-decoration:overline上划线/underline下划线/line-through删除线/none去掉文本修饰</li>
<li>text-shadow:颜色 x偏移值 y偏移值 浓度; 设置阴影</li>
<li>font-size:20px  设置字体大小</li>
<li>font-weight:bold加粗/normal去掉加粗</li>
<li>font-style:italic; 设置斜体</li>
<li>font-family: xxx,xxx,xxx;  设置字体</li>
<li>font:20px xxx,xxx,xxx;  这只字体大小+字体</li>
</ul>
<h3 id="元素的显示方式display" tabindex="-1"><a class="header-anchor" href="#元素的显示方式display" aria-hidden="true">#</a> 元素的显示方式display</h3>
<ul>
<li>block：块级元素的默认值，特点：独占一行，可以修改宽高，包括：h1~h6,p,div</li>
<li>inline：行内元素的默认值，特点：共占一行，不可以修改宽高，包括：span,b,i,s,u,a</li>
<li>inline-block：行内块元素默认值，特点：共占一行，并且可以修改宽高，包括：img,input</li>
<li>none：隐藏元素</li>
</ul>
<blockquote>
<p>行内元素不能直接修改宽高，如必须修改则先将元素的显示方式改成block或inline-block</p>
</blockquote>
<h3 id="盒子模型" tabindex="-1"><a class="header-anchor" href="#盒子模型" aria-hidden="true">#</a> 盒子模型</h3>
<ul>
<li>盒子模型用来控制元素的显示效果，包括：
<ul>
<li>元素内容content：控制元素的显示尺寸</li>
<li>外边距margin：控制元素的显示位置</li>
<li>边框border：控制边框效果</li>
<li>内边距padding：控制元素内容的位置</li>
</ul>
</li>
</ul>
<h4 id="盒子模型之内容content" tabindex="-1"><a class="header-anchor" href="#盒子模型之内容content" aria-hidden="true">#</a> 盒子模型之内容content</h4>
<ul>
<li>包括：width和height</li>
<li>复制方式有两种：
<ul>
<li>像素</li>
<li>上级元素的百分比</li>
</ul>
</li>
<li>行内元素不能直接修改宽高</li>
</ul>
<h4 id="盒子模型之外边距margin" tabindex="-1"><a class="header-anchor" href="#盒子模型之外边距margin" aria-hidden="true">#</a> 盒子模型之外边距margin</h4>
<ul>
<li>作用：控制元素的显示位置</li>
<li>赋值方式：
<ul>
<li>margin-left/right/top/bottom:10px；单独某个方向赋值</li>
<li>margin:10px；四个方向复制</li>
<li>margin:10px 20px；上下10，左右20</li>
<li>margin:10px 20px 30px 40px；上右下左，顺时针赋值</li>
</ul>
</li>
<li>行内元素上下外边距无效</li>
<li>上下相邻彼此添加外边距，取最大值</li>
<li>左右相邻彼此添加外边距，两者相加</li>
<li>粘连问题：当元素的上边缘和上级元素的上边缘重叠时，给元素添加上外边距会出现粘连问题，给上级元素添加overflow:hidden解决</li>
</ul>
<h4 id="盒子模型之边框border" tabindex="-1"><a class="header-anchor" href="#盒子模型之边框border" aria-hidden="true">#</a> 盒子模型之边框border</h4>
<ul>
<li>赋值方式：
<ul>
<li>border:1px solid red；给四个方向添加边框</li>
<li>border-left/right/top/bottom:1px solid red；单独给某个方向添加边框</li>
</ul>
</li>
<li>border-radius:10px；值越大越圆，当值超过宽高的一半时为正圆（前提是正方形）</li>
</ul>
<h4 id="盒子模型之内边距padding" tabindex="-1"><a class="header-anchor" href="#盒子模型之内边距padding" aria-hidden="true">#</a> 盒子模型之内边距padding</h4>
<ul>
<li>作用：控制元素内容的位置</li>
<li>赋值方式：和外边距类似
<ul>
<li>padding-left/right/top/bottom:10px；单独某个方向赋值</li>
<li>padding:10px；四个方向赋值</li>
<li>padding:10px 20px；上下10，左右20</li>
<li>padding:10px 20px 30px 40px；上右下左，顺时针赋值</li>
</ul>
</li>
<li>给元素添加内边距会影响元素的显示宽高</li>
</ul>
<h3 id="元素的定位方式" tabindex="-1"><a class="header-anchor" href="#元素的定位方式" aria-hidden="true">#</a> 元素的定位方式</h3>
<ul>
<li>
<p>五种定位方式：</p>
<ul>
<li>
<p>静态定位（文档流定位）</p>
<ul>
<li>格式：position:static;（默认的定位方式）</li>
<li>特点：元素以做上为基准，块级元素从上往下排列，行内元素从左向右排列，默认情况下无法实现元素的层叠效果</li>
<li>通过外边距控制元素的位置</li>
</ul>
</li>
<li>
<p>相对定位</p>
<ul>
<li>格式：position:relative;</li>
<li>特点：元素不脱离文档流（仍然占着原来的位置），可以实现元素的层叠效果</li>
<li>通过left/right/top/bottom控制元素的显示位置，参考物是初始位置</li>
<li>应用场景：当希望移动某个元素其他元素不受影响时使用相对定位，相对定位可以实现元素的层叠</li>
</ul>
</li>
<li>
<p>绝对定位：</p>
<ul>
<li>
<p>格式：position:absolute;</p>
</li>
<li>
<p>特点：元素脱离文档流（不占原来的位置），可以实现元素层叠</p>
</li>
<li>
<p>通过left/right/top/bottom控制位置，参考物为窗口（默认）或某一个上级元素</p>
<blockquote>
<p>需要在上级元素中添加position:relative作为参考物</p>
</blockquote>
</li>
<li>
<p>应用场景：当需要往页面中添加一个元素并且不影响其他元素的显示位置，并且可以实现层叠效果</p>
</li>
</ul>
</li>
<li>
<p>固定定位：</p>
<ul>
<li>格式：position:fixed;</li>
<li>特点：脱离文档流</li>
<li>通过left/right/top/bottom相对于窗口做偏移</li>
<li>应用场景：当需要将元素固定在窗口的某个位置时使用</li>
</ul>
</li>
<li>
<p>浮动定位：</p>
<ul>
<li>格式：float:left/right</li>
<li>特点：脱离文档流，元素从当前所在行向左或向右浮动，当撞到上级元素边缘或者其他浮动元素时停止</li>
<li>浮动元素一行装不下时会自动折行，折行时有可能会被卡住</li>
<li>当元素的所有子元素全部浮动时，自动识别的高度会为0，后面元素会顶上来导致显示异常，通过给元素添加overflow:hidden可以解决此问题</li>
<li>应用场景：当需要将纵向排列的元素改为横向排列时使用</li>
</ul>
</li>
</ul>
</li>
<li>
<p>溢出设置overflow</p>
<ul>
<li>visible超出部分显示（默认）</li>
<li>hidden超出部分隐藏</li>
<li>scroll超出部分滚动显示</li>
</ul>
</li>
<li>
<p>行内元素垂直对齐方式vertical-align</p>
<ul>
<li>top上对齐</li>
<li>middle中间对齐</li>
<li>bottom下对齐</li>
<li>baseline基线对齐（默认）</li>
</ul>
</li>
<li>
<p>元素的显示层级z-index</p>
<blockquote>
<p>当两个元素非静态定位时可能存在层叠的问题，通过z-index样式显示层级，值越大显示越靠前</p>
</blockquote>
</li>
</ul>
<h2 id="javascript" tabindex="-1"><a class="header-anchor" href="#javascript" aria-hidden="true">#</a> JavaScript</h2>
<ul>
<li>作用：负责给页面添加动态鲜果</li>
<li>语言特点：
<ul>
<li>属于脚本语言（不需要编译直接由浏览器解析执行）</li>
<li>基于面向对象</li>
<li>属于弱类型语言</li>
<li>安全性强：JS语言只能访问浏览器内部的数据，浏览器以外电脑上的数据禁止访问</li>
<li>交互性强：因为JS语言是嵌入到HTML页面中最终执行在客户端的语言，可以和用户直接进行交互，而像Java语言是运行在服务器的语言和用户交互需要借助于网络，所以交互性JS语言会更强一些</li>
</ul>
</li>
</ul>
<h3 id="如何在html页面中添加js语言" tabindex="-1"><a class="header-anchor" href="#如何在html页面中添加js语言" aria-hidden="true">#</a> 如何在HTML页面中添加JS语言</h3>
<ul>
<li>三种引入方式：
<ul>
<li>内联：在标签的事件属性中添加JS代码，当事件触发时执行
<ul>
<li>事件：是系统提供的一系列时间点</li>
<li>点击事件：当点击元素时触发的事件点</li>
</ul>
</li>
<li>内部：在HTML页面中的任意位置（推荐写在body上面）添加script标签，标签体内写JS代码</li>
<li>外部：在单独的JS文件中写JS代码，然后在HTML页面中通过script标签的src属性引入到HTML页面</li>
</ul>
</li>
</ul>
<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<ul>
<li>JS属于弱类型语言</li>
<li>let和var关键字的区别：作用域有区别</li>
<li>使用let声明的变量，作用域和Java语言的作用域类似</li>
<li>使用var声明的变量，不管在什么位置声明，都相当于一个全局变量</li>
</ul>
<h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3>
<ul>
<li>JavaScript中只有对象类型</li>
<li>常见的对象类型包括：
<ul>
<li>字符串：string；可以用单引号或双引号修饰</li>
<li>数值：number；相当于Java中所有数值类型的总和</li>
<li>布尔值：boolean；true和false</li>
<li>未定义：undefined；当变量只声明不赋值时属于未定义</li>
</ul>
</li>
<li>获取变量类型的方法：typeof变量；</li>
</ul>
<h3 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h3>
<ul>
<li>算术运算符：+ , - , * , / , % ，JS 中的除法会根据结果自动转换整数或小数</li>
<li>关系运算符：&gt; , &lt; , &gt;= , &lt;= , != , == 和 ===
<ul>
<li>==：先统一两个变量的类型，再比较值</li>
<li>===：先比较类型，类型相同后再比较值</li>
</ul>
</li>
<li>逻辑运算符：&amp;&amp; , || ,  !</li>
<li>赋值运算符：= , += , -= , *= , /= , %= , ++ , --</li>
<li>三目运算符：条件 ? 值1 : 值2</li>
</ul>
<h3 id="各种语句" tabindex="-1"><a class="header-anchor" href="#各种语句" aria-hidden="true">#</a> 各种语句</h3>
<ul>
<li>if...else</li>
<li>for</li>
<li>while</li>
<li>do...while</li>
<li>switch...case</li>
</ul>
<h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h3>
<ul>
<li>常见的四种方法：
<ul>
<li>无参无返回值</li>
<li>有参无返回值</li>
<li>无参有返回值</li>
<li>有参有返回值</li>
</ul>
</li>
<li>三种声明方法的格式：
<ul>
<li>function 方法名(参数列表){方法体}</li>
<li>let 方法名 = function(参数列表){方法体}</li>
<li>let 方法名 = new Function(&quot;参数1&quot;,&quot;参数2&quot;,&quot;方法体&quot;);</li>
</ul>
</li>
</ul>
<h4 id="nan" tabindex="-1"><a class="header-anchor" href="#nan" aria-hidden="true">#</a> NaN</h4>
<ul>
<li>Not a Number：不是一个数</li>
<li>isNaN(x)    判断变量是否是NaN</li>
</ul>
<h3 id="javascript对象分类" tabindex="-1"><a class="header-anchor" href="#javascript对象分类" aria-hidden="true">#</a> JavaScript对象分类</h3>
<ul>
<li>
<p>内置对象：包括string，number，boolean等</p>
</li>
<li>
<p>BOM浏览器对象模型</p>
<blockquote>
<p>Browser Object Model，浏览器对象模型，包括和浏览器相关的内容</p>
</blockquote>
<ul>
<li>window：此对象里面的属性和方法称为全局的属性和方法，访问时可以省略掉window</li>
<li>window中常见的方法
<ul>
<li>alert(&quot;xxx&quot;)弹出提示框</li>
<li>confirm(&quot;xxx&quot;)弹出确认框</li>
<li>prompt(&quot;xxx&quot;)弹出文本框</li>
<li>isNaN(x)判断变量是否是NaN</li>
<li>parseInt()和parseFloat()把字符串转成整数或小数</li>
<li>console.log()控制台输出</li>
<li>let timer = setInterval(方法,时间间隔)开启定时器</li>
<li>clearInterval(timer)停止定时器</li>
<li>setTimeout(方法,时间间隔)开启只执行一次的定时器</li>
</ul>
</li>
<li>window对象中常见的属性
<ul>
<li>location位置
<ul>
<li>location.href 获取和修改浏览器的请求地址</li>
<li>location.reload() 刷新页面</li>
</ul>
</li>
<li>history历史
<ul>
<li>history.length 获取历史页面数量</li>
<li>history.back() 返回上一页面</li>
<li>history.forward() 前往下一页面</li>
<li>history.go(n)
<ul>
<li>n=1：前往下一页面</li>
<li>n=-1：返回上一页面</li>
<li>n=0：刷新</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>DOM文档对象模型</p>
<blockquote>
<p>Document Object Model，文档对象模型，包括和页面标签相关的内容</p>
</blockquote>
<ul>
<li>通过选择器获取页面中的元素对象
<ul>
<li>let 元素对象 = document.querySelector(&quot;选择器&quot;)</li>
</ul>
</li>
<li>获取和修改元素的文本内容
<ul>
<li>元素对象.innerText = &quot;XXX&quot;;	修改文本内容</li>
<li>元素对象.innerText    获取文本内容</li>
</ul>
</li>
<li>获取和修改input控件的值
<ul>
<li>控件对象.value = &quot;XXX&quot;;	修改</li>
<li>控件对象.value    获取</li>
</ul>
</li>
<li>创建元素对象
<ul>
<li>let 元素对象 = document.createElement(&quot;标签名&quot;)；</li>
</ul>
</li>
<li>添加元素对象到某个元素里面
<ul>
<li>document.body.appendChild(元素对象)；</li>
<li>父元素.appendChild(元素对象);</li>
<li>父元素.append(元素对象,元素对象,元素对象);</li>
</ul>
</li>
</ul>
</li>
<li>
<p>前端MVC设计模式</p>
<blockquote>
<p>MVC设计模式，其实就是将前端实现某个业务的所有代码划分为三部分</p>
</blockquote>
<ul>
<li>Model：模型，指数据模型，这个数据一般来自于服务器</li>
<li>View：视图，指页面标签内容</li>
<li>Controller：控制器，指将数据展示到视图中的过程代码</li>
<li>前端MVC设计模式弊端：需要在Controller控制器部分频繁的进行DOM（遍历查找元素的到吗）操作，会影响执行效率</li>
</ul>
</li>
<li>
<p>MVVM设计模式</p>
<ul>
<li>Model：模型，指数据模型，这个数据一般来自于服务器</li>
<li>View：视图，指页面标签内容</li>
<li>ViewModel：视图模型，将页面中可能发生改变的元素和某个变量在内存中进行绑定，当变量的值发生改变时会从内存中直接找到对应的元素让其改变</li>
</ul>
</li>
</ul>
<h1 id="vue-cli" tabindex="-1"><a class="header-anchor" href="#vue-cli" aria-hidden="true">#</a> Vue CLI</h1>
<h3 id="关于vue" tabindex="-1"><a class="header-anchor" href="#关于vue" aria-hidden="true">#</a> 关于VUE</h3>
<ul>
<li>
<p>传统的前端开发框架大多是基于DOM（Document Object Model：文档对象模型）的，在操作时，需要关心被操作的页面元素，甚至这些页面元素的层级结构，核心思想是：先根据DOM找到对应的页面元素，然后再进行相关操作，例如设计其样式，或配置某个时间</p>
</li>
<li>
<p>Vue则是将必要的页面元素的相关属性（例如页面元素的样式、控件的值、页面元素的事件等）与数据进行绑定，当实现绑定后，就不再需要关心页面元素本身了，只需要关心各个数据即可，从而避免了大量繁琐的DOM操作，也实现了页面设计与数据处理的分离</p>
</li>
<li>
<p>Vue  CLI通常称为“VUE脚手架”，它是一个专门为单页面应用快速搭建 繁杂的脚手架，它可以轻</p>
<p>松的创建新的应用程序而且可用于自动生成vue 和webpack的工程模板</p>
</li>
</ul>
<h3 id="工程结构" tabindex="-1"><a class="header-anchor" href="#工程结构" aria-hidden="true">#</a> 工程结构</h3>
<ul>
<li>
<p>[.idea]：使用IntelliJ IDEA打开工程时会产生此文件夹，其中的文件都是IDEA管理此工程时使用到的，不手动管理，及时删除此文件夹，IDEA也会按需自动创建此文件夹及其下必要的文件</p>
</li>
<li>
<p>[node_modules]：工程中使用到的模块，也可以理解为工程的依赖项，例如Babel、Vue等框架的文件，不手动管理</p>
<blockquote>
<p>需要注意：如果是从Git或者其他位置复制得到的工程，可能没有此文件夹，需要运行npm install，否则将无此文件夹及其下的各依赖项，工程将无法正常启动</p>
</blockquote>
</li>
<li>
<p>[public]：工程被编译打包后仍会保留的内容（文件内容可能会在编译打包过程中修改）</p>
<blockquote>
<p>可以在此文件夹下创建子级文件夹，用于存放静态资源</p>
</blockquote>
</li>
<li>
<p>public/index.html：默认的主页，通常不修改内容</p>
</li>
<li>
<p>[src]：页面源代码，除工程配置外的所有开发都在此文件夹下</p>
</li>
<li>
<p>[src/assets]：资源文件夹，通常存放图片</p>
<blockquote>
<p>注意：仅不需要被程序动态控制的图片放在此处</p>
</blockquote>
</li>
<li>
<p>[src/components]：视图组件，通常是可以被其它页面复用的，是各个.vue文件</p>
</li>
<li>
<p>[src/router]：路由控制</p>
</li>
<li>
<p>src/router/index.js：路由配置文件，除非工程中页面数量较大，或路由关系复杂，否则使用1个文件进行路由管理即可</p>
</li>
<li>
<p>[src/store]：全局共享的内存中的数据</p>
</li>
<li>
<p>[src/views]：视图组件，通常每个页面在此文件夹都应该有一个对应的文件，可引用[src/components]下的组件</p>
</li>
<li>
<p>src/App.vue：默认的主页视图组件</p>
</li>
<li>
<p>src/main.js：工程的主js文件，通常用于导入工程中奖使用的其他库</p>
<blockquote>
<p>此文件中所有import语句必须在最上方文职，各import语句不区分先后顺序</p>
</blockquote>
</li>
<li>
<p>.gitigore：用于配置使用Git提交工程时将忽略的文件和文件夹</p>
</li>
<li>
<p>bable.config.js：Babel的配置文件</p>
</li>
<li>
<p>package.json：工程的管理配置文件，相当于Maven项目的pom.xml</p>
<blockquote>
<ul>
<li>scripts：支持的2个npm命令参数，例如npm run serve、npm run build</li>
<li>dependencies：运行时依赖项</li>
<li>devDependencies：开发依赖项，将不参与打包</li>
</ul>
</blockquote>
</li>
<li>
<p>package-lock.json：工程的管理配置文件</p>
</li>
<li>
<p>README.md：工程的说明文档，用于开发人员编写如何使用、注意事项、更新日志等内容</p>
</li>
<li>
<p>vue.config.js：Vue的配置文件</p>
</li>
</ul>
</div></template>
