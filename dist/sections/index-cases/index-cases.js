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