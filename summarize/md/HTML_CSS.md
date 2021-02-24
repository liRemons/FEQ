#### 关于盒模型的理解

怪异模式（IE）：`box-sizing:border-box;` 

标准模式（W3C）：`box-sizing:content-box;`

- content-box:不包括border, margin,  padding
- padding-box:width和height属性包括padding的大小，不包括border和margin
- border-box:width和height属性包括padding和border，不包括margin。

#### html语义化

用正确的标签做正确的事，利于理解，有利于SEO

<font size="2" face="arial">【**举例**】：header, nav, article, sections, footer, main, aside......</font>

#### 多行文本溢出

```css
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
/* 如果考虑兼容问题，使用伪元素添加省略号 */
```

#### 水平垂直居中

<font size="2" face="arial">【**注**】：box相对于body垂直居中</font>

```css
html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.box{
    width: 50px;
    height: 50px;
    background: red;
}
```

1. 定位

   ```css
   html,body{
       width: 100%;
       height: 100%;
       position: relative;
       overflow: hidden;
   }
   .box{
       /* box有固定宽高 */
       position: absolute;
       top: 50%;
       left: 50%;
       margin-top: -25px;
       margin-left: -25px;
   }
   .box{
    	/* box必须有宽高,但不用考虑宽高 */
       position: absolute;
       top:0;
       left:0;
       bottom:0;
       right:0;
       margin:auto
   }
   .box{
       /* 兼容问题 */
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
   }
   ```

2. flex

   ```css
   body{
       /* 兼容问题 */
       display: flex;
       justify-content: space-around;
       align-items: center;
   }
   ```

3. table-cell

   ```css
   body{
       /* 父级必须是固定宽高 */
       display: table-cell;
       vertical-align: middle;
       text-align: center;
       width:500px;
       height:500px;
   }
   .box{
       display:inline-block
   }
   ```

4.  JS获取元素进行处理

#### 圣杯布局、双飞翼布局

-   基于css3 计算属性
-   flex

#### display的属性

flex,  table,   gird（网格布局）

<font size="2" face="arial">【**flex的兼容**】</font>

<font size="2" face="arial">【**grid**】:grid-template-columns:定义每一列的列宽；grid-template-rows:每行的行高</font>

<font size="2" face="arial">【**display:none 与 visibility:hidden 的区别**】:两者都会看不见，前者宽高等信息会消失，后者会占据空间</font>

#### rem、em、px、vw、vh、百分比布局

em相对于父元素，rem相对于根元素。

 vw、vh相对于视口的宽高

<font size="2" face="arial">【**margin和padding设置百分比**】:margin 设置成百分比的时候，只跟父容器宽度有关</font>

amfe-flexible：移动端适配解决方案

#### align-items 和 align-content 的区别

都是用于定义flex容器中元素在交叉轴上的对齐方式

| 条件     | 属性（是否有效果） |                                           |               |
| -------- | ------------------ | ----------------------------------------- | :-----------: |
| 子项     | flex容器           | align-items                               | align-content |
| 单行     | 不指定高度         | 是                                        |      否       |
| 固定高度 | 是                 | 否（但是有设置flex-wrap:wrap;时，有效果） |               |
| 多行     | 不指定高度         | 是                                        |      否       |
| 固定高度 | 是                 | 是                                        |               |

#### 清除浮动

- 添加 clear:both;

- 父元素添加overflow:hidden

- 浮动元素添加类名（利用伪元素添加一个空元素）

  ```css
  .clearfix:after{
    content: ""; 
    display: block; 
    height: 0; 
    clear: both; 
    visibility: hidden;  
  }
  ```

#### BFC

块级格式化上下文

内部的box会在垂直方向一个接一个的放置，但相邻的box  margin会重叠

<font size="2" face="arial">【**注**】:可以包裹一层使其成为两个BFC</font>

是一个独立的容器，容器内的元素不会影响到外部的元素

计算BFC的高度时，浮动元素也参与计算（设置overflow:hidden，使其成为BFC，清除浮动）。

BFC的区域不会与float box重叠

- float的值不是none。
- position的值不是static或者relative。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex
- overflow的值不是visible

#### 伪元素（::）和伪类(:)

伪类：用于向某些选择器添加特殊的效果

伪元素：用于将特殊的效果添加到某些选择器

<font size="2" face="arial">【**区别**】:有没有生成新的元素</font>

#### HTML5新特性

- 多个语义化标签、WebSocket、Canvas、视频音频、表单新属性、SVG......

- [WebStorage](#浏览器存储)
- 表单新属性：time/email/tel/datetime/date/month/week.....

#### CSS3新特性

- box-shadow、border-radius、border-image、flex、gird、[盒模型](#关于盒模型的理解)
- transition : 通常和hover等事件配合使用，需要由事件来触发过渡，只能设置头尾
- animation :由@keyframes来描述每一帧的样式，自发的，立即播放，可设置循环次数
- transform :对元素进行旋转、缩放、移动或倾斜
- filter：滤镜

#### CSS Module

#### CSS深度作用器

- sass : >>>
- less : /deep/
- CSS Module:  :global(.className)

#### 浏览器存储

- localStorage：持久化存储，大小一般为几M（问题：如何设置过期时间）
- sessionStorage：临时存储，只存在于当前窗口
- cookie：一般用来存储用户信息，可以设置过期时间等，大小比较小，一般为几Kb或几十Kb



[个人网站持续更新](http://remons.gitee.io/)