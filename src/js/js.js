/* jshint esversion:6 */
var speed = 40;
function getText(path) {
	"use strict";
	var text = `null`;
	return new Promise(function (resolve) {
		setTimeout(function () {
			var request = null;
			if (window.XMLHttpRequest) {
				request = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				//		request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (request) {
				request.open("GET", path, true);
				request.onreadystatechange = function () {
					if (request.readyState === 4) {
						//				当status为200时，说明接受成功，
						//				当为304时，表示请求的资源没有被修改，可以直接使用浏览器中缓存的版本
						if (request.status === 200 || request.status === 0) {
							//					document.getElementById("vv").innerHTML = request.responseText;
							text = request.responseText;
							//					console.log("first"+text);
							//						return text;
						}
						//				console.log("secound"+text);
						//				setStyle(text);
						text = text.split("/**/");
						resolve(text);
					}
				};
				request.send(null);
			} else {
				alert("request error");
			}
		}, 10);
	});
}

var styleFull = ``;
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
//				console.log("style写完了");
				for(var x = 0; x <= i; x++) {
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

var textFull;
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

var textStyleFull;
function progressivelyShowResumeStyle() {
//	console.log(textStyleFull);
	var resume = document.getElementById("resume");
	resume.innerHTML = textStyleFull;
}

async function makeResume() {
	styleFull = await getText("css/css.css") || ``;
	await progressivelyShowStyle(0);
//	console.log("style执行完了");
	textFull = await getText("text.txt") || ``;
	textStyleFull = await getText("resumeEditor.html") || ``;
	await progressivelyShowResume();
//	console.log("resume执行完了");
	await progressivelyShowStyle(1);
	progressivelyShowResumeStyle();
	await progressivelyShowStyle(2);
}

makeResume();
