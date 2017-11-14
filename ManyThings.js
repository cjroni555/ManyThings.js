(function(window){
"use strict";
function library(){
function Dome(els){
for(var i = 0; i < els.length; i++ ){
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
Dome.prototype.css = function(cssV){
if(typeof cssV !== 'undefined'){
return this.forEach(function(el){
el.setAttribute("style", cssV);
});
} else {
return this.mapOne(function(el){
return el.getAttribute("style", cssV);
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
return this.forEach(function(el){
el.remove(el);  
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
