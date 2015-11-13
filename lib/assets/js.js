(function () {
	"use strict";
	var $TDT = document.getElementById('TDT'),
		$menu = document.querySelector('#TDT-menu ul'),
		$close = document.getElementById('TDT-close'),
		$show = document.getElementById('TDT-show');

	var util = {
		getTarget: function(event) {
			return event.originalTarget || event.srcElement;
		},

		getHref: function (event) {
			var el = util.getTarget(event);

			return el && el.attributes && (el.attributes.hash || el.attributes.href);
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
		}
	};

	// panel selector
	$menu.addEventListener('click', function (e) {
		var tab_id = util.getHref(e);
		if (tab_id) {
			var $active = document.querySelectorAll('#TDT-menu .active');
			for (var i = 0; i < $active.length; i++) {
				$active[i].className = '';
			}
			util.getTarget(e).className = 'active';

			e.preventDefault();
			var $actives = document.querySelectorAll('#TDT .tab.active');
			for (var i = 0; i < $actives.length; i++) {
				$actives[i].className = 'tab';
			}

			tab_id = tab_id.value.substring(1);
			document.getElementById(tab_id).className = 'tab active';

			window.scrollTo(0, 0);
		}
	});

	// TDT close button
	$close.addEventListener('click', function (e) {
		e.preventDefault();
		$TDT.style.display = 'none';
		$show.style.display = 'block';
	});

	// TDT show button
	$show.addEventListener('click', function (e) {
		e.preventDefault();
		$TDT.style.display = 'block';
		$show.style.display = 'none';
	});

	// expand/collapse catchall
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
})();
