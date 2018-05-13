/* jshint esversion:6 */
var speed = 40;

//function getText2(path) {
//	"use strict";
//	var text = `null`;
//	return new Promise(function (resolve) {
//		setTimeout(function () {
//			var request = null;
//			if (window.XMLHttpRequest) {
//				request = new XMLHttpRequest();
//			} else if (window.ActiveXObject) {
//				//		request = new ActiveXObject("Microsoft.XMLHTTP");
//			}
//			if (request) {
//				request.open("GET", path, true);
//				request.onreadystatechange = function () {
//					if (request.readyState === 4) {
//						//				当status为200时，说明接受成功，
//						//				当为304时，表示请求的资源没有被修改，可以直接使用浏览器中缓存的版本
//						if (request.status === 200 || request.status === 0) {
//							//					document.getElementById("vv").innerHTML = request.responseText;
//							text = request.responseText;
//							//					console.log("first"+text);
//							//						return text;
//						}
//						//				console.log("secound"+text);
//						//				setStyle(text);
//						text = text.split("/**/");
//						resolve(text);
//					}
//				};
//				request.send(null);
//			} else {
//				alert("request error");
//			}
//		}, 10);
//	});
//}

//function getText(evt) {
//	var text = ``;
//	var files = evt.target.files; // FileList object
//	for (var i = 0, f; f = files[i]; i++) {
//		var reader = new FileReader();
//		reader.onload = (function (theFile) {
//			return function (e) {
//				text = e.target.result;
//			};
//		})(f);
//		reader.readAsText(f);
//	}
//	console.log("火狐"+text);
//	return text;
//}

var styleFull = `/* CSS Document */
/* 
* Inspired by http://strml.net/
* 大家好，我是刘金发
* 最近发现了一些有趣的东西，
* 想要做一份特别的简历 
*/

/* 首先给所有元素加上过渡效果 */
* {
	transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
	color: rgb(222,222,222);
	background: rgb(0,43,54);
}
/* 文字离边框太近了 */
.styleEditor {
	padding: .5em;
	border: 1px solid;
	margin: .5em;
	overflow: auto;
	width: 45vw;
	height: 90vh;
}
/* 代码高亮 */
.token.selector {
	color: rgb(133,153,0);
}
.token.property {
	color: rgb(187,137,0);
}
.token.punctuation {
	color: yellow;
}
.token.function {
	color: rgb(42,161,152);
}
/* 加点 3D 效果呗 */
html {
	perspective: 1000px;
}
.styleEditor {
	position: fixed;
	left: 0;
	top: 0;
	-webkit-transition: none;
	transition: none;
	-webkit-transform: 
		rotateY(10deg) translateZ(-100px);
	transform: 
		rotateY(10deg) translateZ(-100px);
}
/* 接下来我给自己准备另一个编辑器 */
.resumeEditor {
	position: fixed;
	right: 0;
	top: 0;
	padding: .5em;
	margin: .5em;
	width: 48vw;
	/*	min-width: 18vw;*/
/*	height: 90vh;*/
	min-height: 10vh;
	border: 1px solid;
	background: white;
	color: #222;
	overflow: auto;
}
/* 好了，我开始写简历了 */


/**/
/* 这个简历好像差点什么
 * 对了，这是 文本 格式的，
 * 我需要变成对 HR 更友好的格式
 * 简单，给它加些标签替换成 HTML 就行了
 */


/**/
/* 再对 HTML 加点样式 */
/*感觉编辑器高度太低了，加高点吧*/
/*对编辑框进行调整*/
.resumeEditor {
	height: 90vh;
	padding: 1em;
}
/*给标题增加样式*/
.resumeEditor h2 {
	display: inline;
	border-bottom: 1px solid;
/*		margin: 1em 0 .5em;*/
}
/*把详情中的默认样式设为空*/
.resumeEditor ul, .resumeEditor ol {
	list-style: none;
}
/*在部分详情的最前面添加自定义样式*/
.resumeEditor ul>li:before {
	content: '•';
	margin-right: .5em;
}
/*给剩下部分的详情添加自定义样式*/
.resumeEditor ol {
	counter-reset: section;
}
.resumeEditor ol li:before {
	counter-increment: section;
	content: counters(section, ".");
	margin-right: .5em;
}
.resumeEditor blockquote:before {
	content: '> '
}
/*把最后那句引用加个好看点的背景吧*/
.resumeEditor blockquote {
	margin: 1em;
	padding: .5em;
	background: #ddd;
}
/*最后，对整体进行最后的优化*/
html {
	min-height: 100vh;
}
* {
	box-sizing: border-box;
}

`;
styleFull = styleFull.split("/**/");
var styleEditor = ``;

