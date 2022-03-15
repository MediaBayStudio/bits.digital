document.addEventListener('DOMContentLoaded', function() {

//=include ../sections/header/header.js

//=include ../sections/mobile-menu/mobile-menu.js

//=include ../sections/index-hero/index-hero.js

//=include ../sections/index-about/index-about.js

//=include ../sections/index-services/index-services.js

;
(function() {
  const casesBlock = q('.index-cases');

  if (casesBlock) {
    const casesList = q('.index-cases__cases', casesBlock);
    const loadmoreBtn = q('.index-cases__loadmore', casesBlock);
    const totalCases = casesList.getAttribute('data-total-cases');
    const postsPerPage = casesList.getAttribute('data-cases-numberposts');
    const placeContentPopup = function(casePopup, casePopupBody, caseRenderedContent) {
      casePopupBody.innerHTML = caseRenderedContent;
      casePopup.scrollTop = 0;
      const images = qa('.wp-block-image img', casePopupBody);
      const attributes = [
        'height',
        'width',
        'srcset',
        'sizes'
      ];
      for (var i = images.length - 1; i >= 0; i--) {
        for (var j = attributes.length - 1; j >= 0; j--) {
          images[i].removeAttribute(attributes[j])
        }
      }
    }

    casesBlock.addEventListener('click', function(e) {
      const target = e.target;

      if (target.closest('.index-cases__loadmore')) {
        console.log('click on loadmore');
        let existsItems = qa('.case', casesBlock);
        const excludeItems = [];

        for (let i = existsItems.length - 1; i >= 0; i--) {
          excludeItems[excludeItems.length] = existsItems[i].getAttribute('data-id');
        }

        document.body.classList.add('loading');
        loadmoreBtn.blur();
        loadmoreBtn.setAttribute('tabindex', '-1');

        fetch(siteUrl + '/wp-json/wp/v2/cases?per_page=' + postsPerPage + '&exclude=' + excludeItems)
          .then(function(response) {
            if (response.ok) {
              return response.text();
            } else {
              console.log('Ошибка ' + response.status + ' (' + response.statusText + ')');
              errorPopup && errorPopup.openPopup();
            }
          })
          .then(function(response) {
            response = JSON.parse(response);
            response.forEach(function(post) {
              casesList.insertAdjacentHTML('beforeend', post.html);
            });
            existsItems = qa('.case', casesBlock);
            if (existsItems.length >= totalCases) {
              loadmoreBtn.classList.add('hide');
            }
          })
          .catch(function(err) {
            console.log(err);
            errorPopup && errorPopup.openPopup();
          })
          .finally(function() {
            document.body.classList.remove('loading');
            loadmoreBtn.removeAttribute('tabindex');
          });

      } else if (target.closest('.case')) {
        console.log('click on case');

        const casePopupBody = q('.case-popup__body-inner', casePopup);
        const caseElement = target.closest('.case');
        const caseID = caseElement.getAttribute('data-id');
        let caseRenderedContent = sessionStorage.getItem('cached_case_' + caseID);

        if (caseElement) {
          caseElement.blur();
          caseElement.setAttribute('tabindex', '-1');
        }

        if (caseRenderedContent) {
          document.body.classList.remove('loading');
          caseElement.setAttribute('tabindex', '0');
          placeContentPopup(casePopup, casePopupBody, caseRenderedContent);
          casePopup.openPopup();
        } else {
          document.body.classList.add('loading');
          fetch(siteUrl + '/wp-json/wp/v2/cases/' + caseID)
            .then(function(response) {
              if (response.ok) {
                return response.text();
              } else {
                console.log('Ошибка ' + response.status + ' (' + response.statusText + ')');
                errorPopup && errorPopup.openPopup();
              }
            })
            .then(function(response) {
              response = JSON.parse(response);
              caseRenderedContent = response.content.rendered;

              if (caseRenderedContent) {
                placeContentPopup(casePopup, casePopupBody, caseRenderedContent);
                casePopup.openPopup();
                sessionStorage.setItem('cached_case_' + caseID, caseRenderedContent);
              } else {
                throw 'err';
              }

            })
            .catch(function(err) {
              console.log(err);
              errorPopup && errorPopup.openPopup();
            })
            .finally(function() {
              document.body.classList.remove('loading');
              caseElement.setAttribute('tabindex', '0');
            });
        }

      }
    });
  }

})();

;
(function() {
  const teamBlock = q('.index-team');

  if (teamBlock) {
    const teamList = q('.index-team__team', teamBlock);
    const loadmoreBtn = q('.index-team__loadmore', teamBlock);
    const totalteam = teamList.getAttribute('data-total-team');
    const postsPerPage = teamList.getAttribute('data-team-numberposts');

    teamBlock.addEventListener('click', function(e) {
      const target = e.target;

      if (target.closest('.index-team__loadmore')) {
        console.log('click on loadmore');
        let existsItems = qa('.teammate', teamBlock);
        const excludeItems = [];

        for (let i = existsItems.length - 1; i >= 0; i--) {
          excludeItems[excludeItems.length] = existsItems[i].getAttribute('data-id');
        }

        document.body.classList.add('loading');
        loadmoreBtn.blur();
        loadmoreBtn.setAttribute('tabindex', '-1');

        fetch(siteUrl + '/wp-json/wp/v2/teammates?per_page=' + postsPerPage + '&exclude=' + excludeItems)
          .then(function(response) {
            if (response.ok) {
              return response.text();
            } else {
              console.log('Ошибка ' + response.status + ' (' + response.statusText + ')');
              errorPopup && errorPopup.openPopup();
            }
          })
          .then(function(response) {
            response = JSON.parse(response);
            console.log(response);
            response.forEach(function(post) {
              teamList.insertAdjacentHTML('beforeend', post.html);
            });
            existsItems = qa('.teammate', teamBlock);
            if (existsItems.length >= totalteam) {
              loadmoreBtn.classList.add('hide');
            }
          })
          .catch(function(err) {
            console.log(err);
            errorPopup && errorPopup.openPopup();
          })
          .finally(function() {
            document.body.classList.remove('loading');
            loadmoreBtn.removeAttribute('tabindex');
          });

      } else if (target.closest('.teammate')) {
        console.log('click on teammate');
      }
    });
  }

})();

//=include ../sections/index-contact/index-contact.js

;
(function() {
  casePopup = new Popup('.case-popup', {
    // openButtons: '.case',
    closeButtons: '.case-popup__close'
  });

  // casePopup.openPopup();
})();

;(function() {
  thanksPopup = new Popup('.thanks-popup', {
    closeButtons: '.thanks-popup__close'
  });
  // thanksPopup.openPopup();
})();

;(function() {
  errorPopup = new Popup('.error-popup', {
    closeButtons: '.error-popup__close'
  });
  // errorPopup.openPopup();
})();

//=include ../sections/footer/footer.js

});