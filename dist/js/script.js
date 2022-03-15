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

document.addEventListener('DOMContentLoaded', function() {

  for (let key in browser) {
    if (browser[key]) {
      document.body.classList.add(key);
    }
  }

  ;
  (function() {
    const svgElements = qa('.lazyanimation');
    if (svgElements.length > 0) {
      const svgElementsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          const target = entry.target;
          if (entry.intersectionRatio > 0) {
            target.classList.add('lazyloaded');
            svgElementsObserver.unobserve(target);
          }
        });
      });
      svgElements.forEach(svgElement => svgElementsObserver.observe(svgElement));
    }
  })();
    // ;(function() {
    //   let setCursorPosition = function(pos, inputElement) {
    //     inputElement.focus();
    //     if (inputElement.setSelectionRange) {
    //       inputElement.setSelectionRange(pos, pos);
    //     } else if (inputElement.createTextRange) {
    //       let range = inputElement.createTextRange();
    
    //       range.collapse(true);
    //       range.moveEnd('character', pos);
    //       range.moveStart('character', pos);
    //       range.select();
    //     }
    //   };
    
    //   mask = function() {
    //     let pattern = '+7(___)___-__-__',
    //       i = 0,
    //       def = pattern.replace(/\D/g, ''),
    //       val = this.value.replace(/\D/g, '');
    
    //     if (def.length >= val.length) {
    //       val = def;
    //     }
    
    //     this.value = pattern.replace(/./g, function(match) {
    //       return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
    //     });
    
    //     if (event.type === 'blur') {
    //       if (this.value.length === 2) {
    //         this.value = '';
    //         this.classList.remove('filled');
    //       }
    //     } else {
    //       setCursorPosition(this.value.length, this);
    //     }
    //   };
    
    //   let input = qa('[name=tel]');
    
    //   for (let i = 0; i < input.length; i++) {
    //     input[i].addEventListener('input', mask);
    //     input[i].addEventListener('focus', mask);
    //     input[i].addEventListener('blur', mask);
    //   }
    // })();

  (function() {
    const $forms = [
      id('contact-form')
      // qa('#conacts-form')
    ];
    const patterns = {
      // tel: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
      email: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
      msg: /[^\<\>\[\]%\&'`]+$/
    };
  
    const formValidator = function(params) {
      const $form = params.form;
      const $formBtn = params.formBtn;
      const $uploadFilesBlock = params.uploadFilesBlock;
      const errorsClass = "invalid";
      const defaultError = "Field error";
      const errorsTag = "p";
      // Rules from jquery.validate
      const rules = {
        name: {
          required: true,
        },
        tel: {
          required: true,
          // pattern: patterns.tel,
          // or: 'email'
        },
        email: {
          required: true,
          pattern: patterns.email,
          // or: 'tel'
        },
        msg: {
          required: true,
          pattern: patterns.msg,
        },
        policy: {
          required: true,
        },
      };
      const messages = {
        tel: {
          // required: 'Введите ваш телефон или E-mail',
          required: "Type your phone",
          // pattern: "Укажите верный телефон",
        },
        name: {
          required: "Type your name",
        },
        email: {
          // required: 'Введите ваш E-mail или телефон',
          required: "Type your E-mail",
          pattern: "Type a valid e-mail",
        },
        msg: {
          required: "Type a message",
          pattern: "Field error",
        },
        // policy: {
          // required: "Согласитель с политикой обработки персональных данных",
        // }
      };
  
      const initValidator = function() {
        const $formElements = $form.elements;
        $form.setAttribute("novalidate", "");
        $form.validatie = false;
  
        if ($formBtn) {
          $formBtn.addEventListener("click", function(e) {
            validationForm();
  
            if ($form.validatie === false) {
              e.preventDefault();
            } else {
              // $form.classList.add("loading");
              document.body.classList.add('loading');
              $formBtn.blur();
              $form.blur();
              $form.removeEventListener("change", validationForm);
              $form.removeEventListener("input", validationForm);
            }
          });
        }
        if (!document.wpcf7submit) {
          document.addEventListener("wpcf7submit", submitHandler);
          document.wpcf7submit = true;
        }
  
        $form.addEventListener("input", toggleInputsClass);
      };
  
      /**
       * Function searches only for the elements that are specified in the rules.
       * @param {HTMLFormElement} $form
       * @returns {object} {fieldName: fieldValue}
       */
      const getFormData = function($form) {
        const formElements = $form.elements;
        const data = {};
  
        for (const formElementName in rules) {
          const formElement = formElements[formElementName];
  
          if (formElement) {
            // const formElementEndingRule = rules[formElementName].ending || formElement.getAttribute('data-ending');
            let formElementValue = formElement.value;
  
            // if (formElementEndingRule) {
            // formElementValue = formElementValue.replace(formElementEndingRule, '');
            // }
  
            data[formElementName] = formElementValue;
          }
        }
  
        return data;
      };
  
      /**
       * Function of validating form.
       * @description Show or hide errors, set form.validate to true or false
       */
      const validationForm = function() {
        const errors = {};
        const thisForm = $form;
        const values = getFormData(thisForm);
        const setErrorMessage = function($formElement, elementName, messageType) {
          errors[elementName] = messages[elementName][messageType] || $formElement.getAttribute('data-message-' + messageType) || defaultError;
        };
  
        for (const elementName in values) {
          const rule = rules[elementName];
          const $formElement = thisForm[elementName];
          const elementValue = values[elementName];
          const elementValueLength = elementValue.length;
          const or = rule.or;
          const $orFormElement = thisForm[or];
  
          if (rule) {
            if ($formElement.hasAttribute("required") || rule.required === true) {
              const elementType = $formElement.type;
              const pattern = rule.pattern;
              const min = +(rule.min || $formElement.getAttribute('min'));
              const max = +(rule.max || $formElement.getAttribute('max'));
              const minlength = rule.minlength || +$formElement.getAttribute('minlength');
              const maxlength = rule.maxlength || +$formElement.getAttribute('maxlength');
              const isCheckboxOrRadio = elementType === "checkbox" || elementType === "radio";
              const isNumberOrRange = elementType === "number" || elementType === "range";
  
              // Validation required
              if ((isCheckboxOrRadio && !$formElement.checked) || elementValue === "") {
                if (or && $orFormElement) {
                  if ($orFormElement.value === "") {
                    setErrorMessage($formElement, elementName, 'required');
                    continue;
                  }
                } else {
                  setErrorMessage($formElement, elementName, 'required');
                  continue;
                }
              }
  
              // Validation min & max
              if (isNumberOrRange) {
                if (min && elementValue < min) {
                  setErrorMessage($formElement, elementName, 'min');
                  continue;
                }
                if (max && elementValue > max) {
                  setErrorMessage($formElement, elementName, 'max');
                  continue;
                }
              }
  
              // Validation minlength & maxlength
              if (elementType === "text" || elementType === "password" || $formElement.tagName === "TEXTAREA") {
                if (minlength && elementValueLength < minlength) {
                  setErrorMessage($formElement, elementName, 'minlength');
                  continue;
                }
                if (maxlength && elementValueLength > maxlength) {
                  setErrorMessage($formElement, elementName, 'maxlength');
                  continue;
                }
              }
  
              // Validation pattern
              if (!isCheckboxOrRadio && pattern) {
                if (elementValue !== "" && pattern.test(elementValue) === false) {
                  setErrorMessage($formElement, elementName, 'pattern');
                  continue;
                }
              }
  
              hideError($formElement);
            }
          }
        }
  
        if (Object.keys(errors).length == 0) {
          // thisForm.removeEventListener("change", validationForm);
          // thisForm.removeEventListener("input", validationForm);
          $form.validatie = true;
        } else {
          thisForm.addEventListener("change", validationForm);
          thisForm.addEventListener("input", validationForm);
          showErrors(thisForm, errors);
          $form.validatie = false;
        }
      };
  
      const showErrors = function($form, errors) {
        const $formElements = $form.elements;
  
        for (const elementName in errors) {
          const errorText = errors[elementName] || defaultError;
          const $errorElement = `<${errorsTag} class="${errorsClass}">${errorText}</${errorsTag}>`;
          const $formElement = $formElements[elementName];
          const $nextElement = $formElement.nextElementSibling;
  
          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            if ($nextElement.textContent !== errorText) {
              $nextElement.textContent = errorText;
            }
            continue;
          } else {
            $formElement.insertAdjacentHTML("afterend", $errorElement);
          }
  
          $formElement.classList.add(errorsClass);
        }
      };
  
      const hideError = function($formElement) {
        const $nextElement = $formElement.nextElementSibling;
        $formElement.classList.remove(errorsClass);
        if ($nextElement && $nextElement.classList.contains(errorsClass)) {
          $nextElement.parentElement.removeChild($nextElement);
        }
      };
  
      const submitHandler = function(event) {
        const $form = q("#" + event.detail.id + ">form") || event.target;
        const eventType = event.type;
  
        if ($form.tagName !== 'FORM') {
          $form = q('form', $form);
        }
  
        if ($form.classList.contains('sent')) {
          $form.reset();
  
          const $formElements = $form.elements;
  
          for (let i = 0, len = $formElements.length; i < len; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove("filled");
          }
  
          if ($uploadFilesBlock) {
            $uploadFilesBlock.innerHTML = "";
          }
          // if ($form === $quizForm) {
          //   id('quiz').resetQuiz();
          // }
  
          setTimeout(function() {
            $form.classList.remove("sent");
          }, 3000);
  
          thanksPopup.openPopup();
          thanksPopupTimer = setTimeout(function() {
            thanksPopup.closePopup();
          }, 3000);
  
          console.log("sent");
        } else if ($form.classList.contains('failed')) {
          errorPopup && errorPopup.openPopup();
          console.log("fail");
        }
  
        // $form.classList.remove("loading");
        document.body.classList.remove('loading');
  
      };
  
      const toggleInputsClass = function(e) {
        console.log('toggleInputsClass');
        const $input = e.target;
        const type = $input.type;
        const files = $input.files;
        const value = $input.value;
  
        switch (type) {
          case 'text':
          case 'email':
          case 'tel':
          case 'number':
            $input.classList.toggle('filled', value !== '');
            break;
          case 'file':
            let uploadedFiles = "";
            for (let i = 0, len = files.length; i < len; i++) {
              uploadedFiles +=
                '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' +
                files[i].name +
                "</span></span>";
            }
            $uploadFilesBlock.innerHTML = uploadedFiles;
            break;
          default:
            if ($input.tagName === 'TEXTAREA') {
              $input.classList.toggle('filled', value !== '');
            }
            break;
        }
      };
  
      initValidator();
    };
  
    for (let i = $forms.length - 1; i >= 0; i--) {
      const form = $forms[i];
      const formBtn = q(".btn", form) || q('.btn[form="' + form.id + '"]');
      if (form) {
        formValidator({
          form: form,
          formBtn: formBtn,
          uploadFilesBlock: q(".uploadedfiles", form),
          filesInput: q('input[type="file"]', form)
        });
      }
    }
  })();

  mobileMenu = function(_) {
    let setMenuStyles = function(trf, trs) {
        let args = [trf, trs],
          props = ['transform', 'transition'],
          values = ['translate3d(' + trf + ', 0px, 0px)', 'transform ' + trs];
  
        for (let i = args.length - 1; i >= 0; i--) {
          if (args[i] !== 0) {
            if (args[i] === '') {
              args[i] = '';
            } else {
              args[i] = values[i];
            }
            menuCnt.style[props[i]] = args[i];
          }
        }
      },
      checkForString = function(variable) {
        return variable.constructor === String ? q(variable) : variable;
      },
      openMenu = function() {
        if (!opened) {
          if (menu.hasAttribute('style')) {
            menu.removeAttribute('style');
            menu.offsetHeight;
          }
          menu.classList.add('active');
          openBtn.classList.add('active');
          menuCnt.scrollTop = 0;
  
          if (!fade) {
            setMenuStyles('0px', '.5s');
            menuWidth = menuCnt.offsetWidth;
          }
          if (!allowPageScroll) {
            pageScroll(true);
          }
        }
      },
      closeMenu = function(e, forSwipe) {
        if (opened) {
          let target = e && e.target;
          // Если меню открыто и произошел свайп или нет события (закрыто вызовом функции close()) или есть евент и его св-ва
          if (forSwipe || !e || (e.type === 'keyup' && e.keyCode === 27 || target === menu || target === closeBtn)) {
            menu.classList.remove('active');
            openBtn.classList.remove('active');
            menu.removeEventListener('touchstart', swipeStart);
  
            if (!fade) {
              setMenuStyles(initialTransformX, '.5s');
            }
          }
        }
      },
      swipeStart = function(e) {
        if (allowSwipe) {
          let evt = e.touches[0] || window.e.touches[0];
  
          isSwipe = isScroll = false;
          posInitX = posX1 = evt.clientX;
          posInitY = posY1 = evt.clientY;
          swipeStartTime = Date.now();
  
          menuCnt.addEventListener('touchend', swipeEnd);
          menuCnt.addEventListener('touchmove', swipeAction);
          setMenuStyles(0, '');
        }
      },
      swipeAction = function(e) {
        if (allowSwipe) {
          let evt = e.touches[0] || window.e.touches[0],
            style = menuCnt.style.transform,
            transform = +style.match(trfRegExp)[0];
  
          posX2 = posX1 - evt.clientX;
          posX1 = evt.clientX;
  
          posY2 = posY1 - evt.clientY;
          posY1 = evt.clientY;
  
          // Если еще не определено свайп или скролл (двигаемся в бок или вверх/вниз)
          if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2),
              posX = Math.abs(posX2);
  
            if (posY > 7 || posX2 === 0) {
              isScroll = true;
            } else if (posY < 7) {
              isSwipe = true;
            }
          }
  
          if (isSwipe) {
            // Если двигаемся влево или вправо при уже открытом меню, фиксируем позицию
            if ((toLeft && posInitX > posX1) || (toRight && posInitX < posX1)) {
              setMenuStyles('0px', 0);
              return;
            }
            setMenuStyles(transform - posX2 + 'px', 0);
          }
        }
      },
      swipeEnd = function(e) {
        posFinal = posInitX - posX1;
  
        let absPosFinal = Math.abs(posFinal);
  
        swipeEndTime = Date.now();
  
        if (absPosFinal > 1 && isSwipe) {
          if (toLeft && posFinal < 0 || toRight && posFinal > 0) {
            if (absPosFinal >= menuWidth * swipeThreshold || swipeEndTime - swipeStartTime < 300) {
              closeMenu(e, true);
            } else {
              opened = false;
              openMenu(e, true);
            }
          }
          allowSwipe = false;
        }
  
        menu.removeEventListener('touchend', swipeEnd);
        menu.removeEventListener('touchmove', swipeAction);
  
      },
      transitionEnd = function(e) {
        if (fade) {
          if (e.propertyName === 'opacity') {
            transitionEndEvents();
          }
        } else {
          if (e.propertyName === 'transform') {
            transitionEndEvents();
          }
        } 
        allowSwipe = true;
      },
      transitionEndEvents = function() {
        if (opened) {
          menu.isOpened = opened = false;
          openBtn.addEventListener('click', openMenu);
          closeBtn.removeEventListener('click', closeMenu);
          if (!allowPageScroll) {
            pageScroll(false);
          }
        } else {
          menu.isOpened = opened = true;
          openBtn.removeEventListener('click', openMenu);
          closeBtn.addEventListener('click', closeMenu);
          menu.addEventListener('touchstart', swipeStart);
        }
      },
      init = function() {
        menu = checkForString(_.menu);
        menuCnt = checkForString(_.menuCnt);
        openBtn = checkForString(_.openBtn);
        closeBtn = checkForString(_.closeBtn);
        allowPageScroll = options.allowPageScroll;
        toRight = options.toRight;
        toLeft = options.toLeft;
        initialTransformX = toLeft ? '100%' : toRight ? '-100%' : 0;
        fade = options.fade;
  
        setListeners('add');
  
        if (fade) {
          toRight = toLeft = false;
        } else {
          setMenuStyles(initialTransformX, 0);
          // menu.addEventListener('touchstart', swipeStart);
        }
        menu.isOpened = false;
      },
      setListeners = function(action) {
        openBtn[action + 'EventListener']('click', openMenu);
        menu[action + 'EventListener']('click', closeMenu);
        menu[action + 'EventListener']('transitionend', transitionEnd);
        document[action + 'EventListener']('keyup', closeMenu);
      },
      destroy = function() {
        if (opened) {
          closeMenu();
        }
  
        if (fade) {
          toRight = toLeft = false;
        } else {
          setMenuStyles('', '');
          menu.removeEventListener('touchstart', swipeStart);
        }
  
        setListeners('remove');
        menu = null;
        menuCnt = null;
        openBtn = null;
        closeBtn = null;
      },
      applyMediaParams = function() {
        // console.log('applyMediaParams');
        if (targetMediaQuery) {
          // console.log('set ' + targetMediaQuery + ' params');
          for (let option in responsive[targetMediaQuery]) {
            options[option] = responsive[targetMediaQuery][option];
          }
          currentMediaQuery = targetMediaQuery;
        } else { // set initial params
          for (let option in initialOptions) {
            options[option] = initialOptions[option];
          }
          currentMediaQuery = null;
        }
        if (menu) {
          destroy();
          init();
        }
      },
      checkMedia = function() {
        if (responsive) {
          targetMediaQuery = null;
          for (let mediaQuery in responsive) {
            if (media(mediaQuery)) {
              targetMediaQuery = mediaQuery;
            }
          }
          if (targetMediaQuery !== currentMediaQuery) {
            applyMediaParams();
          }
        }
        if (!menu) {
          init();
        }
      },
      options = JSON.parse(JSON.stringify(_)),
      initialOptions = JSON.parse(JSON.stringify(_)),
      responsive = _.responsive,
      targetMediaQuery = null,
      currentMediaQuery = null,
      menu,
      menuCnt,
      openBtn,
      closeBtn,
      swipeStartTime,
      swipeEndTime,
      allowPageScroll,
      swipeThreshold = 0.5,
      toRight,
      toLeft,
      initialTransformX,
      fade,
      startPageY = pageYOffset,
      trfRegExp = /([-0-9.]+(?=px))/,
      isSwipe = false,
      isScroll = false,
      allowSwipe = false,
      opened = false,
      posX1 = 0,
      posX2 = 0,
      posY1 = 0,
      posY2 = 0,
      posInitX = 0,
      posInitY = 0,
      posFinal = 0,
      menuWidth = 0;
  
    if (_.menu) {
      // Элементы не изменяются через responsive
      checkMedia();
  
      windowFuncs.resize.push(checkMedia);
  
      // Если разрешена прокрутка, то закрываем при прокрутке
      // if (allowPageScroll) {
      //   windowFuncs.scroll.push(closeMenu);
      // }
  
      return {
        options: options,
        menu: menu,
        menuCnt: menuCnt,
        openBtn: openBtn,
        closeBtn: closeBtn,
        open: openMenu,
        close: closeMenu,
        destroy: destroy,
        init: init,
        opened: opened
      };
    }
  };

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