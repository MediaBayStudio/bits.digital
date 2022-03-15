/**
 * Contains user navigator.
 * @type {Object}
 * @example
 * {
  * isOpera: true,
  * isFirefox: false,
  * isSafari: false,
  * isIE: false,
  * isEdge: false,
  * isChrome: false,
  * isYandex: false,
  * isMac: false
 * }
 */
 var browser = {
  // Opera 8.0+
  isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
  // Firefox 1.0+
  isFirefox: typeof InstallTrigger !== 'undefined',
  // Safari 3.0+ "[object HTMLElementConstructor]"
  isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
  // Internet Explorer 6-11
  isIE: /*@cc_on!@*/ false || !!document.documentMode,
  // Edge 20+
  isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
  // Chrome 1+
  isChrome: !!window.chrome && !!window.chrome.webstore,
  isYandex: !!window.yandex,
  isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
};

var SLIDER = {
  // nextArrow: '<button type="button" class="arrow"></button>',
  // prevArrow: '<button type="button" class="arrow"></button>',
  // dot: '<button type="button" class="dot"></button>',
  hasSlickClass: function($el) {
    return $el.hasClass('slick-slider');
  },
  unslick: function($el) {
    $el.slick('unslick');
  },
  createArrow: function(className, inside) {
    className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;
    return '<button type="button" class="arrow arrow-' + className + '">' + inside + '</button>';
  }
};

var windowFuncs = {
  load: [],
  resize: [],
  scroll: [],
  call: function(event) {
    let funcs = windowFuncs[event.type] || event;
    for (let i = funcs.length - 1; i >= 0; i--) {
      console.log(funcs[i].name);
      funcs[i]();
    }
  }
};

/**
 * Phone mask function is locaed in components/_telMask.js.
 * @type {function}
 */
var mask;

/**
 * Mobile menu function is locaed in components/_menu.js.
 * @type {function}
 */
var mobileMenu;

/**
 * Object mobile menu.
 * Contains 'menu' property whose value is HTMLElement.
 * @type {Object}
 * @example Events for menu.menu.addEventListener():
 * 'menubeforeopen'
 * 'menubeforeclose'
 * 'menuopen'
 * 'menuclose'
 * Methods:
 * menuOpen()
 * menuClose()
 */
var menu;

/**
 * Burger button element.
 * @type {HTMLElement}
 */
var burger;

var thanksPopup;
var errorPopup;
var casePopup;

/**
 * Site header element.
 * @type {HTMLElement}
 */
var hdr;

/**
 * Fake scrollbar element.
 * Required to hide the scrollbar on document.
 * @type {HTMLElement}
 */
var fakeScrollbar;

/**
* @function q
* @desc Short querySelector()
* @arg {string} selector Some valid CSS-selector.
* @arg {HTMLElement|null} [context=document.body] Search context.
* @returns {HTMLElement|null} */
var q = function(selector, context) {
  context = context || document.body;
  return context.querySelector(selector);
};

/** 
* @function qa
* @desc Short querySelectorAll() and transform to Array
* @arg {string} selectors Some valid CSS-selectors.
* @arg {HTMLElement|null} [context=document.body] Search context.
* @arg {boolean} toArray If true returns Array, else returns NodeList.
* @returns {NodeList|HTMLElement[]|null} */
var qa = function(selectors, context, toArray) {
  context = context || document.body;
  let elements = context.querySelectorAll(selectors);
  return toArray ? Array.prototype.slice.call(elements) : elements;
};

/**
* @function id
* @desc Short getElementById()
* @arg {string} selector Element id without #.
* @returns {HTMLElement|null} */
var id = function(selector) {
  return document.getElementById(selector);
};

/**
* @function setVh
* @desc Fixes 'vh' css units. Sets css variable --vh to document. */
var setVh = function() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
};

/**
* @function media
* @desc Short window.matchMedia(query).matches
* @arg {string} query Some valid CSS media-query.
* @returns {boolean} true or false */
var media = function(query) {
  return window.matchMedia(query).matches;
};

/**
* @function scrollToTarget
* @desc Scrolling to element with using requestAnimationFrame.
* @arg {Event|null} e standart Event.
* @arg {HTMLElement|0|string} target If 0 target = document.body, if string target = q(string). */
var scrollToTarget = function(e, target) {
  e && e.preventDefault();

  if (this === window) {
    _ = e.target;
  } else {
    _ = this;
  }

  if (!target) {
    target = target || _.getAttribute('data-scroll-target');
    if (target == 0) {
      target = document.body;
    }
  }

  if (!target && _.tagName === 'A') {
    target = q(_.getAttribute('href'));
  }

  if (target.constructor === String) {
    target = q(target);
  }

  if (!target) {
    console.warn('Scroll target not found');
    return;
  }

  menu && menu.close();

  let wndwY = window.pageYOffset;
  let targetStyles = getComputedStyle(target);
  // let targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2);
  let targetTop = target.getBoundingClientRect().top;
  let start = null;
  let V = Math.abs(targetTop) > 3000 ? 0.15 : 0.35;
  let step = function(time) {
    if (start === null) {
      start = time;
    }
    let progress = time - start;
    let r = (targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop));

    window.scrollTo(0, r);

    if (r != wndwY + targetTop) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
};

/**
* @function pageScroll
* @desc Allow or disallow scrolling page by user.
* @arg {boolean} disallow If true - disallow scrolling, if false - allow scrolling. */
var pageScroll = function(disallow) {
  fakeScrollbar.classList.toggle('active', disallow);
  document.body.classList.toggle('no-scroll', disallow);
  let width = fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth;
  document.body.style.paddingRight = disallow ? width + 'px' : '';
  //// custom
  // console.log(hdr);
  // hdr.style.left = disallow ? '-' + (width/2).toFixed() + 'px' : '';
};

/**
* @function sticky
* @desc Sticky element by js.
* @arg {HTMLElement|string} $el Element to fix.
* @arg {string|null} fixThresholdDir 'top' or 'bottom' threshold of element, 'bottom' by default.
* @arg {string|null} className 'fixed' by default. */
var sticky = function($el, fixThresholdDir, className) {
  $el = typeof $el === 'string' ? q($el) : $el;
  className = className || 'fixed';
  fixThresholdDir = fixThresholdDir || 'bottom';

  let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + scrollY;
  let $elClone = $el.cloneNode(true);
  let $elParent = $el.parentElement;
  let fixElement = function() {
    if (!$el.classList.contains(className) && scrollY >= fixThreshold) {
      $elParent.appendChild($elParent.replaceChild($elClone, $el));
      $el.classList.add(className);

      window.removeEventListener('scroll', fixElement);
      window.addEventListener('scroll', unfixElement);
    }
  };
  let unfixElement = function() {
    if ($el.classList.contains(className) && scrollY <= fixThreshold) {
      $elParent.replaceChild($el, $elClone);
      $el.classList.remove(className);

      window.removeEventListener('scroll', unfixElement);
      window.addEventListener('scroll', fixElement);
    }
  };

  $elClone.classList.add('clone');
  fixElement();
  window.addEventListener('scroll', fixElement);
};