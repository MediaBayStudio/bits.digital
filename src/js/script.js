//=include components/utils.js

document.addEventListener('DOMContentLoaded', function() {

  for (let key in browser) {
    if (browser[key]) {
      document.body.classList.add(key);
    }
  }

  //=include components/lazyanimation.js
  
  //=include components/telMask.js

  //=include components/validateForms.js

  //=include components/menu.js

  // В основном для IE
  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (!HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }

  fakeScrollbar = id('fake-scrollbar');

  burger = q('.hdr__burger');

  hdr = q('.hdr');

  menu = mobileMenu({
    menu: q('.menu'),
    menuCnt: q('.menu__cnt'),
    openBtn: burger,
    closeBtn: q('.menu .menu__close'),
    toRight: true,
    fade: false,
    allowPageScroll: false
  });

  // fix fixed header
  // [thanksPopup, errorPopup].forEach(function(popup) {
  //   popup.addEventListener('popupbeforeopen', function() {
  //     pageScroll(true);
  //   });
  //   popup.addEventListener('popupclose', function() {
  //     pageScroll(false);
  //   });
  // })

  // menu.open();

  let navLinks = qa('.nav-link[href^="#"], [data-scroll-target]');

  for (let i = 0, len = navLinks.length; i < len; i++) {
    navLinks[i].addEventListener('click', scrollToTarget);
  }

  // sticky(hdr);

  // thanksPopup = new Popup('.thanks', {
  // closeButtons: '.thanks__close'
  // });

  // lazyload init
  lazyload();

  window.svg4everybody && svg4everybody();

  // Добавление расчета vh на ресайз окна
  windowFuncs.resize.push(setVh);

  // Сбор событий resize, load, scroll и установка на window
  for (let eventType in windowFuncs) {
    if (eventType !== 'call') {
      let funcsArray = windowFuncs[eventType];
      if (funcsArray.length > 0) {
        windowFuncs.call(funcsArray);
        window.addEventListener(eventType, windowFuncs.call);
      }
    }
  }

  // настройки grab курсора на всех слайдерах
  // let slickLists = $('.slick-list.draggable');

  // slickLists.on('mousedown', function() {
  //   $(this).addClass('grabbing');
  // }).on('beforeChange', function() {
  //   $(this).removeClass('grabbing');
  // });

  // $(document).on('mouseup', function() {
  //   slickLists.removeClass('grabbing');
  // });
});