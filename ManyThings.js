(function(window){
"use strict";
function library(){
var browser;
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
if(isChrome == true){
browser = "Chrome";
} else if(isFirefox == true){
browser = "Firefox";
} else if(isSafari == true){
browser = "Safari";
} else if(isEdge == true){
browser = "Microsoft Edge";
} else if(isIE == true){
browser = "Internet Explorer";
} else if(isOpera == true){
browser = "Opera";
}
function Dome(els){
for(var i = 0; i < els.length; i++){
this[i] = els[i];
}
this.length = els.length;
}
Dome.prototype.forEach = function(callback){
this.map(callback);
return this; 
};
Dome.prototype.map = function(callback){
var results = [];
for(var i = 0; i < this.length; i++){
results.push(callback.call(this, this[i], i));
}
return results; //.length > 1 ? results : results[0];
};
Dome.prototype.mapOne = function(callback){
var m = this.map(callback);
return m.length > 1 ? m : m[0];
};
Dome.prototype.text = function(text){
if(typeof text !== "undefined"){
return this.forEach(function(el){
el.innerText = text;
});
} else {
return this.mapOne(function(el){
return el.innerText;
});
}
};
Dome.prototype.html = function(html){
if(typeof html !== "undefined"){
return this.forEach(function(el){
el.innerHTML = html;
});
} else {
return this.mapOne(function(el){
return el.innerHTML;
});
}
};
Dome.prototype.show = function(){
return this.forEach(function(el){
el.style.display = "block";
});
};
Dome.prototype.hide = function(){
return this.forEach(function(el){
el.style.display = "none";
});
}
Dome.prototype.css = function(prop, val){
if(typeof prop !== 'undefined'){
return this.forEach(function(el){
el.style.setProperty(prop, val);
});
} else {
return this.mapOne(function(el){
return el.innerText;
});
}
};
Dome.prototype.attr = function(attr, val){
if(typeof val !== 'undefined'){
return this.forEach(function(el){
el.setAttribute(attr, val);
});
} else {
return this.mapOne(function(el){
return el.getAttribute(attr);
});
}
};
Dome.prototype.remove = function(){
if(browser === 'Internet Explorer'){
el.parentNode.removeChild(el);
} else {
return this.forEach(function(el){
el.remove(el);  
});
}
};
Dome.prototype.on = function(bindV, doFunctionBind, bindCapV){
if(bindV !== 'undefined'){
return this.forEach(function(el){
if(browser === 'Internet Explorer'){
el.attachEvent(bindV, doFunctionBind, bindCapV);
} else {
el.addEventListener(bindV, doFunctionBind, bindCapV);
}
});
}
};
Dome.prototype.off = function(unbindV, unFunctionBind, unbindCapV){
if(unbindV !== 'undefined'){
return this.forEach(function(el){
if(browser === 'Internet Explorer'){
el.dettachEvent(unbindV, unFunctionBind, unbindCapV);
} else {
el.removeEventListener(unbindV, unFunctionBind, unbindCapV);
}
});
}
};
Dome.prototype.id = function(idV){
if(idV !== 'undefined'){
return this.forEach(function(el){
el.id = idV;
});
} else {
return this.mapOne(function(el){
return el.id;
});
}
};
if(typeof Array.prototype.indexOf !== "function"){
Array.prototype.indexOf = function (item) {
for(var i = 0; i < this.length; i++){
if(this[i] === item){
return i;
}
}
return -1;
};
}
Dome.prototype.addClass = function(classes){
var className = "";
if(typeof classes !== "string"){
for(var i = 0; i < classes.length; i++){
className += " " + classes[i];
}
} else {
className = " " + classes;
}
return this.forEach(function(el){
el.className += className;
});
};
Dome.prototype.removeClass = function(clazz){
return this.forEach(function(el){
var cs = el.className.split(" "), i;
while((i = cs.indexOf(clazz)) > -1){ 
cs = cs.slice(0, i).concat(cs.slice(++i));
}
el.className = cs.join(" ");
}); 
};
var get = function (selector) {
var els;
if (typeof selector === 'string') {
els = document.querySelectorAll(selector);
} else if(selector.length){ 
els = selector;
} else {
els = [selector];
}
return new Dome(els);
};
return get;
}
if(typeof get === 'undefined'){
window.get = library();
}
})(window);
