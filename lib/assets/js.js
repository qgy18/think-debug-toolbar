(function () {
	"use strict";

	function Cookie(options) {
		options = options || {};
		this.path	 = options.path || "/";
		this.domain	 = options.domain || "";
		this.expires = options.expires || 3600000 * 24 * 365;
		this.secure	 = options.secure || "";
	}

	Cookie.prototype = {
		set:function(key, value){
			var now = new Date();
			if(typeof(this.expires)=="number"){
				now.setTime(now.getTime() + this.expires);
			}
			document.cookie =
				key + "=" + escape(value)
				+ ";expires=" + now.toGMTString()
				+ ";path="+ this.path
				+ (this.domain === "" ? "" : ("; domain=" + this.domain))
				+ (this.secure ? "; secure" : "");
		},

		get:function(key){
			var a, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
			if(a = document.cookie.match(reg)){
				return unescape(a[2]);
			}else{
				return "";
			}
		}
	};

	Cookie.set=function(key,value,options){
		new Cookie(options).set(key,value);
	};

	Cookie.get=function(key,options){
		return new Cookie(options).get(key);
	};

	var $TDT = document.getElementById('TDT'),
		$menu = document.querySelector('#TDT-menu ul'),
		$close = document.getElementById('TDT-close'),
		$collapse = document.getElementById('TDT-collapse'),
		$main = document.getElementById('TDT-main'),
		$show = document.getElementById('TDT-show'),
		cookieState = '_tdt_state',
		cookieTabId = '_tdt_tab_id';

	var util = {
		getTarget: function(event) {
			return event.originalTarget || event.srcElement;
		},

		hasClass: function(el, klass) {
			return el.className && el.className.indexOf(klass) !== -1;
		},

		nextSibling: function(el) {
			var next = el.nextSibling;
			while (next && next.nodeType != 1) {
				next = next.nextSibling
			}
			return next;
		},

		getParentWithClass: function(el, klass) {
			var next = el.parentNode;
			while (next && !util.hasClass(next, klass)) {
				next = next.parentNode
			}
			return next;
		},

		activeTab : function(tabId) {
			var $activeMenu = document.querySelector('#TDT-menu .active');
			$activeMenu && ($activeMenu.className = '');
			document.querySelector('#TDT-menu a[tab-id="'+ tabId +'"]').className = 'active';

			var $activeTab = document.querySelector('#TDT .tab.active');
			$activeTab && ($activeTab.className = 'tab');
			document.getElementById(tabId).className = 'tab active';

			if($collapse.innerHTML.trim() == 'EXPAND') {
				util.collapseOrExpand();
			}

			Cookie.set(cookieTabId, tabId);
			window.scrollTo(0, 0);
		},

		collapseOrExpand : function() {
			var currentState = $collapse.innerHTML.trim();

			if(currentState == 'COLLAPSE') {
				$main.style.display = 'none';
				currentState = 'EXPAND';
			} else {
				$main.style.display = '';
				currentState = 'COLLAPSE';
				window.scrollTo(0, 0);
			}
			
			$collapse.innerHTML = currentState;
			Cookie.set(cookieState, currentState);
		}
	};

	// panel selector
	$menu.addEventListener('click', function (e) {
		e.preventDefault();

		var target = util.getTarget(e);
		var tabId = target.getAttribute('tab-id');

		if (tabId) {
			var $activeMenu = document.querySelector('#TDT-menu .active');
			if($activeMenu != target) {
				util.activeTab(tabId);
			} else {
				util.collapseOrExpand();
			}
		}
	});

	$close.addEventListener('click', function (e) {
		e.preventDefault();
		$TDT.style.display = 'none';
		$show.style.display = 'block';

		Cookie.set(cookieState, 'CLOSE');
	});

	$show.addEventListener('click', function (e) {
		e.preventDefault();
		$TDT.style.display = 'block';
		$show.style.display = 'none';

		Cookie.set(cookieState, 'COLLAPSE');
	});

	$collapse.addEventListener('click', function (e) {
		e.preventDefault();
		util.collapseOrExpand();
	});

	$TDT.addEventListener('click', function (e) {
		var el = util.getTarget(e),
			$fn;

		// show/hide functions
		if (util.hasClass(el, 'showFn')) {
			$fn = util.nextSibling(el);
			if ($fn) {
				$fn.style.display = 'block';
			}
			el.className = 'hideFn';
			e.preventDefault();

		} else if (util.hasClass(el, 'hideFn')) {
			$fn = util.nextSibling(el);
			if ($fn) {
				$fn.style.display = 'none';
			}
			el.className = 'showFn';
			e.preventDefault();

		// show/hide objects
		} else if (util.getParentWithClass(el, 'collapse')) {
			var $object = util.getParentWithClass(el, 'object');
			$object.children[1].style.display = 'none';
			util.getParentWithClass(el, 'collapse').className = 'expand';
			e.preventDefault();

		} else if (util.getParentWithClass(el, 'expand')) {
			var $object = util.getParentWithClass(el, 'object');
			$object.children[1].style.display = 'table-row-group';
			util.getParentWithClass(el, 'expand').className = 'collapse';
			e.preventDefault();
		}
	});

	(function() {
		var tabId = Cookie.get(cookieTabId);
		if(!tabId) {
			tabId = document.querySelector('#TDT-menu a[tab-id]').getAttribute('tab-id');
		}
		util.activeTab(tabId);

		var state = Cookie.get(cookieState);
		if(!state) {
			state = 'CLOSE';
		}

		if(state == 'COLLAPSE' || state == 'EXPAND') {
			if(state == 'COLLAPSE') {
				$main.style.display = '';
			} else if(state == 'EXPAND') {
				$main.style.display = 'none';
			}

			$collapse.innerHTML = state;

			$TDT.style.display = 'block';
			$show.style.display = 'none';
		}
	})();
})();