function progressivelyShowStyle(i) { //show右边窗口不包含resume的css的第i部分
	"use strict";
	var n = 0;
	var styleCurrent = ``;
	var style = document.getElementById("style");
	var css = document.getElementById("css");

	return new Promise(function (resolve, reject) {
		var interval1 = setInterval(function () {
			if (styleCurrent.length >= styleFull[i].length) {
//								console.log("style写完了");
				for (var x = 0; x <= i; x++) {
					styleEditor += styleFull[x];
				}
				clearInterval(interval1);
				resolve();
			}
			styleCurrent = styleFull[i].substr(0, n);
			style.innerHTML = styleEditor + styleCurrent;
			if (styleCurrent.charAt(styleCurrent.length - 1) === ';') {
				css.innerHTML = styleEditor + styleCurrent;
			}
			style.scrollTop = style.scrollHeight;
			//			style.scrollLeft = style.scrollWidth;
			n += 1;
		}, speed);
	});
}

var textFull = `
刘金发<br>
----<br>
有着良好的Java基础，会js/html/css的web技术，热爱互联网技术。<br>
目标是成为JavaWeb全栈开发工程师！<br>
<br>
技能<br>
----<br>
* 前端开发<br>
* Node.js开发<br>
* Java后端开发<br>
* python脚本开发<br>
<br>
教育背景<br>
----<br>
1. 高中 南雄市第一中学<br>
2. 大学 韶关学院 计算机应用技术<br>
<br>
链接<br>
----<br>
* [Github](https://github.com/183461750/animatingResume)<br>
* [我的微信](myweixin.html)<br>
* [返回菜单](../start.html)<br>
<br>
如果你喜欢这个效果，点击[动态简历](resume.html)，来查看吧！<br>
`;
textFull = textFull.split("/**/");

function progressivelyShowResume() {
	"use strict";
	var n = 0;
	var textCurrent = ``;
	var resume = document.getElementById("resume");

	return new Promise(function (resolve, reject) {
		var interval2 = setInterval(function () {
			if (textCurrent.length >= textFull[0].length) {
				//				console.log("resume写完了");
				clearInterval(interval2);
				resolve();
			}
			textCurrent = textFull[0].substr(0, n);
			resume.innerHTML = textCurrent;
			resume.scrollTop = resume.scrollHeight;
			n += 1;
		}, speed);
	});

}

var textStyleFull = `
<h2>刘金发</h2>
<ul>
<li>有着良好的Java基础，会js/html/css的web技术，热爱互联网技术。</li>
<li>目标是成为JavaWeb全栈开发工程师！</li>
</ul>
<h2>技能</h2>
<ul>
<li>前端开发</li>
<li>Node.js开发</li>
<li>Java后端开发</li>
<li>python脚本开发</li>
</ul>
<h2>教育背景</h2>
<ol>
<li>高中 南雄市第一中学</li>
<li>大学 韶关学院 计算机应用技术</li>
</ol>
<h2>链接</h2>
<ul>
<li><a href="https://github.com/183461750/animatingResume">[Github]</a></li>
<li><a href="myweixin.html">[我的微信]</a></li>
<li><a href="../start.html">[返回菜单]</a></li>
</ul>
<blockquote>
如果你喜欢这个效果，点击<a href="resume.html">[动态简历]</a>，来查看吧！
</blockquote>
`;

function progressivelyShowResumeStyle() {
	//	console.log(textStyleFull);
	var resume = document.getElementById("resume");
	resume.innerHTML = textStyleFull;
}

async function makeResume() {
//	replaceText();
//	styleFull = await getText("css/css.xml") || ``;
	await progressivelyShowStyle(0);
	//	console.log("style执行完了");
//	textFull = await getText("text.xml") || ``;
//	textStyleFull = await getText("resumeEditor.html") || ``;
	await progressivelyShowResume();
	//	console.log("resume执行完了");
	await progressivelyShowStyle(1);
	progressivelyShowResumeStyle();
	await progressivelyShowStyle(2);
}

makeResume();
