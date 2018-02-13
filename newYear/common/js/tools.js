/*2017-09-19 更新实例方法的返回值,能返回对象的情况下,一律返回对象,方便链式操作,有一些方法没有实现多对象操作(暂时不需要,以后需要再加上)*/
;(function() {
	var events = {
		index: 0
	};
	var jx = function(str, all) {
		var ele;
		if(typeof(str) !== "string" && (str === window || str === document || str.nodeType ===1 || Array.isArray(str))) {
			if(Array.isArray(str)&&str.length === 0){
				ele = '';
			}else{
				ele = str;
			}
			
		}else{
			if(str.trim() === "") {
				ele = '';
			}else{
				if(typeof(str) === "string") {
					var fristStr = str.trim().substr(0, 1);
		
					if(fristStr === "#") {
						ele = document.getElementById(str.replace(/#/, ""));
					} else {
						if(all === true) {
							ele = document.querySelectorAll(str);
						} else {
							ele = document.querySelector(str);
						}
					}
				}
			}
			
		}
		
		
		
		if(all&&ele.length === 0 || !ele){
			return [].push.apply(this)
		}else{
			return [].push.apply(this,ele.length?ele:[ele])
		}
		/*return [].push.apply(this,ele.length?ele:[ele])*/
		/*return [].push.apply(this)*/
		
		
	}
	var $ = function(str, all) {
		return new jx(str, all)
	}
	window.$ = $;
	jx.prototype.constructor = jx;
	jx.prototype.on = function(type, fn, str) { //一个简单的事件监听实现
		var that = this;
		//如果该对象为空或者没有回调函数，直接返回
		if(!that || typeof(fn) !== "function") {

			return false;
		}
		if(that.length === 0 && that != that.window) {
			return false;
		}
		/*CommissionedArr = str&&document.querySelectorAll(str).length*/

		var entrust = function(event) {
			var ev = event || window.event;
			var firstStr = str.trim().substr(0, 1);
			var that = this;
			/*var path = ev.path || (ev.composedPath && ev.composedPath());*/
			var path = [];

			if(ev.path) {
				path = ev.path;
			} else {
				var nodes = ev.target;
				while(nodes !== window) {
					if(nodes === null) {
						path.push(window);
						nodes = window
					} else {
						path.push(nodes)
						nodes = nodes.parentNode
					}

				}
			}
			/*alert(path.length)*/
			if(firstStr === "." || firstStr === "#") {
				/*if(firstStr === "."){
					if(ev.target.classList.contains(str.replace(".",""))){
						fn.call(ev.target);
						return false;
					}
				}
				if(firstStr === "#"){
					if(ev.target.id === str.replace("#","")){
						fn.call(ev.target);
						return false;
					}
				}*/

				/*if(ev.path){*/
				if(firstStr === ".") {
					for(var i = 0, j = path.length; i < j; i += 1) { //由于forEach不能break或者return跳出，改用for
						if(path[i] === that) {
							return false;
						}

						if(path[i].classList.contains(str.replace(".", ""))) {
							fn.call(path[i], ev);
							return false;
						}
					}
				}
				if(firstStr === "#") {
					for(var i = 0, j = path.length; i < j; i += 1) { //由于forEach不能break或者return跳出，改用for
						if(path[i] === that) {
							return false;
						}

						if(path[i].id === str.replace("#", "")) {
							fn.call(path[i], ev);
							return false;
						}
					}
				}
				return false;
				/*	}*/
			} else {
				/*if(ev.target.tagName === str.toLocaleUpperCase()){
					fn.call(ev.target);
					return false;
				}*/
				/*if(ev.path){*/
				for(var i = 0, j = path.length; i < j; i += 1) { //由于forEach不能break或者return跳出，改用for
					if(path[i] === that) {
						return false;
					}

					if(path[i].tagName === str.toLocaleUpperCase()) {
						fn.call(path[i], ev);
						return false;
					}
				}
				return false;
				/*}*/
			}

		}

		//该事件是否需要委托
		if(str) {
			if(that.length === 1) {
				var _that = that[0];
				if(_that === window||_that === document) {
					if(events[_that.bindcount] === undefined) {
						events.index += 1;
						var count = events.index;
						_that.bindcount = count;
						events[count] = {};
					}!events[_that.bindcount][type] && (events[_that.bindcount][type] = [])
					events[_that.bindcount][type].push(entrust);
					var index = events[_that.bindcount][type]["length"];
					_that.addEventListener(type, events[_that.bindcount][type][index - 1], false);
				} else {
					if(events[_that.dataset.bindcount] === undefined) {
						events.index += 1;
						var count = events.index;
						_that.dataset.bindcount = count;
						events[count] = {};
					}!events[_that.dataset.bindcount][type] && (events[_that.dataset.bindcount][type] = []);
					events[_that.dataset.bindcount][type].push(entrust);
					var index = events[_that.dataset.bindcount][type]["length"];
					_that.addEventListener(type, events[_that.dataset.bindcount][type][index - 1], false);
				}
				/*that.addEventListener(type,entrust,false);*/
			} else {
				[].forEach.call(that, function(arr, i) {
					if(events[arr.dataset.bindcount] === undefined) {
						events.index += 1;
						var count = events.index;

						arr.dataset.bindcount = count;
						events[count] = {};
					}!events[arr.dataset.bindcount][type] && (events[arr.dataset.bindcount][type] = []);
					events[arr.dataset.bindcount][type].push(entrust);
					var index = events[arr.dataset.bindcount][type]["length"];
					arr.addEventListener(type, events[arr.dataset.bindcount][type][index - 1], false);
				});
			}

			/*if(CommissionedArr.length === 1){
				that.addEventListener(type,fn,false);
			}else{
				CommissionedArr.forEach(function(arr,i){
					arr.addEventListener(type,function(event){
						var ev = event||window.event;
						
					},false)
				})
			}*/
		} else {
			//该对象是否需要遍历绑定
			if(!that.length || that.length === 1) {
				var _that = that[0];
				if(_that === window||_that === document) {
					if(events[_that.bindcount] === undefined) {
						events.index += 1;
						var count = events.index;
						_that.bindcount = count;
						events[count] = {};
					}!events[_that.bindcount][type] && (events[_that.bindcount][type] = [])
					events[_that.bindcount][type].push(fn);
					var index = events[_that.bindcount][type]["length"];
					_that.addEventListener(type, events[_that.bindcount][type][index - 1], false);
				} else {
					if(events[_that.dataset.bindcount] === undefined) {
						events.index += 1;
						var count = events.index;
						_that.dataset.bindcount = count;
						events[count] = {};
					}!events[_that.dataset.bindcount][type] && (events[_that.dataset.bindcount][type] = []);
					events[_that.dataset.bindcount][type].push(fn);
					var index = events[_that.dataset.bindcount][type]["length"];
					_that.addEventListener(type, events[_that.dataset.bindcount][type][index - 1], false);
				}
			} else {
				[].forEach.call(that, function(arr, i) {
					/*setTimeout(function(){*/
					if(events[arr.dataset.bindcount] === undefined) {
						events.index += 1;
						var count = events.index;

						arr.dataset.bindcount = count;
						events[count] = {};
					}!events[arr.dataset.bindcount][type] && (events[arr.dataset.bindcount][type] = []);
					events[arr.dataset.bindcount][type].push(fn);
					var index = events[arr.dataset.bindcount][type]["length"];
					arr.addEventListener(type, events[arr.dataset.bindcount][type][index - 1], false);
					/*},10)*/

				});
			}
		}
		
		return that;
	}
	jx.prototype.off = function(type) {
		var that = this;
		if(!that) {
			return false;
		}
		if(that.length === 0 && that != that.window) {
			return false;
		}
		if(that.length && that.length > 1) {
			[].forEach.call(that, function(arr) {
				if(events[arr.dataset.bindcount]) {
					if(events[arr.dataset.bindcount][type]["length"] > 1) {
						events[arr.dataset.bindcount][type].forEach(function(_arr) {
							arr.removeEventListener(type, _arr);
						})
					} else {
						arr.removeEventListener(type, events[arr.dataset.bindcount][type][0]);
					}
				}
			})
		} else {
			var _that = that[0];
			if(_that === window||_that === document) {
				if(events[_that.bindcount]) {
					if(events[_that.bindcount][type]["length"] > 1) {
						events[_that.bindcount][type].forEach(function(_f) {
							_that.removeEventListener(type, _f);
						})
					} else {
						_that.removeEventListener(type, events[_that.bindcount][type][0]);
					}
				}
			} else {
				if(events[_that.dataset.bindcount]) {
					if(events[_that.dataset.bindcount][type]["length"] > 1) {
						events[_that.dataset.bindcount][type].forEach(function(_f) {
							_that.removeEventListener(type, _f)
						})
					} else {
						_that.removeEventListener(type, events[_that.dataset.bindcount][type][0]);
					}
				}
			}

		}

		if(that[0] === window||that[0] === document) {
			events[that[0].bindcount][type] = [];
		} else {
			if(that.length && that.length > 1) {
				[].forEach.call(that, function(_ele) {
					events[_ele.dataset.bindcount][type] = [];
				})
			} else {
				events[that[0].dataset.bindcount][type] = [];
			}

		}
		return that;
	}
	jx.prototype.find = function(str) {
		var that = this,
			arr = [];
		if(str.trim() === "") {
			return that;
		}
		if(that.length && that.length > 1) {

			[].forEach.call(that, function(obj) {
				/*arr.concat(obj.querySelectorAll(str).length?obj.querySelectorAll(str):[])*/
				if(obj.querySelectorAll(str).length > 0) {
					arr = arr.concat([].slice.call(obj.querySelectorAll(str)))
				}
			});

		} else {
			var _that = that[0];
			if(typeof(str) === "string") {
				var fristStr = str.trim().substr(0, 1);
				if(fristStr === "#") {
					arr.push(_that.getElementById(str.replace(/#/, "")));
				} else {
					arr = arr.concat([].slice.call(_that.querySelectorAll(str)))
				}
			}
		}
		return new jx(arr);
	}
	jx.prototype.children = function(str){
		var arr = [];
		var that = this[0];
		var ele = that;
		if(typeof str !== "undefined" && str.trim() !== ""){
			if(str.trim().substr(0, 1) === "."){
				[].forEach.call(that.childNodes,function(obj){
					if(obj.classList.contains(str.trim().substr(0,str.length))){
						arr.push(obj)
					}
				})
			}else{
				[].forEach.call(that.childNodes,function(obj){
					if(obj.tagName.toLocaleLowerCase() === str.toLocaleLowerCase()){
						arr.push(obj)
					}
				})
			}
		}else{
			arr = that.childNodes
		}
		return new jx(arr)	
	}
	jx.prototype.siblings = function(str) {
		var arr = [],
			that = this[0],
			ele = that;
		if(typeof str !== "undefined" && str.trim() !== "") {
			if(typeof ele.nextElementSibling !== "undefined") {
				while(ele.nextElementSibling) {
					if(str.trim().substr(0, 1) === "." && ele.nextElementSibling.classList.contains(str.trim().substr(0, str.trim().length)) || str.trim().toLocaleUpperCase() === ele.nextElementSibling.tagName) {
						arr.push(ele.nextElementSibling);
					}
					ele = ele.nextElementSibling;
				}
				ele = that;
				while(ele.previousElementSibling) {
					if(str.trim().substr(0, 1) === "." && ele.previousElementSibling.classList.contains(str.trim().substr(0, str.trim().length)) || str.trim().toLocaleUpperCase() === ele.previousElementSibling.tagName) {
						arr.push(ele.previousElementSibling);
					}
					ele = ele.previousElementSibling;
				}
			} else {
				while(ele.nextSibling) {
					if(ele.nextSibling.nodeType === 1 && str.trim().substr(0, 1) === "." && ele.nextSibling.classList.contains(str.trim().substr(0, str.trim().length)) || ele.nextSibling.nodeType === 1 && str.trim().toLocaleUpperCase() === ele.nextSibling.tagName) {
						arr.push(ele.nextSibling);
					}
					ele = ele.nextSibling;
				}
				ele = that;
				while(ele.previousSibling) {
					if(ele.previousSibling.nodeType === 1 && str.trim().substr(0, 1) === "." && ele.previousSibling.classList.contains(str.trim().substr(0, str.trim().length)) || ele.previousSibling.nodeType === 1 && str.trim().toLocaleUpperCase() === ele.previousSibling.tagName) {
						arr.push(ele.previousSibling);
					}
					ele = ele.previousSibling;
				}
			}
		} else {
			if(typeof ele.nextElementSibling !== "undefined") {
				while(ele.nextElementSibling) {
					arr.push(ele.nextElementSibling);
					ele = ele.nextElementSibling;
				}
				ele = that;
				while(ele.previousElementSibling) {
					arr.push(ele.previousElementSibling);
					ele = ele.previousElementSibling;
				}
			} else {
				while(ele.nextSibling) {
					if(ele.nextSibling.nodeType === 1) {
						arr.push(ele.nextSibling);
					}
					ele = ele.nextSibling;
				}
				ele = that;
				while(ele.previousSibling) {
					if(ele.previousSibling.nodeType === 1) {
						arr.push(ele.previousSibling);
					}
					ele = ele.previousSibling;
				}
			}
		}
		return new jx(arr);
	}
	jx.prototype.parent = function() {
		var that = this[0];
		if(that.length) {
			return that;
		}
		return new jx(that.parentNode);
	}
	jx.prototype.parents = function(str) {
		var that = this[0],
			arr = [],
			parents = that.parentNode;
		/*if(that.length) {
			return that;
		}*/
		if(str) {
			var cssStr = str.substr(0, 1);
			if(cssStr === "." || cssStr === "#") {
				if(cssStr === ".") {
					while(parents !== document) {
						if(parents.classList.contains(str.replace(".", ""))) {
							arr.push(parents)
						}
						parents = parents.parentNode;
					}
				}
				if(cssStr === "#") {
					while(parents !== document) {
						if(parents.id === (str.replace("#", ""))) {
							arr.push(parents)
						}
						parents = parents.parentNode;
					}
				}
			} else {
				while(parents !== document) {
					if(parents.tagName.toLocaleLowerCase() === str) {
						arr.push(parents)
					}
					parents = parents.parentNode;
				}
			}
		} else {
			while(parents !== document) {
				arr.push(parents)
				parents = parents.parentNode;
			}
		}
		return new jx(arr);
	}

	jx.prototype.css = function(name, value) {
		var that = this,
			type = Object.prototype.toString.call(name).split(" ")[1].replace("]", ""),
			toName = function(_name) {
				var index = _name.indexOf("-"),
					_name = _name;
				if(index !== -1) {
					_name = _name.substr(0, index) + _name.replace("-", "").substr(index, 1).toLocaleUpperCase() + _name.substring(index + 2, _name.length);
					return _name;
				} else {
					return _name
				}
			}
		if(typeof name === "undefined" || that === window || that === document) {
			return that;
		}
		if(typeof value === "undefined") {
			if(type === "String") {
				return getComputedStyle(that[0], null)[toName(name)];
			}
			/*if(type === "Object") {
				if(that.length>1) {
					[].forEach.call(that, function(ele) {
						Object.keys(name).forEach(function(_attr) {
							ele.style[toName(_attr)] = name[_attr]
						})
					})
				} else {
					Object.keys(name).forEach(function(_attr) {
						that[0].style[toName(_attr)] = name[_attr]
					})
				}

			}*/
		} else {
			if(type === "String") {
				if(that.length>1) {
					[].forEach.call(that, function(ele) {
						ele.style[toName(name)] = value;
					})
				} else {
					that[0].style[toName(name)] = value;
				}
			}
		}
		return that;
	}

	//扩展一个获取元素索引的方法
	jx.prototype.index = function() {
		var that = this[0],
			currIndex;
		[].forEach.call(that.parentNode.children, function(ele, i) {
			if(that === ele) {
				currIndex = i;
			}
		});
		return(currIndex === undefined) ? -1 : currIndex;
	}

	//扩展一个添加和删除、检测classname的方法（基于classList）

	jx.prototype.addClass = function(className) {
		var that = this;
		if(!className || that === null || that.length === 0) {
			return that;
		}
		if(that.length>1) {
			/*that.forEach(function(obj,i){
				obj.classList.add(className);
			});*/
			[].forEach.call(that, function(obj) {
				obj.classList.add(className);
			})
		} else {
			that[0].classList.add(className);
		}
		return that;
	}
	jx.prototype.removeClass = function(className) {
		var that = this;
		if(!className || that === null || that.length === 0) {
			return that;
		}
		if(that.length>1) {
			/*that.forEach(function(obj,i){
				obj.classList.remove(className);
			});*/
			[].forEach.call(that, function(obj) {
				obj.classList.remove(className);
			})
		} else {
			that[0].classList.remove(className);
		}
		return that;
	}
	jx.prototype.html = function(str){//简单实现 innerHTML
		if(typeof str === 'undefined'){
			return this[0].innerHTML
		}else{
			this[0].innerHTML = str;
		}
		
	}
	jx.prototype.hasClass = function(className) {
		var that = this;
		if(!className || that === null || that.length === 0) {
			return false;
		}
		/*if(that.length>1) {
			return that[0].classList.contains(className);
		} else {
			return that.classList.contains(className);
		}*/
		return that[0].classList.contains(className)
	}
	//新增一个append的方法，基于innerHTML、createElement、createDocumentFragment
	jx.prototype.append = function(str) {
		var that = this;
		if(that[0].nodeType === 1) {
			if(str.nodeType === 1) {
				that[0].appendChild(str)
			} else {
				var tem = document.createElement("div");
				var fragment = document.createDocumentFragment();
				tem.innerHTML = str;
				for(var i = 0, j = tem.children.length; i < j; i += 1) {
					var nodeEle = tem.children[i].cloneNode(true);
					fragment.appendChild(nodeEle);
				}
				that[0].appendChild(fragment);
			}
		}
		return that;
	}
	jx.prototype.remove = function() {
		
		var that = this[0];
		if(that.remove){
			that.remove()
		}else{
			that.parentNode.removeChild(that)
		}
	}
	//将jx对象转成node或者nodelist
	jx.prototype.get = function(index){
		var that = this,index = index || 0;
		return that[index]
	}
})();

function xAjax(option) { //基于原生实现的一个简单的ajax请求
	if(this === window) {
		return new xAjax(option);
	}
	var option = option || {};
	this.type = option.type;
	this.data = option.data;
	this.url = option.url;
	this.success = option.success;
	this.fail = option.fail;
	this.dataType = option.dataType;
	this.cache = option.cache === false ? false : true;
	this.init();
}
xAjax.prototype = {
	init: function() {
		this.createXMLHttpRequest();
	},
	createXMLHttpRequest: function() {
		var str = "",
			that = this;
		if(this.data) {
			/*var arr = Object.keys(this.data),arr2 = [];
				if(arr.length === 1){
					str = arr[0]+"="+this.data[arr[0]];
				}else if(arr.length > 1){
					for(var i = 0,j = arr.length;i<j;i+= 1){
						arr2.push(arr[i]+"="+this.data[arr[i]]);
					}
					str = arr2.join("&");
				}*/

			if(Object.prototype.toString.call(this.data) === "[object Object]") {
				var obj = Object.keys(this.data);
				if(Object.keys(this.data).length > 0) {
					/*str = JSON.stringify(this.data).replace(/{"|"|}/g,"").replace(/:/g,"=").replace(/,/g,"&");
					}*/
					obj.forEach(function(arr, i) {
						if(Object.prototype.toString.call(that.data[arr]) === "[object Array]") {
							that.data[arr].forEach(function(_arr, _i, _all) {
								if(_i + 1 >= _all.length && obj.length <= i + 1) {
									str += arr + "=" + _arr;
								} else {
									str += arr + "=" + _arr + "&";
								}

							})
						} else {
							if(obj.length > i + 1) {
								str += arr + "=" + that.data[arr] + "&";

							} else {
								str += arr + "=" + that.data[arr];
							}

						}
					})
				}
			} else {
				console.error("data not a Object");
			}
		}

		this.httpRequest = new XMLHttpRequest();
		if(!this.httpRequest) {
			alert("不支持XMLHttpRequert！");
			return false;
		}
		this.httpRequest.onreadystatechange = this.readystatechangeFn.bind(this);
		if(this.type.toLocaleLowerCase() === "post") {
			this.httpRequest.open(this.type.toLowerCase(), this.url, true); //这里就不现实同步了
			this.httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			this.httpRequest.send(str);
		} else {
			var surl = str ? !this.cache ? this.url + "?" + str + "&_=" + new Date().getTime() : this.url + "?" + str : !this.cache ? this.url.indexOf('?')!==-1?this.url + "&_=" + new Date().getTime():this.url + "?_=" + new Date().getTime() : this.url;
			this.httpRequest.open(this.type.toLowerCase(), surl, true); //这里就不现实同步了
			this.httpRequest.send();
		}
	},
	readystatechangeFn: function() {
		if(this.httpRequest.readyState === XMLHttpRequest.DONE) {
			if(this.httpRequest.status === 200) {
				if(typeof(this.success) === "function") {
					this.success(this.dataType === "json" ? JSON.parse(this.httpRequest.responseText) : this.httpRequest.responseText);
				}
			} else {
				if(typeof(this.fail) === "function") {
					this.fail(this.dataType === "json" ? JSON.parse(this.httpRequest.responseText) : this.httpRequest.responseText);
				}
			}
		}
	}
}

//实现一个简单的图片延迟加载基于window.onscroll、Element.getBoundingClientRect

function lazyLoad(option) {
	var option = option || {};
	this.obj = option.obj;
	this.scope = option.scope || 0;
	this.init();
}
lazyLoad.prototype = {
	init: function() {
		this.loadTop = (window.document.documentElement.clientHeight) - this.scope;
		this.createLoadList();
		this.loadImg();
		this.scroll();
	},
	createLoadList: function() {
		var that = this;
		that.loadList = Array.prototype.map.call(that.obj, function(obj) {
			return obj
		})
	},
	loadImg: function() {
		var that = this,
			count = 0;
		/*that.loadList.forEach(function(obj,i){
			if(obj.getBoundingClientRect().top < that.loadTop){
				obj.src = obj.dataset.src;
				that.loadList.splice(count,1);
			}else{
				count +=1;
			}
		})*/
		for(var i = 0; i < that.loadList.length; i += 1) {
			if(that.loadList[i].getBoundingClientRect().top < that.loadTop) {
				that.loadList[i].src = that.loadList[i].dataset.src;
				that.loadList.splice(i, 1);
				i--;
			}
		}
	},
	scroll: function() {
		var that = this,
			scrollTimer = null;
		//由于eventsBind没有实现对应的删除方法，这里暂时用onscroll
		/*window.eventsBind("scroll",function(){
			if(that.loadList.length === 0){
				
			}else{
				that.loadImg()
			}
		});*/
		window.onscroll = function() {
			if(that.loadList === undefined) {

			}
			if(that.loadList.length === 0) {
				window.onscroll = null;
			} else {
				scrollTimer && clearTimeout(scrollTimer);
				scrollTimer = setTimeout(function() {
					that.loadImg();
				}, 300)

			}
		}
	}
}

function touchControl(touchs) { //一个现在滑动的方法，传入一个可滑动的元素
	//在某些设备上touchmove只能触发一次，因为在start和move的过程中触发了cancel，这个bug暂时没法解决。。
	touchs.eventsBind("touchstart", function(e) {
		var ev = e || window.event,
			that = this;

		startY = ev.touches[0].clientY;
		ev.stopPropagation();
	});
	touchs.eventsBind("touchmove", function(e) {
		var ev = e || window.event,
			that = this;
		ev.stopPropagation();
		moveY = ev.touches[0].clientY;
		/*document.querySelector(".rule").textContent = moveY;*/
		if(startY - moveY > 0) {
			if(that.scrollTop + that.offsetHeight >= that.scrollHeight - 20) {
				ev.preventDefault();
			}
		}
		if(startY - moveY < 0) {
			if(that.scrollTop <= 20) {
				ev.preventDefault();
			}
		}
	});
	/*touchs.eventsBind("touchcancel",function(e){
		var ev = e || window.event,that = this;
		ev.stopPropagation();
		ev.preventDefault();
		
	})*/

}